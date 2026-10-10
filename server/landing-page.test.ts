import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");
const routerSource = readFileSync(new URL("./routers.ts", import.meta.url), "utf8");
const dbSource = readFileSync(new URL("./db.ts", import.meta.url), "utf8");
const schemaSource = readFileSync(new URL("../drizzle/schema.ts", import.meta.url), "utf8");

describe("public academy landing page", () => {
  it("contains the academy-branded landing and one unified portal entry", () => {
    expect(homeSource).toContain("className=\"public-site\"");
    expect(homeSource).toContain("Unified school portal");
    expect(homeSource).toContain("Staff, accountants, parents and students");
    expect(homeSource).toContain("Sign in to portal");
    expect(homeSource).toContain("AccountantDashboard");
    expect(homeSource).toContain("ParentDashboard");
    expect(homeSource).toContain("StudentDashboard");
    expect(homeSource).toContain("GalleryManager");
    expect(homeSource).toContain("NewsManager");
    expect(homeSource).toContain("TeacherAssignments");
    expect(homeSource).toContain("ProfileSettings");
    expect(homeSource).toContain("createAssignment");
    expect(homeSource).toContain("changePassword");
  });

  it("includes accessible authentication affordances and success feedback", () => {
    expect(homeSource).toContain("password-visibility");
    expect(homeSource).toContain("aria-label={showPassword ? \"Hide password\" : \"Show password\"}");
    expect(homeSource).toContain("checked={rememberMe}");
    expect(homeSource).toContain("toast.success(`Welcome back — opening your ${loginRole.toLowerCase()} dashboard`)");
    expect(homeSource).toContain("window.setTimeout(() => window.location.reload(), 900)");
    expect(stylesSource).toContain(".portal-spinner");
  });

  it("includes the administrator student credential export workflow", () => {
    expect(homeSource).toContain("Export login credentials");
    expect(homeSource).toContain("buildStudentCredentialCsv");
    expect(homeSource).toContain("alfurqan-student-login-credentials.csv");
    expect(homeSource).toContain("Administrator-only: download admission numbers and the initial password");
  });

  it("includes password recovery and inline credential feedback", () => {
    expect(homeSource).toContain("Reset your password");
    expect(homeSource).toContain("Request reset");
    expect(homeSource).toContain("The username or password is incorrect.");
    expect(homeSource).toContain("aria-invalid={Boolean(loginErrors.username || loginErrors.credentials)}");
    expect(stylesSource).toContain(".portal-credential-error");
    expect(stylesSource).toContain(".reset-overlay");
  });

  it("uses persistent attendance data in the overview instead of fabricated chart values", () => {
    expect(homeSource).toContain("attendanceOverview = trpc.school.attendance.useQuery(undefined, { enabled: isAdministrator })");
    expect(homeSource).toContain("attendanceDays");
    expect(homeSource).toContain("todayAttendance");
    expect(homeSource).not.toContain("[[82,18],[91,9],[87,13],[96,4],[94,6],[89,11],[95,5]]");
    expect(homeSource).not.toContain('value="—" change="Not recorded" icon={ClipboardCheck}');
  });

  it("exposes detailed student profiles and directory navigation controls", () => {
    expect(homeSource).toContain("Student directory");
    expect(homeSource).toContain("Add student");
    expect(homeSource).toContain("profile-panel");
    expect(homeSource).toContain("Export CSV");
    expect(homeSource).toContain("Choose CSV file");
    expect(homeSource).toContain("text.split(/\\r?\\n/)");
    expect(homeSource).toContain("Choose CSV file");
    expect(homeSource).toContain("disabled={!importClass || bulk.isPending}");
    expect(homeSource).toContain("Reading CSV file...");
    expect(homeSource).toContain("Saving students...");
    expect(homeSource).toContain("Import completed successfully");
    expect(homeSource).toContain("setImportStatus(\"success\")");
    expect(homeSource).toContain("students imported successfully");
    expect(stylesSource).toContain(".profile-modal");
    expect(stylesSource).toContain(".import-students-button");
    expect(homeSource).toContain("bulkDeleteStudents");
    expect(homeSource).toContain("Delete selected");
    expect(homeSource).toContain("Blank upload workbook");
    expect(homeSource).toContain("value={row.firstCa || \"\"}");
    expect(homeSource).toContain("Totals, grades and positions recalculate instantly");
    expect(homeSource).toContain("subject-catalog");
    expect(routerSource).toContain("bulkDeleteStudents: adminProcedure");
    expect(routerSource).toContain("academicSessions");
    expect(routerSource).toContain("academicTerms");
    expect(routerSource).toContain("createAcademicSession: adminProcedure");
    expect(routerSource).toContain("createAcademicTerm: adminProcedure");
    expect(homeSource).toContain("Create session");
    expect(homeSource).toContain("Create term");
    expect(homeSource).toContain("function CaSheetView");
    expect(homeSource).toContain("Academic Session:<span>{session}</span>");
    expect(homeSource).toContain("Term:<span>{term}</span>");
    expect(homeSource).toContain("const sessionsQuery = trpc.school.academicSessions.useQuery()");
    expect(homeSource).toContain("const termsQuery = trpc.school.academicTerms.useQuery()");
    expect(homeSource).toContain("Add subject");
    expect(homeSource).toContain("Assign subject to teacher");
    expect(homeSource).toContain("Select teacher");
    expect(homeSource).toContain("Select session");
    expect(homeSource).toContain("Save assignment");
    expect(dbSource).toContain("No available admission-number sequence remains for");
    expect(homeSource).toContain("name,gender,parentPhone,studentPhone");
    expect(homeSource).toContain("Admission numbers are generated automatically");
    expect(homeSource).toContain("sessionsQuery.data");
    expect(homeSource).toContain("termsQuery.data");
  });

  it("lets administrators browse student rosters by section and class from Nursery through Senior", () => {
    expect(homeSource).toContain('aria-label="Browse students by section"');
    expect(homeSource).toContain('aria-label="View students by class"');
    expect(homeSource).toContain("const classOptions =");
    expect(homeSource).toContain("sectionMatchesClass");
    expect(homeSource).toContain('option>Nursery</option>');
    expect(homeSource).toContain('option>Primary</option>');
    expect(homeSource).toContain('option>Junior</option>');
    expect(homeSource).toContain('option>Senior</option>');
    expect(stylesSource).toContain(".student-class-browser");
  });

  it("renders linked family records with loading and unlinked states", () => {
    expect(homeSource).toContain("Loading linked student records...");
    expect(homeSource).toContain("Loading your linked records...");
    expect(homeSource).toContain("Latest results");
    expect(homeSource).toContain("My results");
    expect(homeSource).toContain("Linked student register");
    expect(homeSource).toContain("Recent register entries");
    expect(homeSource).toContain("Invoices & payments");
    expect(homeSource).toContain("My school fees");
    expect(homeSource).toContain("Submit a payment");
    expect(homeSource).toContain("Download receipt");
    expect(homeSource).toContain("My assignments");
    expect(homeSource).toContain("Announcements");
    expect(homeSource).toContain("No timetable records are available yet");
    expect(homeSource).toContain("assignmentsQuery = trpc.school.assignments.useQuery");
    expect(homeSource).toContain("No linked student record is available");
    expect(homeSource).toContain("Outstanding balance");
    expect(homeSource).toContain("Verified payments deducted");
    expect(homeSource).toContain("Could not load linked student records");
    expect(homeSource).toContain("Could not load assignments");
    expect(homeSource).toContain("Could not load announcements");
    expect(homeSource).toContain("studentsQuery = trpc.school.students.useQuery");
    expect(homeSource).toContain("paymentsQuery = trpc.school.payments.useQuery");
    expect(homeSource).toContain("Select a student before recording the payment");
    expect(homeSource).toContain("Database-backed payment ledger");
    expect(homeSource).toContain("Could not load payments");
    expect(homeSource).toContain("function ClassesView()");
    expect(homeSource).toContain("Select import class");
    expect(homeSource).toContain("Choose a class, then upload a CSV");
    expect(homeSource).toContain("These records power student class selection");
    expect(routerSource).toContain("createClass: adminProcedure");
    expect(routerSource).toContain("updateClass: adminProcedure");
    expect(routerSource).toContain("deleteClass: adminProcedure");
    expect(routerSource).toContain("classSubjects: roleProcedure");
    expect(routerSource).toContain("createSubject: adminProcedure");
    expect(routerSource).toContain("translateSubjectToArabic: adminProcedure");
    expect(routerSource).toContain("translateMissingSubjects: adminProcedure");
    expect(routerSource).toContain("SUBJECT_TERMINOLOGY_OVERRIDES");
    expect(routerSource).toContain("confidence");
    expect(homeSource).toContain("Translate all missing Arabic names");
    expect(homeSource).toContain("Review recommended");
    expect(routerSource).toContain("arabic_subject_translation");
    expect(homeSource).toContain("Translate with AI");
    expect(homeSource).toContain("translateSubjectToArabic.useMutation");
    expect(routerSource).toContain("updateClassSubject: adminProcedure");
    expect(routerSource).toContain("deleteClassSubject: adminProcedure");
    expect(homeSource).toContain("function ClassSubjectsPanel");
    expect(homeSource).toContain("Subject added successfully");
    expect(homeSource).toContain("No subjects added yet. Use the Add subject form above.");
    expect(homeSource).toContain("Assign teacher");
    expect(homeSource).toContain("subject-catalog");
    expect(homeSource).toContain("Enter the subject name in Arabic");
    expect(homeSource).toContain("displayOrder");
    expect(homeSource).toContain("classSubjectsQuery");
    expect(homeSource).toContain("const studentsQuery = trpc.school.students.useQuery({ className }");
    expect(homeSource).toContain("const roster = studentsQuery.data ?? []");
    expect(homeSource).toContain("No subjects are assigned to this class yet");
    expect(routerSource).toContain("teacherId: z.number().int().positive().nullable().optional()");
    expect(routerSource).toContain("subjectType: z.enum([\"compulsory\", \"elective\"])");
    expect(routerSource).toContain("teacherWorkload: roleProcedure");
    expect(routerSource).toContain("isTeacherAssignedToSubject");
    expect(homeSource).toContain("function TeacherWorkloadView");
    expect(homeSource).toContain("No teacher-subject assignments exist yet");
    expect(homeSource).toContain("function CaSheetView");
    expect(homeSource).toContain("Print / Save PDF");
    expect(homeSource).toContain("Bulk print all subjects");
    expect(homeSource).toContain("same uniform blank form");
    expect(homeSource).toContain('alt="Al-Furqan Science Academy Lafia crest"');
    expect(homeSource).toContain("logoFallback");
    expect(homeSource).toContain("data:image/jpeg;base64");
    expect(homeSource).toContain("ca-sheet-watermark");
    expect(homeSource).toContain("const subjectsQuery = trpc.school.classSubjects.useQuery");
    expect(homeSource).toContain("STUDENT NAME");
    expect(homeSource).toContain("CA BREAKDOWN");
    expect(homeSource).toContain("Add subject");
    expect(homeSource).not.toContain("CLASS PERFORMANCE SUMMARY");
    expect(homeSource).not.toContain("CLASS TEACHER'S REMARK");
    expect(homeSource).toContain("getScoreLimits(className)");
    expect(homeSource).toContain("max={scoreLimits.caEach}");
    expect(homeSource).toContain("max={scoreLimits.exam}");
    expect(stylesSource).toContain(".reference-ca-sheet");
    expect(stylesSource).toContain(".reference-ca-table");
    expect(stylesSource).toContain("@media print");
    expect(stylesSource).toContain("@page { size: A4 portrait");
    expect(stylesSource).toContain(".reference-ca-table th, .reference-ca-table td { font-size: 5.7pt");
    expect(stylesSource).toContain(".ca-sheet-watermark");
    expect(stylesSource).toContain(".ca-sheet-watermark img { display: block !important");
    expect(stylesSource).toContain(".family-records-grid");
    expect(homeSource).toContain("Bulk print all subjects");
  });

  it("keeps role navigation isolated and exposes logout behavior", () => {
    expect(homeSource).toContain("aria-label={`Signed in as ${role}`}");
    expect(homeSource).not.toContain("aria-label=\"Switch role\"");
    expect(homeSource).toContain("roleAccess");
    expect(homeSource).toContain("onClick={logout}");
  });

  it("keeps each role’s navigation set isolated", () => {
    expect(homeSource).toContain('Teacher: ["Overview","Attendance","Results","Assignments","Timetable","Announcements","Profile"]');
    expect(homeSource).toContain('Accountant: ["Overview","Fees","Reports","Announcements","Profile"]');
    expect(homeSource).toContain('Parent: ["Overview","ReportCards","Fees","Announcements","Profile"]');
    expect(homeSource).toContain('Student: ["Overview","Results","Timetable","Assignments","JambPractice","Announcements","Profile"]');
    expect(homeSource).toContain("if (!roleAccess[role]?.includes(view))");
  });

  it("includes responsive landing and portal styles", () => {
    expect(stylesSource).toContain(".public-hero");
    expect(stylesSource).toContain(".portal-overlay");
    expect(stylesSource).toContain("@media(max-width:800px)");
    expect(stylesSource).toContain("@media(max-width:480px)");
  });
});


