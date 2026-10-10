import { describe, expect, it } from "vitest";
import { randomSubjectPassword, subjectAccountUsername, subjectInitialPassword, subjectLoginSlug } from "./db";
import { appRouter } from "./routers";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("subject portal accounts", () => {
  it("creates stable, normalized login slugs and passwords", () => {
    expect(subjectLoginSlug("English Language")).toBe("english-language");
    expect(subjectLoginSlug("Qur'an / Islamic Studies")).toBe("qur-an-islamic-studies");
    expect(subjectInitialPassword(7)).toBe("AFS-0007-SUBJECT");
  });

  it("uses compact subject usernames and random initial passwords", () => {
    expect(subjectAccountUsername(7)).toBe("AFS-7");
    const first = randomSubjectPassword();
    const second = randomSubjectPassword();
    expect(first).toMatch(/^[A-Z0-9]{10}$/);
    expect(second).toMatch(/^[A-Z0-9]{10}$/);
    expect(first).not.toBe(second);
  });

  it("exposes subject account provisioning only to administrators", () => {
    const source = appRouter._def.procedures;
    expect(source).toHaveProperty("school.subjectAccounts");
    expect(source).toHaveProperty("school.syncSubjectAccounts");
  });

  it("exposes class assignment and administrator reset procedures", () => {
    const source = appRouter._def.procedures;
    expect(source).toHaveProperty("school.subjectAccountAssignments");
    expect(source).toHaveProperty("school.setSubjectAccountClasses");
    expect(source).toHaveProperty("school.resetSubjectAccountPassword");
    expect(source).toHaveProperty("school.teacherWorkload");
    expect(source).toHaveProperty("school.teacherPendingResults");
    const schema = readFileSync(resolve(process.cwd(), "drizzle/schema.ts"), "utf8");
    expect(schema).toContain("subjectAccountClasses");
    expect(schema).toContain("subjectAccountClasses_subjectAccountId_classId_unique");
  });

  it("keeps the result save and submit procedures behind the existing subject assignment guard", () => {
    const source = appRouter._def.procedures;
    expect(source).toHaveProperty("school.saveResult");
    expect(source).toHaveProperty("school.submitResults");
  });

  it("supports subject-account linkage through the account junction", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    expect(source).toContain("subjectId: subjectAccounts.subjectId");
    expect(source).toContain("account[0]?.linkedSubjectId ?? account[0]?.subjectId");
  });

  it("supports section-filtered credential registers", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(source).toContain('"All" | "Nursery" | "Primary" | "Junior" | "Senior"');
    expect(source).toContain('option>Nursery</option>');
    expect(source).toContain('option>Primary</option>');
    expect(source).toContain('option>Junior</option>');
    expect(source).toContain('option>Senior</option>');
    expect(source).toContain('"Section"');
    expect(source).toContain('sectionMatchesClass(sectionFilter, sectionOf(item.classId))');
  });

  it("gives linked subject accounts a distinct subject-portal workspace", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(source).toContain("const isSubjectAccount = user?.role === \"teacher\" && Boolean(user.linkedSubjectId);");
    expect(source).toContain("Subject portal");
    expect(source).toContain("This secure workspace is limited to your linked subject and assigned classes.");
  });

  it("opens Staff result entry on an assigned section", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(source).toContain("const currentSectionAssigned = workloadQuery.data.some(item => sectionMatchesClass(reportSection, item.section));");
    expect(source).toContain("const firstAssignedSection = sections.find(section => workloadQuery.data.some(item => sectionMatchesClass(section, item.section))); ");
    expect(source).toContain("if (firstAssignedSection) { setReportSection(firstAssignedSection); setClassName(\"\"); setSubject(\"\"); }");
  });

  it("exposes administrator rollback and graduation workflows", () => {
    const routerSource = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
    const dbSource = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const schema = readFileSync(resolve(process.cwd(), "drizzle/schema.ts"), "utf8");
    const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    const cssSource = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
    expect(routerSource).toContain("rollbackStudentPromotion: adminProcedure");
    expect(routerSource).toContain("graduateStudents: adminProcedure");
    expect(routerSource).toContain("alumni: adminProcedure");
    expect(dbSource).toContain("This promotion cannot be rolled back");
    expect(dbSource).toContain("graduateStudents");
    expect(schema).toContain("rolledBackAt");
    expect(schema).toContain("export const alumni");
    expect(homeSource).toContain("Rollback");
    expect(homeSource).toContain("Graduate final-year students");
    expect(cssSource).toContain("@page { size: A4 portrait; margin: 8mm; }");
  });

  it("exposes administrator student promotion with an auditable history", () => {
    const routerSource = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
    const dbSource = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const schema = readFileSync(resolve(process.cwd(), "drizzle/schema.ts"), "utf8");
    const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(routerSource).toContain("studentPromotionHistory: adminProcedure");
    expect(routerSource).toContain("promoteStudents: adminProcedure");
    expect(schema).toContain("studentPromotions");
    expect(dbSource).toContain("Some selected students are no longer in the source class");
    expect(dbSource).toContain("studentPromotions");
    expect(homeSource).toContain("Promote or migrate students");
    expect(homeSource).toContain("Move active students between live classes");
    expect(homeSource).toContain("promotionHistoryQuery");
    expect(homeSource).toContain("previewOpen && className && subject");
    expect(homeSource).toContain("const reportStudents = previewOpen ?");
  });

  it("supports persisted term dates in settings and result sheets", () => {
    const routerSource = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
    const schema = readFileSync(resolve(process.cwd(), "drizzle/schema.ts"), "utf8");
    const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(schema).toContain("termEndingDate");
    expect(schema).toContain("nextTermBeginningDate");
    expect(routerSource).toContain("updateAcademicTermDates");
    expect(routerSource).toContain("Next term beginning must be on or after the term ending date");
    expect(homeSource).toContain("Term ends");
    expect(homeSource).toContain("Next term begins");
    expect(homeSource).toContain("formatReportDate");
  });
});
