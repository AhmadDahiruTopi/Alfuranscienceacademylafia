import { and, asc, desc, eq, gte, lte, or } from "drizzle-orm";
import { getDb } from "./db";
import { jambAnswers, jambAttempts, jambExams, jambQuestions, jambSubjects, jambMonitoringEvents, jambRecordings, jambLiveSessions, students } from "../drizzle/schema";
import { storageGetSignedUrl, storagePut } from "./storage";

export const JAMB_SUBJECT_NAMES = ["Mathematics", "Physics", "Chemistry", "Biology", "Use of English", "Literature in English"] as const;
export const JAMB_MARKS_PER_SUBJECT = 50;
export const JAMB_MARK_PER_QUESTION = 1;
export const JAMB_AGGREGATE_SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "Use of English"] as const;
export const JAMB_AGGREGATE_MAX_MARKS = JAMB_AGGREGATE_SUBJECTS.length * JAMB_MARKS_PER_SUBJECT;
export type JambOptionKey = "A" | "B" | "C" | "D";
export type JambOption = { key: JambOptionKey; text: string };

export function isJambEligibleClass(className: string) {
  return className.trim().length > 0;
}

export function assertJambEligibleClass(className: string) {
  if (!isJambEligibleClass(className)) throw new Error("JAMB Practice requires an active student class");
}

export async function ensureJambSubjects() {
  const db = await getDb();
  if (!db) return [];
  for (const name of JAMB_SUBJECT_NAMES) await db.insert(jambSubjects).values({ name, status: "active" }).onDuplicateKeyUpdate({ set: { status: "active", updatedAt: new Date() } });
  return db.select().from(jambSubjects).where(eq(jambSubjects.status, "active")).orderBy(asc(jambSubjects.name));
}

export async function listJambSubjects() { return ensureJambSubjects(); }

export async function listJambExams(status?: "draft" | "published" | "archived") {
  const db = await getDb(); if (!db) return [];
  await ensureJambSubjects();
  const rows = await db.select({ exam: jambExams, subject: jambSubjects }).from(jambExams).innerJoin(jambSubjects, eq(jambExams.subjectId, jambSubjects.id)).where(status ? eq(jambExams.status, status) : undefined).orderBy(desc(jambExams.createdAt));
  const result = [];
  for (const row of rows) {
    const questions = await db.select({ id: jambQuestions.id }).from(jambQuestions).where(eq(jambQuestions.examId, row.exam.id));
    result.push({ ...row.exam, subjectName: row.subject.name, actualQuestionCount: questions.length });
  }
  return result;
}

export async function createJambExam(input: { subjectName: string; title: string; academicSession?: string | null; durationMinutes: number; questions: Array<{ prompt: string; options: JambOption[]; correctOption: JambOptionKey; explanation?: string | null }>; createdBy: number }) {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  if (input.questions.length > JAMB_MARKS_PER_SUBJECT) throw new Error(`A CBT subject exam cannot contain more than ${JAMB_MARKS_PER_SUBJECT} questions because each question carries one mark.`);
  const subject = (await db.select().from(jambSubjects).where(and(eq(jambSubjects.name, input.subjectName), eq(jambSubjects.status, "active"))).limit(1))[0];
  if (!subject || !JAMB_SUBJECT_NAMES.includes(input.subjectName as typeof JAMB_SUBJECT_NAMES[number])) throw new Error("Select a valid JAMB subject");
  await db.insert(jambExams).values({ subjectId: subject.id, title: input.title.trim(), academicSession: input.academicSession?.trim() || null, durationMinutes: input.durationMinutes, questionCount: input.questions.length, status: "draft", createdBy: input.createdBy });
  const exam = (await db.select().from(jambExams).where(and(eq(jambExams.subjectId, subject.id), eq(jambExams.title, input.title.trim()), eq(jambExams.createdBy, input.createdBy))).orderBy(desc(jambExams.id)).limit(1))[0];
  if (!exam) throw new Error("Could not create JAMB exam");
  if (input.questions.length) await db.insert(jambQuestions).values(input.questions.map((question, index) => ({ examId: exam.id, questionNumber: index + 1, prompt: question.prompt.trim(), optionsJson: JSON.stringify(question.options), correctOption: question.correctOption, explanation: question.explanation?.trim() || null })));
  return { ...exam, subjectName: subject.name };
}