describe("nursery termly report workspace", () => {
  it("contains the Nursery-only report template, live selectors, and data bindings", () => {
    expect(homeSource).toContain("function SectionTermlyReportView()");
    expect(homeSource).toContain("reportSection.toUpperCase()} TERMLY REPORT");
    expect(homeSource).toContain("<label>{reportSection} class<select");
    expect(homeSource).toContain("Pupil");
    expect(homeSource).toContain("Admission No.: <b>{reportStudent.admissionNo || \"—\"}</b>");
    expect(homeSource).toContain("trpc.school.classSubjects.useQuery");
    expect(homeSource).toContain("trpc.school.results.useQuery");
    expect(homeSource).toContain("BEHAVIORAL OBJECTIVES");
    expect(homeSource).toContain("GRADING SYSTEM");
    expect(homeSource).toContain("Class Teacher’s Comment");
    expect(homeSource).toContain("Print / Save PDF");
    expect(homeSource).toContain("sectionMatchesClass(reportSection as AcademicSection, item.section)");
  });

  it("keeps the report branded and A4 print-safe", () => {
    expect(homeSource).toContain("src={logo}");
    expect(stylesSource).toContain(".nursery-report-sheet");
    expect(stylesSource).toContain(".nursery-report-table");
    expect(stylesSource).toContain(".nursery-report-lower");
    expect(stylesSource).toContain("@media print{.report-controls,.view-intro");
    expect(stylesSource).toContain("width:8.27in");
  });
});


