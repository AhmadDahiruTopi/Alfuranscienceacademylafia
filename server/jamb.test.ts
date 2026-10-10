import { describe, expect, it } from "vitest";
import { JAMB_AGGREGATE_MAX_MARKS, JAMB_AGGREGATE_SUBJECTS, JAMB_MARKS_PER_SUBJECT, JAMB_MARK_PER_QUESTION, JAMB_SUBJECT_NAMES, isJambEligibleClass } from "./jamb";
import { readFileSync } from "node:fs";

describe("JAMB Practice rules", () => {
  it("allows every active student with a class", () => {
    expect(isJambEligibleClass("SSS 2A")).toBe(true);
    expect(isJambEligibleClass("SSS 3B")).toBe(true);
    expect(isJambEligibleClass("JSS 3A")).toBe(true);
    expect(isJambEligibleClass("Primary 5B")).toBe(true);
    expect(isJambEligibleClass("Nursery 1A")).toBe(true);
    expect(isJambEligibleClass(" ")).toBe(false);
  });

  it("keeps the requested science and English subject catalog", () => {
    expect(JAMB_SUBJECT_NAMES).toEqual(["Mathematics", "Physics", "Chemistry", "Biology", "Use of English", "Literature in English"]);
  });

  it("enforces syllabus-aware generation and fixed 50/250-mark reporting contracts", () => {
    const router = readFileSync("server/routers.ts", "utf8");
    const jamb = readFileSync("server/jamb.ts", "utf8");
    const ui = readFileSync("client/src/pages/JambPractice.tsx", "utf8");
    expect(router).toContain("aligned to the Nigerian SS2 and SS3 senior secondary syllabus");
    expect(router).toContain("Each question is worth exactly 1 mark");
    expect(jamb).toContain("JAMB_MARKS_PER_SUBJECT");
    expect(jamb).toContain('"window_hidden"');
    expect(JAMB_MARKS_PER_SUBJECT).toBe(50);
    expect(JAMB_MARK_PER_QUESTION).toBe(1);
    expect(JAMB_AGGREGATE_SUBJECTS).toHaveLength(5);
    expect(JAMB_AGGREGATE_MAX_MARKS).toBe(250);
    expect(jamb).toContain("overallWinner");
    expect(ui).toContain("Print winner report");
    expect(ui).toContain("Class performance recognition");
    expect(router).toContain("studentJambClassWinner");
    expect(jamb).toContain("getStudentJambClassWinner");
    expect(jamb).toContain("achievedAt");
    expect(ui).toContain("Exact score:");
    expect(ui).toContain("Admission number");
    expect(ui).toContain("I understand and consent to these local exam safeguards.");
    expect(ui).toContain("compressed recording is uploaded securely");
    expect(ui).toContain("recorded only for this consented attempt");
    expect(ui).toContain('"Published"');
    expect(ui).toContain(">Active</span>");
    expect(ui).toContain("JambCalculator");
    expect(ui).toContain("Camera {cameraStatus}");
    expect(ui).toContain("browser window was minimized or the exam page was hidden");
    expect(ui).toContain("Subject marks (1 each, maximum 50)");
    expect(ui).toContain("Highest five-subject aggregate");
    expect(ui).toContain("one independent subject exam");
    expect(ui).toContain("Anti-cheat terminated only");
    expect(ui).toContain("Class aggregate ranking");
    expect(ui).toContain("subjectsCompleted");
    expect(router).toContain("terminatedOnly: z.boolean().optional()");
    expect(jamb).toContain("classRankings");
    expect(ui).toContain("Mic {microphoneStatus}");
    expect(ui).toContain("Exam monitoring review");
    expect(ui).toContain("studentJambRecording");
    expect(jamb).toContain('status: "expired"');
    expect(ui).toContain("recorder.requestData()");
    expect(ui).toContain("lightweight 5MB limit");
    expect(jamb).toContain("between 1 byte and 5MB");
    expect(jamb).toContain("db.insert(jambRecordings)");
    expect(ui).toContain("Recording management");
    expect(router).toContain("adminJambMonitoringEvents");
    expect(ui).toContain("Achieved:");
    expect(jamb).toContain('eq(jambExams.status, "published")');
    expect(jamb).toContain('export async function listJambExams(status?:');
    expect(router).toContain('ctx.user.role === "student" ? "published" : input?.status');
    expect(router).toContain("prescribedTextbook");
    expect(router).toContain("fromDate");
    expect(router).toContain("toTime");
    expect(jamb).toContain("academicSession");
  });

  it("keeps the student and admin workspaces role-isolated", () => {
    const home = readFileSync("client/src/pages/Home.tsx", "utf8");
    expect(home).toContain('"JambPractice"');
    expect(home).toContain('"JambManager"');
    expect(home).toContain("Open JAMB question manager");
    expect(home).toContain('user?.role === "student" ? <StudentJambPractice />');
    expect(home).toContain('user?.role === "admin" ? <AdminJambPractice />');
  });
});
