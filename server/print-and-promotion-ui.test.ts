import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("print and promotion safety UI", () => {
  const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
  const router = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
  const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
  const examCards = readFileSync(resolve(process.cwd(), "client/src/pages/ExamCardsView.tsx"), "utf8");

  it("renders an explicit rollback confirmation dialog before mutation", () => {
    expect(home).toContain("Reverse this student migration?");
    expect(home).toContain("Yes, reverse migration");
    expect(home).toContain("setRollbackTarget({ id: item.promotion.id");
  });

  it("offers source and destination academic-session controls for promotion", () => {
    expect(home).toContain("promotionFromSession");
    expect(home).toContain("promotionToSession");
    expect(home).toContain("fromSession: promotionFromSession || undefined");
    expect(home).toContain("toSession: promotionToSession || undefined");
  });

  it("protects CA admission numbers and fills the printable A4 sheet", () => {
    expect(styles).toContain("min-height:calc(297mm - .44in)");
    expect(styles).toContain(".reference-table-wrap{display:flex!important;flex:1 1 auto!important");
    expect(styles).toContain(".reference-ca-table th:nth-child(2),.reference-ca-table td:nth-child(2)");
    expect(styles).toContain("white-space:nowrap!important");
  });

  it("keeps result and report rosters scoped to the selected academic session", () => {
    expect(home).toContain("className: className || undefined, session");
    expect(router).toContain("session: z.string().max(32).optional()");
  });

  it("renders every selected-class pupil and waits for the full report batch before printing", () => {
    expect(home).toContain("batchPrint ? activeStudents");
    expect(home).toContain("Whole class: ${className} · ${reportStudents.length} pupils");
    expect(home).toContain("const renderedReports = document.querySelectorAll");
    expect(home).toContain("renderedReports === reportStudents.length");
    expect(home).toContain("setPendingBatchPrint(true)");
    expect(home).toContain("report-print-status report-print-status-loading");
    expect(home).toContain("Preparing {reportStudents.length || activeStudents.length} report cards");
    expect(home).toContain("report-print-status report-print-status-ready");
    expect(home).toContain("disabled={pendingBatchPrint}");
    expect(styles).toContain(".report-print-status-loading");
  });

  it("keeps the class-master content and one-report-per-A4-page print contract", () => {
    expect(home).toContain("Class Teacher’s Comment");
    expect(home).toContain("Class Teacher’s Signature");
    expect(home).toContain("report-comment-block");
    expect(home).toContain("nursery-report-signatures");
    expect(styles).toContain("height: 297mm !important");
    expect(styles).toContain("page-break-after: always !important");
    expect(styles).toContain(".nursery-report-sheet:last-child");
  });

  it("keeps examination cards A4-safe with an expanded timetable and side rules/signature regions", () => {
    expect(examCards).toContain("className=\"exam-card-lower-grid\"");
    expect(examCards).toContain("Subject</th><th>المادة</th><th>Date</th><th>Time");
    expect(examCards).toContain("className=\"exam-card-rules\"");
    expect(examCards).toContain("aria-label=\"Exam Officer signature\"");
    expect(examCards).toContain("className=\"exam-card-signature-line\"");
    expect(examCards).toContain("width:210mm;height:297mm");
    expect(examCards).toContain(".exam-card-lower-grid{display:block;min-height:0}");
    expect(examCards).toContain("grid-template-columns:repeat(2,minmax(0,1fr))");
    expect(examCards).toContain("@page{size:A4 portrait;margin:0}");
  });
});