describe("report metadata and score upload contracts", () => {
  it("exposes persisted report fields and protected procedures", () => {
    expect(homeSource).toContain("trpc.school.termlyReports.useQuery");
    expect(homeSource).toContain("trpc.school.saveTermlyReport.useMutation");
    expect(homeSource).toContain("automatic-comment");
    expect(dbSource).toContain("timesPresent");
    expect(dbSource).toContain("timesAbsent");
    expect(homeSource).toContain("classPosition");
    expect(routerSource).toContain("termlyReports: roleProcedure");
    expect(routerSource).toContain("saveTermlyReport: roleProcedure");
    expect(dbSource).toContain("export async function listTermlyReports");
    expect(dbSource).toContain("upsertTermlyReport");
    expect(dbSource).toContain("termlyReports");
  });

  it("supports batch report printing and completed score workbook loading", () => {
    expect(homeSource).toContain("Print all pupils");
    expect(homeSource).toContain("setBatchPrint(true)");
    expect(homeSource).toContain("Upload completed scores");
    expect(homeSource).toContain("XLSX.read(await file.arrayBuffer()");
    expect(homeSource).toContain("No workbook rows matched the current class roster");
    expect(homeSource).toContain("click Save scores to persist them");
    expect(homeSource).toContain("saveResultMutation.mutateAsync");
  });
});