export async function publishJambExam(id: number) { const db = await getDb(); if (!db) throw new Error("Database unavailable"); await db.update(jambExams).set({ status: "published", updatedAt: new Date() }).where(eq(jambExams.id, id)); return (await db.select().from(jambExams).where(eq(jambExams.id, id)).limit(1))[0]; }

export async function getJambExamForStudent(examId: number, studentId: number) {
  const db = await getDb(); if (!db) return undefined;
  const student = (await db.select().from(students).where(and(eq(students.id, studentId), eq(students.status, "active"))).limit(1))[0];
  if (!student) throw new Error("Student record not found");
  assertJambEligibleClass(student.className);
  const row = (await db.select({ exam: jambExams, subject: jambSubjects }).from(jambExams).innerJoin(jambSubjects, eq(jambExams.subjectId, jambSubjects.id)).where(and(eq(jambExams.id, examId), eq(jambExams.status, "published"))).limit(1))[0];
  if (!row) return undefined;
  const questions = await db.select().from(jambQuestions).where(eq(jambQuestions.examId, examId)).orderBy(asc(jambQuestions.questionNumber));
  return { ...row.exam, subjectName: row.subject.name, questions: questions.map(question => ({ id: question.id, questionNumber: question.questionNumber, prompt: question.prompt, options: JSON.parse(question.optionsJson) as JambOption[] })) };
}

export async function startJambAttempt(examId: number, studentId: number) {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const exam = await getJambExamForStudent(examId, studentId); if (!exam) throw new Error("This JAMB practice is not available");
  const existing = (await db.select().from(jambAttempts).where(and(eq(jambAttempts.examId, examId), eq(jambAttempts.studentId, studentId), eq(jambAttempts.status, "in_progress"))).orderBy(desc(jambAttempts.id)).limit(1))[0];
  if (existing) return { attempt: existing, exam };
  await db.insert(jambAttempts).values({ examId, studentId, status: "in_progress" });
  const attempt = (await db.select().from(jambAttempts).where(and(eq(jambAttempts.examId, examId), eq(jambAttempts.studentId, studentId))).orderBy(desc(jambAttempts.id)).limit(1))[0];
  if (!attempt) throw new Error("Could not start JAMB practice");
  return { attempt, exam };
}

