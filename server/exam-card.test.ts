import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Examination Cards", () => {
  const schema = readFileSync(resolve(process.cwd(), "drizzle/schema.ts"), "utf8");
  const db = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
  const router = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
  const ui = readFileSync(resolve(process.cwd(), "client/src/pages/ExamCardsView.tsx"), "utf8");
  const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
  const studentUi = readFileSync(resolve(process.cwd(), "client/src/pages/StudentExamCards.tsx"), "utf8");
  const idCardsUi = readFileSync(resolve(process.cwd(), "client/src/pages/IdCardsView.tsx"), "utf8");

  it("persists the approved exam-card fields", () => {
    expect(schema).toContain('mysqlTable("examCards"');
    expect(schema).toContain("subjectsJson");
    expect(schema).toContain("timetableJson");
    expect(schema).toContain('status: mysqlEnum("status", ["issued", "printed", "cancelled"])');
    expect(db).toContain("createExamCard");
    expect(db).toContain("listExamCards");
    expect(router).toContain("issueExamCard");
    expect(router).toContain("examCards:");
  });

  it("keeps class subjects database-driven and limits cards to JSS/SSS classes", () => {
    expect(ui).toContain("JSS|SSS");
    expect(ui).toContain("classSubjects");
    expect(ui).toContain("Assigned subjects and timetable");
    expect(ui).toContain("JSS1–JSS3 and SS1–SS3");
  });

  it("supports editable rules, signature upload, shared photos, and automatic student access", () => {
    expect(schema).toContain("examinationRulesJson");
    expect(schema).toContain("visibilityStatus");
    expect(router).toContain("updateExaminationRules");
    expect(router).toContain("approveExamCard");
    expect(router).toContain("studentExamCards");
    expect(home).toContain("Examination rules and regulations");
    expect(home).toContain("Save examination rules");
    expect(ui).toContain("student.profileImageUrl");
    expect(ui).toContain("data-student-id={student.id}");
    expect(ui).toContain("data-admission-no={student.admissionNo}");
    expect(ui).toContain("const selectedStudent = studentId ?");
    expect(ui).toContain("rules={rules}");
    expect(studentUi).toContain("studentExamCards");
    expect(studentUi).toContain("appear here automatically");
    expect(studentUi).not.toContain("only after the administrator approves");
  });

  it("supports bulk approval, status filters, and student PDF controls", () => {
    expect(db).toContain("bulkApproveExamCards");
    expect(router).toContain("bulkApproveExamCards");
    expect(router).toContain("visibilityStatus: z.enum");
    expect(ui).toContain("Approve pending class cards");
    expect(ui).toContain("value=\"pending\"");
    expect(ui).toContain("value=\"approved\"");
    expect(studentUi).toContain("Download as PDF");
    expect(studentUi).toContain("PDF-ready preview");
    expect(studentUi).toContain("<ExamCard");
    expect(studentUi).toContain("readSubjects(card)");
    expect(studentUi).toContain('window.open(\"\", \"_blank\", \"width=900,height=1100\")');
    expect(studentUi).toContain("popup.document.open()");
    expect(studentUi).toContain("rules.slice(0, 5)");
    expect(db).toContain('visibilityStatus: "approved" as const');
    expect(db).toContain("studentVisible");
    expect(db).toContain("listStudentExamCards");
    expect(db).toContain("bulkIssueExamCards");
    expect(router).toContain("bulkIssueExamCards");
    expect(ui).toContain("Bulk issue for enrolled students");
    expect(ui).toContain("Issue cards for class");
    expect(ui).toContain("Entire section");
    expect(ui).toContain("No approval required");
  });

  it("keeps branding consistent in administrator and student PDF renderers", () => {
    expect(ui).toContain("schoolName?: string | null");
    expect(ui).toContain("schoolName?.trim() ||");
    expect(ui).toContain("logo={logo}");
    expect(home).toContain("ExamCardsView logo={logo} schoolName={schoolSettingsQuery.data?.schoolName}");
    expect(home).toContain("examOfficerSignature={schoolSettingsQuery.data?.examOfficerSignatureUrl}");
    expect(home).toContain("ictMisSignature={schoolSettingsQuery.data?.ictMisSignatureUrl}");
    expect(home).toContain("resolveStoredImageUrl(url) ?? url");
    expect(home).toContain("StudentExamCards logo={logo} schoolName={receiptSettingsQuery.data?.schoolName}");
    expect(studentUi).toContain("function printApprovedCard(card: any, student: any, logo?: string, schoolName?: string | null, rules: string[] = DEFAULT_RULES, examOfficerSignature?: string | null, ictMisSignature?: string | null)");
    expect(studentUi).toContain("schoolName?.trim() ||");
    expect(studentUi).toContain("toPrintDataUrl(resolveStoredImageUrl(logo))");
    expect(studentUi).toContain("async function toPrintDataUrl");
    expect(studentUi).toContain("toPrintDataUrl(resolveStoredImageUrl(examOfficerSignature))");
    expect(studentUi).toContain("toPrintDataUrl(resolveStoredImageUrl(ictMisSignature))");
    expect(studentUi).toContain("<img src=\"${logoUrl}\" alt=\"Academy logo\">");
  });

  it("scopes bulk approval to pending cards for the selected class and persists approval metadata", () => {
    expect(db).toContain('eq(examCards.session, filters.session)');
    expect(db).toContain('eq(examCards.term, filters.term)');
    expect(db).toContain('eq(examCards.className, filters.className)');
    expect(db).toContain('eq(examCards.visibilityStatus, "pending")');
    expect(db).toContain('visibilityStatus: "approved"');
    expect(db).toContain("approvedBy");
    expect(db).toContain("approvedAt");
  });

  it("scopes student results to published records and cleans deleted students across linked tables", () => {
    expect(router).toContain("publishedResultsOnly: true");
    expect(db).toContain('eq(resultEntries.status, "published")');
    expect(db).toContain("cleanupStudentRecords");
    expect(db).toContain("syncNewStudentEnrollments");
    expect(db).toContain("examCards");
    expect(db).toContain("db.transaction");
    for (const table of ["jambAnswers", "jambLiveSessions", "jambMonitoringEvents", "jambRecordings", "assignmentSubmissions", "resultEntries", "termlyReports", "attendanceRecords", "payments", "invoices", "examCards", "studentEnrollments", "studentPromotions", "alumni", "photoAuditLogs"]) expect(db).toContain(`tx.delete(${table})`);
    expect(db).toContain('eq(users.role, "student")');
  });

  it("synchronizes newly created students into active session rosters", () => {
    expect(db).toContain("syncNewStudentEnrollments");
    expect(db).toContain('eq(academicSessions.status, "active")');
    expect(db).toContain("studentEnrollments");
    expect(db).toContain('createStudent(input, "import")');
  });

  it("issues one card per enrolled student and avoids accidental duplicate cards", () => {
    expect(db).toContain("listSessionRoster(input.session, target.name)");
    expect(db).toContain("existingByKey");
    expect(db).toContain("createdRows");
    expect(db).toContain("updatedRows");
    expect(db).toContain('visibilityStatus: "approved"');
    expect(db).toContain("classesWithoutSubjects");
    expect(db).toContain("cardIds: refreshed.map(row => row.id)");
  });

  it("rehydrates student-visible card subjects from active class assignments", () => {
    expect(db).toContain("const liveSubjects = await db.select");
    expect(db).toContain('eq(classSubjects.status, "active")');
    expect(db).toContain("subjectsByClass");
    expect(db).toContain("persistedByName");
    expect(db).toContain("timetableByName");
    expect(db).toContain("listStudentExamCards");
    expect(studentUi).toContain("readSubjects(card)");
  });

  it("keeps the student popup card branding and manual signature line in one A4 sheet", () => {
    expect(studentUi).toContain("<footer class=\"signatures\">");
    expect(studentUi).toContain("class=\"signature-line\"");
    expect(studentUi).toContain("examOfficerSignatureUrl");
    expect(studentUi).toContain("ictMisSignatureUrl");
    expect(studentUi).toContain("Head of ICT/MIS");
    expect(studentUi).toContain("Ahmed Dahir Tobi");
    expect(studentUi).toContain("examOfficerSignatureUrl ? \"Exam Officer\" : \"Sign manually\"");
    expect(studentUi).not.toContain("Exam officer signature");
    expect(studentUi).toContain("popup.document.images");
    expect(studentUi).toContain("height:297mm;min-height:297mm;max-height:297mm");
    expect(studentUi).toContain("overflow:hidden");
    expect(studentUi).toContain("image.decode");
    expect(ui).toContain("async function embedPrintImages");
    expect(ui).toContain("fetch(image.src, { credentials: \"same-origin\" })");
    expect(ui).toContain("reader.readAsDataURL(blob)");
    expect(ui).toContain("popup.document.write");
    expect(ui).toContain("printDocumentStyles()");
    expect(studentUi).toContain("@page{size:A4 portrait;margin:0}");
    expect(studentUi).toContain("lower-grid");
    expect(studentUi).toContain("side-panel");
    expect(studentUi).toContain("font-size:18px;font-weight:900");
    expect(studentUi).toContain("width:54px;height:54px");
    expect(studentUi).toContain("padding:5px 4px;line-height:1.15");
  });

  it("keeps portraits visible across examination cards, report cards, and ID cards", () => {
    expect(ui).toContain("export function StoredExamImage");
    expect(ui).toContain("src={dataUrl ?? src}");
    expect(home).toContain("<StoredExamImage src={resolveStoredImageUrl(reportStudent.profileImageUrl, reportStudent.profileImageKey)}");
    expect(studentUi).toContain("<StoredExamImage className=\"table-avatar\"");
    expect(idCardsUi).toContain("import { StoredExamImage } from \"@/pages/ExamCardsView\"");
    expect(idCardsUi).toContain("<StoredExamImage src={record.imageUrl}");
    expect(idCardsUi).toContain("idCardSignatureKey");
    expect(idCardsUi).toContain("<StoredExamImage src={resolveStoredImageUrl(school.idCardSignatureUrl");
  });

  it("supports branded A4 single and class-batch print preview", () => {
    expect(ui).toContain("Print / Save PDF");
    expect(ui).toContain("Batch print class");
    expect(ui).toContain("@page{size:A4 portrait;margin:0}");
    expect(ui).toContain("width:210mm!important;height:297mm!important");
    expect(ui).toContain("page-break-inside:avoid!important");
    expect(ui).toContain(".exam-card-sheet:not(:last-child)");
    expect(ui).toContain("Exam Officer");
    expect(ui).toContain("className=\"exam-card-arabic-name\"");
    expect(ui).toContain("className=\"exam-card-english-name\"");
    expect(ui).toContain("<span className=\"exam-card-label\">EXAMINATION CARD</span>");
    expect(ui.indexOf("exam-card-arabic-name")).toBeLessThan(ui.indexOf("exam-card-english-name"));
    expect(ui.indexOf("exam-card-english-name")).toBeLessThan(ui.indexOf("exam-card-label"));
    expect(ui).toContain("font-size:18px!important");
    expect(ui).toContain("font-size:13px!important");
    expect(ui).toContain("exam-card-signatures");
    expect(ui).toContain("Head of ICT/MIS");
    expect(ui).toContain("Ahmed Dahir Tobi");
    expect(studentUi).toContain("class=\"arabic-name\"");
    expect(studentUi).toContain("class=\"english-name\"");
    expect(studentUi).toContain("class=\"card-label\">EXAMINATION CARD</span>");
    expect(studentUi.indexOf("class=\"arabic-name\"")).toBeLessThan(studentUi.indexOf("class=\"english-name\""));
    expect(studentUi.indexOf("class=\"english-name\"")).toBeLessThan(studentUi.indexOf("class=\"card-label\""));
    expect(studentUi).toContain("font-size:18px;font-weight:900");
    expect(studentUi).toContain("font-size:13px;font-weight:800");
    expect(studentUi).toContain("class=\"signatures\"");
    expect(studentUi).toContain("examOfficerSignatureUrl");
    expect(studentUi).toContain("ictMisSignatureUrl");
    expect(studentUi).toContain("Head of ICT/MIS");
    expect(studentUi).toContain("Ahmed Dahir Tobi");
    expect(ui).toContain("previewStudents.map");
    expect(ui).toContain("z-index:1000");
    expect(ui).toContain("print-color-adjust:exact");
    expect(ui).toContain("embedPrintImages");
    expect(ui).not.toContain("Exam officer signature");
    expect(ui).toContain("exam-card-signature-space");
    expect(ui).toContain("examOfficerSignatureUrl");
    expect(ui).toContain("ictMisSignatureUrl");
    expect(ui).toContain("exam-card-detail-box");
    expect(ui).toContain("exam-card-rules");
    expect(ui).toContain("Examination Rules &amp; Regulations");
    expect(ui).toContain("exam-card-signature-space");
    expect(ui).toContain("exam-card-lower-grid");
    expect(ui).toContain("font-size:13px!important;font-weight:800!important");
    expect(ui).toContain("width:54px;height:54px");
    expect(ui).toContain("table-layout:fixed;font-size:10px");
    expect(ui).toContain("padding:7px 6px;border:1px solid #d9dcec;line-height:1.2");
    expect(ui).toContain(".exam-card-lower-grid{display:block;min-height:0}");
    expect(ui).toContain("grid-template-columns:repeat(2,minmax(0,1fr))");
    expect(ui).toContain("exam-card-signature-line");
    expect(ui).toContain("exam-card-print-source .exam-card-rules");
    expect(ui).toContain("exam-card-print-source .exam-card-signature");
    expect(ui).toContain("opacity:1!important");
  });
});