describe("separate CA Sheet and Nursery report contracts", () => {
  it("keeps CA Sheet navigation and workspace separate from report cards", () => {
    expect(homeSource).toContain('view: "CASheet" as ViewKey');
    expect(homeSource).toContain('activeView === "CASheet" && user?.role === "admin" ? <CaSheetView />');
    expect(homeSource).toContain("Printable CA sheets");
    expect(homeSource).toContain("Bulk print all subjects");
    expect(homeSource).toContain("Print / Save PDF");
    expect(homeSource).toContain('activeView === "ReportCards" ? <SectionTermlyReportView />');
  });

  it("renders Nursery report scores by each subject name", () => {
    expect(homeSource).toContain("getNurserySubjectScore(reportData?.scores, item.name)");
    expect(homeSource).toContain("getNurserySubjectTotal(reportData?.scores, item.name)");
    expect(homeSource).toContain("getNurserySubjectGrade(itemTotal)");
  });
});


describe("bilingual Nursery reports and print previews", () => {
  it("supports English and Arabic subject names through the database-backed subject workflow", () => {
    expect(homeSource).toContain("arabicName");
    expect(homeSource).toContain("Subject name in Arabic");
    expect(homeSource).toContain("item.arabicName");
    expect(homeSource).toContain("Preview CA Sheet");
  });

  it("uses automatic position comments and removes attendance fields from Nursery reports", () => {
    expect(homeSource).toContain("automatic-comment");
    expect(homeSource).toContain("Position");
    expect(homeSource).not.toContain("<span>Present: <b>{reportData?.timesPresent");
    expect(homeSource).not.toContain("<span>Absent: <b>{reportData?.timesAbsent");
    expect(homeSource).not.toContain("<span>Late: <b>{reportData?.timesLate");
    expect(homeSource).toContain("{reportSection} termly report preview");
    expect(homeSource).toContain("Whole class:");
  });
});