export async function upsertJambLiveOffer(input: { attemptId: number; studentId: number; offerJson: string }) { const db = await getDb(); if (!db) throw new Error("Database unavailable"); const attempt = (await db.select().from(jambAttempts).where(and(eq(jambAttempts.id, input.attemptId), eq(jambAttempts.studentId, input.studentId))).limit(1))[0]; if (!attempt || attempt.status !== "in_progress") throw new Error("Active JAMB attempt not found"); await db.insert(jambLiveSessions).values({ attemptId: attempt.id, studentId: input.studentId, examId: attempt.examId, status: "waiting", offerJson: input.offerJson, answerJson: null, lastHeartbeat: new Date() }).onDuplicateKeyUpdate({ set: { studentId: input.studentId, examId: attempt.examId, status: "waiting", offerJson: input.offerJson, answerJson: null, lastHeartbeat: new Date(), updatedAt: new Date() } }); return { success: true as const }; }
export async function getJambLiveAnswer(attemptId: number, studentId: number) { const db = await getDb(); if (!db) return null; const row = (await db.select().from(jambLiveSessions).where(and(eq(jambLiveSessions.attemptId, attemptId), eq(jambLiveSessions.studentId, studentId))).limit(1))[0]; if (!row || row.status === "ended") return null; return { status: row.status, answerJson: row.answerJson }; }
export async function heartbeatJambLiveSession(attemptId: number, studentId: number) { const db = await getDb(); if (!db) throw new Error("Database unavailable"); const row = (await db.select().from(jambLiveSessions).where(and(eq(jambLiveSessions.attemptId, attemptId), eq(jambLiveSessions.studentId, studentId))).limit(1))[0]; if (!row || row.status === "ended") return { success: false as const }; await db.update(jambLiveSessions).set({ lastHeartbeat: new Date(), updatedAt: new Date() }).where(eq(jambLiveSessions.id, row.id)); return { success: true as const }; }
export async function endJambLiveSession(attemptId: number, studentId: number) { const db = await getDb(); if (!db) throw new Error("Database unavailable"); await db.update(jambLiveSessions).set({ status: "ended", lastHeartbeat: new Date(), updatedAt: new Date() }).where(and(eq(jambLiveSessions.attemptId, attemptId), eq(jambLiveSessions.studentId, studentId))); return { success: true as const }; }
export async function listJambLiveSessions() { const db = await getDb(); if (!db) return []; const rows = await db.select({ live: jambLiveSessions, student: students, exam: jambExams, subject: jambSubjects, attempt: jambAttempts }).from(jambLiveSessions).innerJoin(students, eq(jambLiveSessions.studentId, students.id)).innerJoin(jambExams, eq(jambLiveSessions.examId, jambExams.id)).innerJoin(jambSubjects, eq(jambExams.subjectId, jambSubjects.id)).innerJoin(jambAttempts, eq(jambLiveSessions.attemptId, jambAttempts.id)).where(and(or(eq(jambLiveSessions.status, "waiting"), eq(jambLiveSessions.status, "live")), eq(jambAttempts.status, "in_progress"))).orderBy(desc(jambLiveSessions.lastHeartbeat)); const cutoff = Date.now() - 20_000; return rows.filter(row => new Date(row.live.lastHeartbeat).getTime() >= cutoff).map(row => ({ attemptId: row.live.attemptId, studentId: row.live.studentId, studentName: row.student.name, className: row.student.className, examTitle: row.exam.title, subjectName: row.subject.name, status: row.live.status, lastHeartbeat: row.live.lastHeartbeat, offerJson: row.live.offerJson, answerJson: row.live.answerJson })); }
export async function getJambLiveSessionForAdmin(attemptId: number) { const db = await getDb(); if (!db) return null; const row = (await db.select({ live: jambLiveSessions, student: students, exam: jambExams, subject: jambSubjects, attempt: jambAttempts }).from(jambLiveSessions).innerJoin(students, eq(jambLiveSessions.studentId, students.id)).innerJoin(jambExams, eq(jambLiveSessions.examId, jambExams.id)).innerJoin(jambSubjects, eq(jambExams.subjectId, jambSubjects.id)).innerJoin(jambAttempts, eq(jambLiveSessions.attemptId, jambAttempts.id)).where(and(eq(jambLiveSessions.attemptId, attemptId), eq(jambAttempts.status, "in_progress"))).limit(1))[0]; if (!row || new Date(row.live.lastHeartbeat).getTime() < Date.now() - 20_000) return null; return { attemptId: row.live.attemptId, studentId: row.live.studentId, studentName: row.student.name, className: row.student.className, examTitle: row.exam.title, subjectName: row.subject.name, status: row.live.status, offerJson: row.live.offerJson, answerJson: row.live.answerJson, lastHeartbeat: row.live.lastHeartbeat }; }
export async function setJambLiveAnswer(attemptId: number, answerJson: string) { const db = await getDb(); if (!db) throw new Error("Database unavailable"); await db.update(jambLiveSessions).set({ answerJson, status: "live", updatedAt: new Date() }).where(and(eq(jambLiveSessions.attemptId, attemptId), eq(jambLiveSessions.status, "waiting"))); return { success: true as const }; }

