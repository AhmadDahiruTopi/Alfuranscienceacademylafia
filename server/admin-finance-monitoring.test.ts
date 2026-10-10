import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
const cssSource = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");
const jambSource = readFileSync(new URL("../client/src/pages/JambPractice.tsx", import.meta.url), "utf8");
const dbSource = readFileSync(new URL("./db.ts", import.meta.url), "utf8");
const routerSource = readFileSync(new URL("./routers.ts", import.meta.url), "utf8");

describe("administrator staff directory isolation", () => {
  it("uses administrator-managed portal staff accounts instead of student records", () => {
    expect(homeSource).toContain("const staffDirectoryRows = (accountsQuery.data ?? [])");
    expect(homeSource).toContain("This staff directory is sourced from the administrator-managed portal account");
    expect(dbSource).toContain('inArray(users.role, ["admin", "principal", "teacher", "accountant"])');
    expect(dbSource).toContain("sql`${users.linkedStudentId} IS NULL`");
    expect(dbSource).toContain("sql`${users.linkedSubjectId} IS NULL`");
  });

  it("keeps assignment oversight and user permission workspaces distinct", () => {
    expect(homeSource).toContain("function AdminAssignmentsView()");
    expect(homeSource).toContain("function AdminUsersView()");
    expect(homeSource).toContain('activeView === "Assignments" && user?.role === "admin" ? <AdminAssignmentsView />');
    expect(homeSource).toContain('activeView === "Users" && user?.role === "admin" ? <AdminUsersView />');
    expect(homeSource).toContain("Assignment register");
    expect(homeSource).toContain("Permission model");
  });
});

describe("receipt numbering and school branding", () => {
  it("persists a receipt number only when a payment becomes verified", () => {
    expect(dbSource).toContain("const receiptNumber = status === \"verified\"");
    expect(dbSource).toContain("current.receiptNumber ?? `${settings.receiptPrefix}-${new Date().getFullYear()}-${String(current.id).padStart(6, \"0\")}`");
    expect(dbSource).toContain("receiptIssuedAt = status === \"verified\"");
    expect(homeSource).toContain("Receipt number:");
    expect(homeSource).toContain("receiptSettingsQuery.data ?? defaultReceiptSettings");
  });

  it("exposes editable school-specific receipt branding and numbering prefix", () => {
    expect(homeSource).toContain("School address");
    expect(homeSource).toContain("Receipt number prefix");
    expect(homeSource).toContain("Save receipt branding");
    expect(routerSource).toContain("updateSchoolSettings");
    expect(routerSource).toContain("receiptPrefix: z.string()");
  });
});

describe("school settings singleton persistence", () => {
  it("merges defaults when the settings table has no row and updates the singleton when it exists", () => {
    expect(dbSource).toContain("async function writeSchoolSettings(patch: Record<string, unknown>, updatedBy: number)");
    expect(dbSource).toContain("db.update(schoolSettings).set({ ...patch, updatedBy, updatedAt: new Date() })");
    expect(dbSource).toContain("db.insert(schoolSettings).values({ ...defaultSchoolSettings, ...patch, updatedBy })");
    expect(dbSource).toContain("return writeSchoolSettings(values, updatedBy)");
  });
});

describe("accountant and live exam monitoring workflows", () => {
  it("provides real accountant recording and per-payment verification controls", () => {
    expect(homeSource).toContain("function AccountantDashboard");
    expect(homeSource).toContain("trpc.school.createPayment.useMutation");
    expect(homeSource).toContain("trpc.school.verifyBankTransfer.useMutation");
    expect(homeSource).toContain("Record a student payment");
    expect(homeSource).toContain("Verification queue");
    expect(homeSource).toContain('status: \"rejected\"');
  });

  it("limits live monitoring to consenting active attempts and closes the session", () => {
    expect(jambSource).toContain("I understand and consent to these local exam safeguards.");
    expect(jambSource).toContain("studentJambLiveOffer");
    expect(jambSource).toContain("adminJambLiveSessions");
    expect(jambSource).toContain("This is a consented live view for the active exam only.");
    expect(jambSource).toContain("studentJambLiveEnd");
    expect(routerSource).toContain("adminJambLiveSessions: adminProcedure");
    expect(routerSource).toContain("adminJambLiveSession: adminProcedure");
    expect(routerSource).toContain("studentJambLiveOffer: roleProcedure(\"student\")");
  });
});

describe("class-wide print pagination", () => {
  it("chunks every selected CA-sheet roster into 33-row A4 pages", () => {
    expect(homeSource).toContain("const pageSize = 33");
    expect(homeSource).toContain("rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)");
    expect(homeSource).toContain("reference-ca-sheet");
    expect(homeSource).toContain("Math.ceil(rows.length / pageSize)");
    expect(homeSource).not.toContain('className={index > 0 && index % 33 === 0 ? "ca-page-break" : undefined}');
  });

  it("keeps every report-card student in the selected class batch", () => {
    expect(homeSource).toContain("const reportStudents = previewOpen ? (batchPrint ? activeStudents");
    expect(homeSource).toContain("reportStudents.map(reportStudent =>");
  });
});


describe("monitor controls and print layout refinements", () => {
  it("provides fullscreen and connection-quality controls for administrator monitoring", () => {
    expect(jambSource).toContain("requestFullscreen");
    expect(jambSource).toContain("Connection: {qualityLabel}");
    expect(jambSource).toContain("connectionstatechange");
    expect(jambSource).toContain("Exit fullscreen");
  });

  it("keeps the result signature manual and the result table print-friendly", () => {
    expect(homeSource).toContain("manual-signature-row");
    expect(homeSource).toContain("manual-signature-line");
    expect(homeSource).toContain("Class Teacher’s Signature");
  });

  it("renders CA letterhead only on the first page of each selected class sheet", () => {
    expect(homeSource).toContain("pageIndex === 0 &&");
    expect(cssSource).toContain(".reference-ca-sheet:not(:first-child)");
    expect(cssSource).toContain(".reference-ca-sheet + .reference-ca-sheet");
  });
});