describe("dedicated subject creation form", () => {
  it("uses a simple class, English name, and Arabic name workflow", () => {
    expect(homeSource).toContain("function SubjectCatalogView()");
    expect(homeSource).toContain("Create each subject once, then assign it to teachers and classes below.");
    expect(homeSource).toContain("Subject name in English");
    expect(homeSource).toContain("Subject name in Arabic");
    expect(homeSource).toContain("createSubject.useMutation");
    expect(homeSource).toContain("toast.success(\"Subject added successfully\")");
    expect(homeSource).toContain("setEditingId(null)");
    expect(homeSource).toContain("setName(\"\")");
    expect(homeSource).toContain("setArabicName(\"\")");
  });
});

describe("administrator-only CA Sheet access", () => {
  it("removes CA Sheet from principal and teacher role access while retaining it for administrators", () => {
    expect(homeSource).toContain('Administrator: ["Overview","Students","ViewStudent","Teachers","Parents","Classes","Attendance","Results","CASheet"');
    expect(homeSource).toContain('Principal: ["Overview","Attendance","Results","ReportCards"');
    expect(homeSource).toContain('Teacher: ["Overview","Attendance","Results","Assignments"');
    expect(homeSource).toContain('activeView === "CASheet" && user?.role === "admin" ? <CaSheetView />');
  });
});

describe("immediate teacher score publishing", () => {
  it("saves scores directly without an approval step", () => {
    expect(homeSource).toContain("Scores saved successfully and published to the database");
    expect(homeSource).toContain('onClick={submitReview}');
    expect(homeSource).toContain("Save scores");
    expect(homeSource).not.toContain("Submit for review");
    expect(homeSource).not.toContain("Results submitted to the database for review");
    expect(homeSource).not.toContain("canReview && <div className=\"flex gap-2\">");
  });
});

describe("score-save feedback and CA Sheet pagination", () => {
  it("confirms incomplete saves and exposes clear progress feedback", () => {
    expect(homeSource).toContain("no scores entered. Save these scores anyway?");
    expect(homeSource).toContain("loading-spinner");
    expect(homeSource).toContain("Scores saved successfully and published to the database");
  });

  it("shows the latest score update time and splits CA rosters after 30 pupils", () => {
    expect(homeSource).toContain("Last updated:");
    expect(homeSource).toContain("const pageSize = 33");
    expect(homeSource).toContain("rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)");
    expect(stylesSource).toContain("@page{size:A4 portrait");
  });
});