export async function submitJambAttempt(attemptId: number, studentId: number, answers: Array<{ questionId: number; selectedOption?: JambOptionKey | null }>) {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const attempt = (await db.select().from(jambAttempts).where(and(eq(jambAttempts.id, attemptId), eq(jambAttempts.studentId, studentId))).limit(1))[0];
  if (!attempt) throw new Error("Attempt not found");
  if (attempt.status !== "in_progress") return attempt;
  const questions = await db.select().from(jambQuestions).where(eq(jambQuestions.examId, attempt.examId));
  const byId = new Map(questions.map(question => [question.id, question]));
  const safeAnswers = answers.filter(answer => byId.has(answer.questionId));
  if (safeAnswers.length) {
    await db.delete(jambAnswers).where(eq(jambAnswers.attemptId, attemptId));
    await db.insert(jambAnswers).values(safeAnswers.map(answer => ({ attemptId, questionId: answer.questionId, selectedOption: answer.selectedOption ?? null, isCorrect: Boolean(answer.selectedOption && answer.selectedOption === byId.get(answer.questionId)?.correctOption) })));
  }
  const rawCorrectCount = safeAnswers.filter(answer => answer.selectedOption && answer.selectedOption === byId.get(answer.questionId)?.correctOption).length;
  const correctCount = Math.min(rawCorrectCount, JAMB_MARKS_PER_SUBJECT);
  const percentage = Math.round((correctCount / JAMB_MARKS_PER_SUBJECT) * 100);
  await db.update(jambAttempts).set({ submittedAt: new Date(), score: correctCount, correctCount, percentage, status: "submitted" }).where(eq(jambAttempts.id, attemptId)); await db.update(jambLiveSessions).set({ status: "ended", lastHeartbeat: new Date(), updatedAt: new Date() }).where(eq(jambLiveSessions.attemptId, attemptId));
  const saved = (await db.select().from(jambAttempts).where(eq(jambAttempts.id, attemptId)).limit(1))[0];
  return saved ? { ...saved, marks: Math.min(saved.correctCount, JAMB_MARKS_PER_SUBJECT), maxMarks: JAMB_MARKS_PER_SUBJECT, marksOver250: Math.min(saved.correctCount, JAMB_MARKS_PER_SUBJECT), aggregateMaxMarks: JAMB_AGGREGATE_MAX_MARKS } : saved;
}

export async function listStudentJambAttempts(studentId: number) {
  const db = await getDb(); if (!db) return [];
  const rows = await db.select({ attempt: jambAttempts, exam: jambExams, subject: jambSubjects }).from(jambAttempts).innerJoin(jambExams, eq(jambAttempts.examId, jambExams.id)).innerJoin(jambSubjects, eq(jambExams.subjectId, jambSubjects.id)).where(eq(jambAttempts.studentId, studentId)).orderBy(desc(jambAttempts.startedAt));
  return rows.map(row => ({ ...row.attempt, examTitle: row.exam.title, subjectName: row.subject.name, marks: Math.min(row.attempt.correctCount, JAMB_MARKS_PER_SUBJECT), maxMarks: JAMB_MARKS_PER_SUBJECT, marksOver250: Math.min(row.attempt.correctCount, JAMB_MARKS_PER_SUBJECT) }));
}

export async function getStudentJambClassWinner(studentId: number) {
  const db = await getDb(); if (!db) return null;
  const student = (await db.select({ className: students.className }).from(students).where(and(eq(students.id, studentId), eq(students.status, "active"))).limit(1))[0];
  if (!student || !isJambEligibleClass(student.className)) return null;
  const rows = await db.select({ attempt: jambAttempts, student: students, exam: jambExams, subject: jambSubjects }).from(jambAttempts).innerJoin(students, eq(jambAttempts.studentId, students.id)).innerJoin(jambExams, eq(jambAttempts.examId, jambExams.id)).innerJoin(jambSubjects, eq(jambExams.subjectId, jambSubjects.id)).where(and(eq(students.className, student.className), eq(jambAttempts.status, "submitted"), eq(students.status, "active"))).orderBy(desc(jambAttempts.percentage), desc(jambAttempts.submittedAt));
  const winner = rows[0];
  return winner ? { studentName: winner.student.name, className: winner.student.className, subjectName: winner.subject.name, percentage: winner.attempt.percentage, marksOver250: Math.min(winner.attempt.correctCount, JAMB_MARKS_PER_SUBJECT), achievedAt: winner.attempt.submittedAt, attemptId: winner.attempt.id, isCurrentStudent: winner.student.id === studentId } : null;
}