describe("final refinement workflows", () => {
  it("exposes an administrator-only student viewer with session, section, and class filters", () => {
    expect(homeSource).toContain('view: "ViewStudent" as ViewKey');
    expect(homeSource).toContain('Administrator: ["Overview","Students","ViewStudent"');
    expect(homeSource).toContain("function AdminStudentView()");
    expect(homeSource).toContain("Roster filters");
    expect(homeSource).toContain("Section<select");
    expect(homeSource).toContain("Class<select");
    expect(homeSource).toContain("Session<select");
    expect(homeSource).toContain('activeView === "ViewStudent" && user?.role === "admin"');
  });

  it("keeps the report source visible to native browser PDF printing", () => {
    expect(stylesSource).toContain(".nursery-report-print-source,.ca-sheet-print-source{display:block!important}");
    expect(stylesSource).not.toContain("#root>*");
    expect(stylesSource).toContain("#root [data-dashboard-shell]");
    expect(stylesSource).toContain("#root .no-print{display:none!important}");
  });

  it("keeps Manus/editor chrome and the application title out of CA Sheet print output", () => {
    expect(homeSource).toContain("const printCaSheet = () =>");
    expect(homeSource).toContain('document.title = ""');
    expect(homeSource).toContain('window.addEventListener("afterprint", restoreTitle)');
    expect(homeSource).toContain("onClick={printCaSheet}>Print / Save PDF");
    expect(stylesSource).toContain("body:has(.ca-sheet-print-source) > manus-content-root");
    expect(stylesSource).toContain(".made-with-manus");
    expect(stylesSource).toContain("[data-manus-footer]");
  });

  it("does not expose principal or staff signature functionality", () => {
    expect(homeSource).not.toContain("Report signatures");
    expect(homeSource).not.toContain("report-signature-grid");
    expect(homeSource).not.toContain("uploadSignature");
    expect(routerSource).not.toContain("uploadSignature");
    expect(routerSource).not.toContain("listSchoolSignatures");
    expect(schemaSource).not.toContain("schoolSignatures");
  });

  it("keeps report output print-safe and suppresses dashboard chrome", () => {
    expect(stylesSource).toContain("#root nav");
    expect(stylesSource).toContain("#root aside");
    expect(stylesSource).toContain("#root .admin-menu");
    expect(stylesSource).toContain("#root .no-print");
    expect(stylesSource).toContain("break-inside:avoid");
  });
});


describe("CA Sheet print spacing", () => {
  it("fills the final printed page to 33 table rows for underfilled classes", () => {
    expect(homeSource).toContain("ca-sheet-blank-row");
    expect(homeSource).toContain("const blankCount = pageRows.length ? Math.max(0, pageSize - pageRows.length) : 0");
    expect(homeSource).toContain('className="ca-sheet-blank-row"');
  });

  it("preserves the page break before row 34 and avoids a break after row 33", () => {
    expect(homeSource).toContain("reference-ca-sheet");
    expect(stylesSource).toContain("reference-ca-sheet + .reference-ca-sheet");
  });
});

describe("AI subject translation response handling", () => {
  it("accepts text-part responses and preserves malformed-response validation", () => {
    expect(routerSource).toContain("Array.isArray(content)");
    expect(routerSource).toContain('part.type === "text"');
    expect(routerSource).toContain('typeof content === "string"');
    expect(routerSource).toContain("The translation service returned an invalid Arabic subject response");
  });
});


describe("Primary termly report layout", () => {
  it("shares the Nursery report data engine but renders a distinct Primary theme", () => {
    expect(homeSource).toContain('value="Primary">Primary</option>');
    expect(homeSource).toContain('reportSection === "Primary" ? "primary-report-sheet"');
    expect(homeSource).toContain("reportSection.toUpperCase()} TERMLY REPORT");
    expect(stylesSource).toContain(".primary-report-sheet");
    expect(homeSource).toContain("primary-report-source");
  });
});


describe("Report Cards preview toggle", () => {
  it("supports quick switching across Nursery, Primary, Junior, and Senior layouts", () => {
    expect(homeSource).toContain('"Nursery", "Primary", "Junior", "Senior"');
    expect(homeSource).toContain('aria-label="Report layout"');
    expect(homeSource).toContain('value="Junior">Junior</option>');
    expect(homeSource).toContain('value="Senior">Senior</option>');
    expect(homeSource).toContain('reportSection === "Junior" || reportSection === "Senior"');
  });

  it("uses section-aware score limits and never leaves an empty preview source", () => {
    expect(homeSource).toContain("reportLimits.caEach");
    expect(homeSource).toContain("reportLimits.exam");
    expect(homeSource).toContain("reportStudents.length ? reportStudents.map");
    expect(homeSource).toContain("report-preview-empty");
    expect(stylesSource).toContain(".report-layout-toggle");
    expect(stylesSource).toContain(".secondary-report-source");
  });
});


describe("cross-section result isolation", () => {
  it("clears stale class data and only enables report queries for the selected section", () => {
    expect(homeSource).toContain("selectedClassBelongsToSection");
    expect(homeSource).toContain('sectionMatchesClass(reportSection, classRecord.section)');
    expect(homeSource).toContain("const activeStudents = selectedClassBelongsToSection");
    expect(homeSource).toContain("section: reportSection");
    expect(homeSource).toContain("setClassName(\"\"); setStudentId(\"\"); setSubjectIndex(0)");
  });

  it("enforces the section boundary in the database-backed result and report queries", () => {
    expect(dbSource).toContain("leftJoin(academyClasses, eq(resultEntries.className, academyClasses.name))");
    expect(dbSource).toContain("if (context.section) conditions.push(eq(academyClasses.section, context.section))");
    expect(dbSource).toContain("context.section && (!classRows[0]");
    expect(routerSource).toContain('section: z.enum([\"Nursery\", \"Primary\", \"Junior\", \"Senior\"]).optional()');
  });
});


describe("result write isolation", () => {
  it("prevents saving a score under a different student class", () => {
    expect(dbSource).toContain("The student does not belong to the selected class");
    expect(dbSource).toContain("studentRow[0].className !== input.className");
  });

  it("renders only subjects from the validated class context", () => {
    expect(homeSource).toContain("activeSubjects.map(item =>");
    expect(homeSource).toContain("activeSubjects.length");
  });
});


describe("supplied Primary, Junior, and Senior report templates", () => {
  it("assigns distinct template themes and headings for each remaining section", () => {
    expect(homeSource).toContain('"junior-report-sheet"');
    expect(homeSource).toContain('"senior-report-sheet"');
    expect(homeSource).toContain('"primary-report-sheet"');
    expect(homeSource).toContain('const reportHeading = `${reportSection.toUpperCase()} TERMLY REPORT SHEET`');
  });

  it("keeps the secondary 10/10/10/70 score model and separate print styling", () => {
    expect(homeSource).toContain('getScoreLimits(className || (reportSection === "Junior" || reportSection === "Senior" ? "JSS 1" : "NURSERY"))');
    expect(homeSource).toContain("reportLimits.caEach");
    expect(homeSource).toContain("reportLimits.exam");
    expect(stylesSource).toContain(".junior-report-sheet");
    expect(stylesSource).toContain(".senior-report-sheet");
  });
});


describe("Report Cards sample data and batch export", () => {
  it("does not expose the removed demo-data action or demo class definitions", () => {
    expect(routerSource).not.toContain("createReportSampleData");
    expect(dbSource).not.toContain("PRIMARY 4A DEMO");
    expect(dbSource).not.toContain("JSS 1A DEMO");
    expect(dbSource).not.toContain("SSS 1A DEMO");
    expect(homeSource).not.toContain("Create sample classes");
  });

  it("exports the selected class through one browser print job", () => {
    expect(homeSource).toContain("Export class PDF");
    expect(homeSource).toContain("Preparing ${activeStudents.length} ${reportSection} report cards for one PDF");
    expect(homeSource).toContain("setPendingBatchPrint(true)");
    expect(homeSource).toContain("renderedReports === reportStudents.length");
  });
});


describe("parent report email removal", () => {
  it("keeps email delivery controls out of Report Cards and preserves PDF export", () => {
    expect(homeSource).not.toContain("Email parent");
    expect(homeSource).not.toContain("Send report by email");
    expect(homeSource).not.toContain("Resend");
    expect(homeSource).toContain("Export class PDF");
    expect(homeSource).toContain("Print / Save PDF");
  });
});


describe("Junior and Senior Results visibility", () => {
  it("filters result-entry classes by section and supports JSS/SSS aliases", () => {
    expect(homeSource).toContain('const [reportSection, setReportSection] = useState<"Nursery" | "Primary" | "Junior" | "Senior">("Senior")');
    expect(homeSource).toContain('value.includes("jss") || value.includes("junior")');
    expect(homeSource).toContain('value.includes("sss") || value.includes("senior")');
    expect(homeSource).toContain('setReportSection(e.target.value as "Nursery" | "Primary" | "Junior" | "Senior")');
  });

  it("keeps Junior and Senior result queries section-scoped", () => {
    expect(homeSource).toContain('section: reportSection');
    expect(homeSource).toContain('getScoreLimits(className || (reportSection === "Junior" || reportSection === "Senior" ? "JSS 1" : "NURSERY"))');
    expect(homeSource).toContain('No active {reportSection} classes are available');
  });
});