export async function recordJambMonitoringEvent(input: { attemptId: number; studentId: number; eventType: string; details?: string | null }) {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const attempt = (await db.select().from(jambAttempts).where(and(eq(jambAttempts.id, input.attemptId), eq(jambAttempts.studentId, input.studentId))).limit(1))[0];
  if (!attempt) throw new Error("Attempt not found");
  if (attempt.status !== "in_progress") return { warningNumber: 0, terminated: true };
  const previous = await db.select({ id: jambMonitoringEvents.id }).from(jambMonitoringEvents).where(eq(jambMonitoringEvents.attemptId, input.attemptId));
  const warningNumber = previous.length + 1;
  await db.insert(jambMonitoringEvents).values({ attemptId: input.attemptId, studentId: input.studentId, eventType: input.eventType.trim().slice(0, 40), details: input.details?.trim() || null, warningNumber });
  const terminated = ["window_hidden", "exam_minimized", "page_unload"].includes(input.eventType.trim()) || warningNumber >= 2;
  if (terminated) await db.update(jambAttempts).set({ status: "expired", submittedAt: new Date() }).where(eq(jambAttempts.id, input.attemptId));
  return { warningNumber, terminated };
}

export async function uploadJambRecording(input: { attemptId: number; studentId: number; mediaType: "video" | "audio"; mimeType: string; dataBase64: string; startedAt: number; endedAt: number }) {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const attempt = (await db.select().from(jambAttempts).where(and(eq(jambAttempts.id, input.attemptId), eq(jambAttempts.studentId, input.studentId))).limit(1))[0];
  if (!attempt) throw new Error("Attempt not found");
  const buffer = Buffer.from(input.dataBase64, "base64");
  if (!buffer.length || buffer.length > 5 * 1024 * 1024) throw new Error("Recording segment must be between 1 byte and 5MB");
  const uploaded = await storagePut(`jamb-recordings/${input.studentId}/${input.attemptId}-${input.mediaType}-${Date.now()}.webm`, buffer, input.mimeType);
  await db.insert(jambRecordings).values({ attemptId: input.attemptId, studentId: input.studentId, mediaType: input.mediaType, storageKey: uploaded.key, storageUrl: uploaded.url, mimeType: input.mimeType, sizeBytes: buffer.length, startedAt: new Date(input.startedAt), endedAt: new Date(input.endedAt) });
  return { key: uploaded.key, url: uploaded.url, sizeBytes: buffer.length };
}

export async function listJambMonitoringEvents(filter: { terminatedOnly?: boolean } = {}) {
  const db = await getDb(); if (!db) return [];
  const rows = await db.select({ event: jambMonitoringEvents, student: students, attempt: jambAttempts, exam: jambExams, subject: jambSubjects }).from(jambMonitoringEvents).innerJoin(students, eq(jambMonitoringEvents.studentId, students.id)).innerJoin(jambAttempts, eq(jambMonitoringEvents.attemptId, jambAttempts.id)).innerJoin(jambExams, eq(jambAttempts.examId, jambExams.id)).innerJoin(jambSubjects, eq(jambExams.subjectId, jambSubjects.id)).orderBy(desc(jambMonitoringEvents.createdAt)).limit(500);
  const allRecordings = rows.length ? await db.select().from(jambRecordings) : [];
  const mapped = rows.map(row => ({ ...row.event, studentName: row.student.name, className: row.student.className, examTitle: row.exam.title, subjectName: row.subject.name, attemptStatus: row.attempt.status, recording: allRecordings.find(recording => recording.attemptId === row.event.attemptId) ?? null }));
  return filter.terminatedOnly ? mapped.filter(event => event.attemptStatus === "expired" || event.eventType === "window_hidden" || event.eventType === "page_unload" || event.warningNumber >= 2) : mapped;
}

export async function getJambExamForAdmin(examId: number) {
  const db = await getDb(); if (!db) return undefined;
  const row = (await db.select({ exam: jambExams, subject: jambSubjects }).from(jambExams).innerJoin(jambSubjects, eq(jambExams.subjectId, jambSubjects.id)).where(eq(jambExams.id, examId)).limit(1))[0];
  if (!row) return undefined;
  const questions = await db.select().from(jambQuestions).where(eq(jambQuestions.examId, examId)).orderBy(asc(jambQuestions.questionNumber));
  return { ...row.exam, subjectName: row.subject.name, questions: questions.map(question => ({ ...question, options: JSON.parse(question.optionsJson) as JambOption[] })) };
}

export async function updateJambQuestion(input: { id: number; prompt: string; options: JambOption[]; correctOption: JambOptionKey; explanation?: string | null }) {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const existing = (await db.select().from(jambQuestions).where(eq(jambQuestions.id, input.id)).limit(1))[0];
  if (!existing) throw new Error("Question not found");
  await db.update(jambQuestions).set({ prompt: input.prompt.trim(), optionsJson: JSON.stringify(input.options), correctOption: input.correctOption, explanation: input.explanation?.trim() || null }).where(eq(jambQuestions.id, input.id));
  return (await db.select().from(jambQuestions).where(eq(jambQuestions.id, input.id)).limit(1))[0];
}

export async function getStudentJambAttemptReview(attemptId: number, studentId: number) {
  const db = await getDb(); if (!db) return undefined;
  const attempt = (await db.select({ attempt: jambAttempts, exam: jambExams, subject: jambSubjects }).from(jambAttempts).innerJoin(jambExams, eq(jambAttempts.examId, jambExams.id)).innerJoin(jambSubjects, eq(jambExams.subjectId, jambSubjects.id)).where(and(eq(jambAttempts.id, attemptId), eq(jambAttempts.studentId, studentId))).limit(1))[0];
  if (!attempt) throw new Error("Attempt not found");
  const student = (await db.select().from(students).where(and(eq(students.id, studentId), eq(students.status, "active"))).limit(1))[0];
  if (!student) throw new Error("Student record not found");
  assertJambEligibleClass(student.className);
  const questions = await db.select().from(jambQuestions).where(eq(jambQuestions.examId, attempt.exam.id)).orderBy(asc(jambQuestions.questionNumber));
  const answers = await db.select().from(jambAnswers).where(eq(jambAnswers.attemptId, attemptId));
  const answerByQuestion = new Map(answers.map(answer => [answer.questionId, answer]));
  return { ...attempt.attempt, examTitle: attempt.exam.title, subjectName: attempt.subject.name, className: student.className, marks: Math.min(attempt.attempt.correctCount, JAMB_MARKS_PER_SUBJECT), maxMarks: JAMB_MARKS_PER_SUBJECT, marksOver250: Math.min(attempt.attempt.correctCount, JAMB_MARKS_PER_SUBJECT), questions: questions.map(question => ({ id: question.id, questionNumber: question.questionNumber, prompt: question.prompt, options: JSON.parse(question.optionsJson) as JambOption[], correctOption: question.correctOption as JambOptionKey, explanation: question.explanation, selectedOption: answerByQuestion.get(question.id)?.selectedOption ?? null, isCorrect: answerByQuestion.get(question.id)?.isCorrect ?? false })) };
}