describe("shared class selector section mapping", () => {
  it("maps Junior to JSS and Senior to SSS across report and attendance flows", () => {
    expect(homeSource).toContain("const sectionMatchesClass =");
    expect(homeSource).toContain('value.includes("jss") || value.includes("junior")');
    expect(homeSource).toContain('value.includes("sss") || value.includes("senior")');
    expect(homeSource).toContain('sectionMatchesClass(reportSection, classRecord.section)');
    expect(homeSource).toContain('sectionMatchesClass(reportSection, item.section)');
    expect(homeSource).toContain('const classOptions = classesQuery.data ?? []');
  });

  it("keeps live class selectors database-backed instead of fixed sample options", () => {
    expect(homeSource).toContain('{classOptions.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}');
    expect(homeSource).toContain('{(classesQuery.data ?? []).filter(item => sectionMatchesClass(reportSection as AcademicSection, item.section))');
  });
});


describe("report rendering stability", () => {
  it("uses a stable student key for each SectionTermlyReportView article", () => {
    expect(homeSource).toContain("return <article key={reportStudent.id} className={`nursery-report-sheet ${reportTemplate}`} style=");
  });
});


describe("admission number standardization", () => {
  it("generates the requested uppercase three-digit format and exposes the starter password", () => {
    expect(dbSource).toContain("const candidate = formatStudentAdmissionNumber(className, sequence);");
    expect(dbSource).toContain("const prefix = `2026/AFSAL/${section}/`;");
    expect(homeSource).toContain("Initial password: 12345");
  });

  it("forces student accounts through the first-login password-change gate", () => {
    expect(schemaSource).toContain("mustChangePassword");
    expect(routerSource).toContain("Change your default password before accessing student records");
    expect(homeSource).toContain("Change your default password");
    expect(homeSource).toContain("Reset student password");
  });
});


describe("student dashboard result isolation", () => {
  it("routes students to the dashboard and labels results as linked-student records", () => {
    expect(homeSource).toContain('if (user.role === "student" && user.mustChangePassword)');
    expect(homeSource).toContain('subtitle="Only your linked student result records"');
    expect(homeSource).toContain('const results = profile.data?.results ?? []');
    expect(routerSource).toContain('return getStudentProfile(linkedStudentIdOrThrow(user) ?? 0, { publishedResultsOnly: true })');
  });
});


describe("Primary and Junior live result reflection", () => {
  it("keeps both section templates connected to the live bilingual class-subject query", () => {
    expect(homeSource).toContain('reportSection === "Primary" ? "primary-report-sheet"');
    expect(homeSource).toContain('reportSection === "Junior" ? "junior-report-sheet"');
    expect(homeSource).toContain('trpc.school.classSubjects.useQuery({ classId: classRecord?.id ?? 0, status: "active" }');
    expect(homeSource).toContain('<td dir="rtl">{item.arabicName || item.name}</td>');
    expect(homeSource).toContain('{item.name}{item.arabicName ? ` · ${item.arabicName}` : ""}');
  });
});


describe("administrator subject upload progress report", () => {
  it("uses the protected live aggregate and exposes class/session/term filters", () => {
    expect(routerSource).toContain("subjectUploadProgress: adminProcedure");
    expect(dbSource).toContain("export async function getSubjectUploadProgress");
    expect(homeSource).toContain("All subjects upload percentage");
    expect(homeSource).toContain("trpc.school.subjectUploadProgress.useQuery");
    expect(homeSource).toContain("aria-label=\"All subjects upload percentage\"");
    expect(homeSource).toContain("student-subject records uploaded");
  });
  it("shows subject-level completion and empty/loading states", () => {
    expect(homeSource).toContain("report-progress-subject");
    expect(homeSource).toContain("No active subjects are assigned to this class.");
    expect(homeSource).toContain("Loading subject upload progress");
    expect(stylesSource).toContain(".report-progress-track span");
  });
  it("normalizes database JSS and SSS labels for Junior and Senior filters", () => {
    expect(dbSource).toContain('requestedSection === "junior"');
    expect(dbSource).toContain('actualSection === "jss"');
    expect(dbSource).toContain('requestedSection === "senior"');
    expect(dbSource).toContain('actualSection === "sss"');
  });
  it("renders a color-coded subject progress bar and status legend", () => {
    expect(homeSource).toContain("report-progress-legend");
    expect(homeSource).toContain("report-progress-subject-track");
    expect(homeSource).toContain('className={subject.status}');
    expect(homeSource).toContain('aria-label={`${subject.name} upload progress`}');
    expect(stylesSource).toContain(".report-progress-subject-track span.complete");
    expect(stylesSource).toContain(".report-progress-subject-track span.in-progress");
    expect(stylesSource).toContain(".report-progress-subject-track span.pending");
  });
});