export async function getJambAnalytics(filters: { academicSession?: string; fromDate?: string; toDate?: string; fromTime?: string; toTime?: string } = {}) {
  const db = await getDb();   if (!db) return { summary: { attempts: 0, averagePercentage: 0, highestPercentage: 0, uniqueStudents: 0, highestAggregateMarks: 0, aggregateMaxMarks: JAMB_AGGREGATE_MAX_MARKS }, overallWinner: null, bySubject: [], byClass: [], classRankings: [], recentAttempts: [] };
  const startDate = filters.fromDate ? new Date(`${filters.fromDate}T00:00:00`) : undefined;
  const endDate = filters.toDate ? new Date(`${filters.toDate}T23:59:59.999`) : undefined;
  const predicates = [eq(jambAttempts.status, "submitted" as const)];
  if (filters.academicSession) predicates.push(eq(jambExams.academicSession, filters.academicSession));
  if (startDate && !Number.isNaN(startDate.getTime())) predicates.push(gte(jambAttempts.submittedAt, startDate));
  if (endDate && !Number.isNaN(endDate.getTime())) predicates.push(lte(jambAttempts.submittedAt, endDate));
  const allRows = await db.select({ attempt: jambAttempts, exam: jambExams, subject: jambSubjects, student: students }).from(jambAttempts).innerJoin(jambExams, eq(jambAttempts.examId, jambExams.id)).innerJoin(jambSubjects, eq(jambExams.subjectId, jambSubjects.id)).innerJoin(students, eq(jambAttempts.studentId, students.id)).where(and(...predicates)).orderBy(desc(jambAttempts.submittedAt));
  const withinTime = (date: Date | null) => { if (!date || (!filters.fromTime && !filters.toTime)) return true; const value = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`; return (!filters.fromTime || value >= filters.fromTime) && (!filters.toTime || value <= filters.toTime); };
  const rows = allRows.filter(row => withinTime(row.attempt.submittedAt));
  const subjectMap = new Map<string, { subjectName: string; attempts: number; totalPercentage: number; highestPercentage: number; highestMarks: number }>();
  const classMap = new Map<string, { className: string; attempts: number; totalPercentage: number; highestPercentage: number; highestMarks: number }>();
  const aggregateByStudent = new Map<number, Map<string, number>>();
  for (const row of rows) {
    const subjectMarks = Math.min(row.attempt.correctCount, JAMB_MARKS_PER_SUBJECT); const subject = subjectMap.get(row.subject.name) ?? { subjectName: row.subject.name, attempts: 0, totalPercentage: 0, highestPercentage: 0, highestMarks: 0 }; subject.attempts++; subject.totalPercentage += row.attempt.percentage; subject.highestPercentage = Math.max(subject.highestPercentage, row.attempt.percentage); subject.highestMarks = Math.max(subject.highestMarks, subjectMarks); subjectMap.set(row.subject.name, subject);
    const classItem = classMap.get(row.student.className) ?? { className: row.student.className, attempts: 0, totalPercentage: 0, highestPercentage: 0, highestMarks: 0 }; classItem.attempts++; classItem.totalPercentage += row.attempt.percentage; classItem.highestPercentage = Math.max(classItem.highestPercentage, row.attempt.percentage); classItem.highestMarks = Math.max(classItem.highestMarks, subjectMarks); classMap.set(row.student.className, classItem); if (JAMB_AGGREGATE_SUBJECTS.includes(row.subject.name as typeof JAMB_AGGREGATE_SUBJECTS[number])) { const subjectScores = aggregateByStudent.get(row.student.id) ?? new Map<string, number>(); subjectScores.set(row.subject.name, Math.max(subjectScores.get(row.subject.name) ?? 0, subjectMarks)); aggregateByStudent.set(row.student.id, subjectScores); }
  }
  const average = rows.length ? Math.round(rows.reduce((sum, row) => sum + row.attempt.percentage, 0) / rows.length) : 0;
  const highest = rows.reduce((value, row) => Math.max(value, row.attempt.percentage), 0);
  const aggregateEntries = Array.from(aggregateByStudent.entries()).map(([studentId, scores]) => { const row = rows.find(item => item.student.id === studentId); return row ? { studentId, studentName: row.student.name, className: row.student.className, aggregateMarks: Math.min(JAMB_AGGREGATE_MAX_MARKS, Array.from(scores.values()).reduce((sum, marks) => sum + marks, 0)), subjectsCompleted: scores.size } : null; }).filter((item): item is { studentId: number; studentName: string; className: string; aggregateMarks: number; subjectsCompleted: number } => Boolean(item));
  const highestAggregateMarks = Math.max(0, ...aggregateEntries.map(item => item.aggregateMarks));
  const classRankings = Array.from(new Set(aggregateEntries.map(item => item.className))).flatMap(className => aggregateEntries.filter(item => item.className === className).sort((a, b) => b.aggregateMarks - a.aggregateMarks || a.studentName.localeCompare(b.studentName)).map((item, index) => ({ ...item, classPosition: index + 1 })));
  const winner = rows.slice().sort((a, b) => b.attempt.percentage - a.attempt.percentage)[0];
  return {
    summary: { attempts: rows.length, averagePercentage: average, highestPercentage: highest, highestMarks: Math.round((highest / 100) * JAMB_MARKS_PER_SUBJECT), highestAggregateMarks, aggregateMaxMarks: JAMB_AGGREGATE_MAX_MARKS, uniqueStudents: new Set(rows.map(row => row.student.id)).size },
    overallWinner: winner ? { studentName: winner.student.name, className: winner.student.className, subjectName: winner.subject.name, score: winner.attempt.score, marks: Math.min(winner.attempt.correctCount, JAMB_MARKS_PER_SUBJECT), marksOver250: Math.min(winner.attempt.correctCount, JAMB_MARKS_PER_SUBJECT), percentage: winner.attempt.percentage } : null,
    bySubject: Array.from(subjectMap.values()).map(item => ({ ...item, averagePercentage: Math.round(item.totalPercentage / item.attempts) })).sort((a, b) => b.averagePercentage - a.averagePercentage),
    byClass: Array.from(classMap.values()).map(item => ({ ...item, averagePercentage: Math.round(item.totalPercentage / item.attempts) })).sort((a, b) => b.averagePercentage - a.averagePercentage),
    classRankings,
    recentAttempts: rows.slice(0, 100).map(row => ({ id: row.attempt.id, studentName: row.student.name, className: row.student.className, subjectName: row.subject.name, examTitle: row.exam.title, percentage: row.attempt.percentage, score: row.attempt.score, marks: Math.min(row.attempt.correctCount, JAMB_MARKS_PER_SUBJECT), marksOver250: Math.min(row.attempt.correctCount, JAMB_MARKS_PER_SUBJECT), submittedAt: row.attempt.submittedAt }))
  };
}

export async function listJambRecordings() {
  const db = await getDb(); if (!db) return [];
  const rows = await db.select({ recording: jambRecordings, student: students }).from(jambRecordings).innerJoin(students, eq(jambRecordings.studentId, students.id)).orderBy(desc(jambRecordings.createdAt)).limit(1000);
  return rows.map(row => ({ ...row.recording, studentName: row.student.name, className: row.student.className }));
}

export async function getJambRecordingPlayback(id: number) {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const recording = (await db.select().from(jambRecordings).where(eq(jambRecordings.id, id)).limit(1))[0];
  if (!recording) throw new Error("Recording not found");
  const playbackUrl = await storageGetSignedUrl(recording.storageKey);
  return { id: recording.id, mediaType: recording.mediaType, mimeType: recording.mimeType, playbackUrl, sizeBytes: recording.sizeBytes, startedAt: recording.startedAt, endedAt: recording.endedAt };
}

export async function deleteJambRecordingMetadata(id: number) {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const recording = (await db.select().from(jambRecordings).where(eq(jambRecordings.id, id)).limit(1))[0];
  if (!recording) throw new Error("Recording not found");
  await db.delete(jambRecordings).where(eq(jambRecordings.id, id));
  return { deleted: 1, storageKey: recording.storageKey };
}

export async function deleteAllJambRecordingMetadata() {
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const recordings = await db.select({ id: jambRecordings.id, storageKey: jambRecordings.storageKey }).from(jambRecordings);
  if (recordings.length) await db.delete(jambRecordings);
  return { deleted: recordings.length, storageKeys: recordings.map(item => item.storageKey) };
}
