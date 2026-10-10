import { describe, expect, it, vi } from "vitest";

const storageMocks = vi.hoisted(() => ({ storagePut: vi.fn(async () => ({ key: "academy-gallery/1/lab.jpg", url: "/manus-storage/academy-gallery/1/lab.jpg" })) }));
const dbMocks = vi.hoisted(() => ({
  createPayment: vi.fn(async (input: unknown) => input),
  createStaffAccount: vi.fn(async (input: unknown) => ({ id: 21, ...(input as object), passwordHash: undefined })),
  getUserByUsername: vi.fn(async () => undefined),
  updateResultStatus: vi.fn(async (input: unknown, status: unknown) => ({ updated: 2, status })),
  listStaffAccounts: vi.fn(async () => [{ id: 21, name: "New Staff", username: "new.staff", phone: "08030000000", role: "teacher", accountStatus: "active" }]),
  updateStaffAccount: vi.fn(async (id: number, input: unknown) => ({ id, ...(input as object), accountStatus: "active" })),
  setStaffAccountStatus: vi.fn(async (id: number, accountStatus: string) => ({ id, accountStatus })),
  createStaff: vi.fn(async (input: unknown) => input),
  createStudent: vi.fn(async (input: unknown) => input),
  updateStudent: vi.fn(async (id: number, input: unknown) => ({ id, ...(input as object) })),
  deleteStudent: vi.fn(async (id: number) => ({ id, deleted: true as const })),
  updateStaff: vi.fn(async (id: number, input: unknown) => ({ id, ...(input as object) })),
  deleteStaff: vi.fn(async (id: number) => ({ id, deleted: true as const })),
  bulkCreateStudents: vi.fn(async (input: unknown[]) => input),
  bulkCreateStaff: vi.fn(async (input: unknown[]) => input),
  listPayments: vi.fn(async () => []),
  updatePaymentStatus: vi.fn(async (id: number, status: string, verifiedBy: number) => ({ id, status, verifiedBy })),
  listInvoices: vi.fn(async () => []),
  createInvoice: vi.fn(async (input: unknown) => ({ id: 71, ...(input as object), status: "unpaid" })),
  listResults: vi.fn(async () => []),
  pageStudents: vi.fn(async (input: unknown) => ({ rows: [], total: 0, page: (input as { page: number }).page, pageSize: (input as { pageSize: number }).pageSize, totalPages: 0 })),
  pageStaff: vi.fn(async (input: unknown) => ({ rows: [], total: 0, page: (input as { page: number }).page, pageSize: (input as { pageSize: number }).pageSize, totalPages: 0 })),
  getStudentProfile: vi.fn(async () => null),
  listStudentExamCards: vi.fn(async () => []),
  bulkIssueExamCards: vi.fn(async (input: unknown) => ({ classes: input && typeof input === "object" && Boolean((input as { section?: string }).section) ? 6 : 1, students: 3, created: 3, updated: 0, classesWithoutSubjects: [], cardIds: [101, 102, 103] })),
  getAssignment: vi.fn(async () => ({ id: 41, className: "JSS 2A" })),
  getStaffProfile: vi.fn(async () => null),
  listGalleryImages: vi.fn(async () => [{ id: 1, title: "Science Lab", imageUrl: "/manus-storage/lab.jpg", storageKey: "lab.jpg" }]),
  listPublicAnnouncements: vi.fn(async () => [{ id: 1, title: "Open day", summary: "Visit our academy.", status: "published" }]),
  createPublicAnnouncement: vi.fn(async (input: unknown) => ({ id: 2, ...(input as object) })),
  createGalleryImage: vi.fn(async (input: unknown) => ({ id: 2, ...(input as object) })),
  listStaff: vi.fn(async () => []),
  listStudents: vi.fn(async (filters?: { className?: string; search?: string }) => filters?.className === "JSS 2A" && !filters.search ? [{ id: 7, name: "Aisha Mohammed", className: "JSS 2A" }] : []),
  listAttendance: vi.fn(async () => []),
  createAttendance: vi.fn(async (input: unknown) => input),
  submitResults: vi.fn(async () => ({ submitted: 1, status: "submitted" as const })),
  upsertResult: vi.fn(async (input: unknown) => input),
  createAssignment: vi.fn(async (input: unknown) => ({ id: 41, ...(input as object) })),
  listAssignments: vi.fn(async () => []),
  listAssignmentSubmissions: vi.fn(async () => []),
  listOwnedAssignmentSubmissions: vi.fn(async () => []),
  gradeAssignmentSubmission: vi.fn(async (id: number, input: unknown) => ({ id, ...(input as object), status: "graded" })),
  gradeOwnedAssignmentSubmission: vi.fn(async (id: number, _teacherId: number, input: unknown) => ({ id, ...(input as object), status: "graded" })),
  createAssignmentSubmission: vi.fn(async (input: unknown) => ({ id: 51, ...(input as object) })),
  updateCurrentUserProfile: vi.fn(async (_id: number, input: unknown) => ({ id: 9, ...(input as object), role: "teacher" })),
  updateCurrentUserPassword: vi.fn(async () => ({ success: true as const })),
  resetStudentPassword: vi.fn(async (studentId: number) => ({ success: true as const, username: "2026/AFSAL/NUR/001", initialPassword: "12345", mustChangePassword: true as const, studentId })),
  getUserById: vi.fn(async () => ({ id: 9, passwordHash: hashPassword("currentpass123"), role: "teacher", loginMethod: "local" })),
}));
vi.mock("./db", () => dbMocks);
vi.mock("./storage", () => storageMocks);

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { hashPassword } from "./localAuth";
import { getRoleLanding } from "@shared/roleRouting";

const user = { id: 9, openId: "workflow-user", name: "Workflow User", email: "workflow@example.com", loginMethod: "manus", role: "user" as const, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() };
const ctx: TrpcContext = { user, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] };
const adminCtx: TrpcContext = { ...ctx, user: { ...user, role: "admin" as const } };
const loginCtx: TrpcContext = { user: null, req: { protocol: "https", headers: {} } as TrpcContext["req"], res: { cookie: vi.fn() } as unknown as TrpcContext["res"] };

describe("finance verification workflows", () => {
  it("creates invoices for finance roles and lists invoice records", async () => {
    const accountant = appRouter.createCaller({ ...ctx, user: { ...user, role: "accountant" as const } });
    await expect(accountant.school.createInvoice({ studentId: 7, title: "First term tuition", session: "2024 / 2025", term: "First Term", amountKobo: 18500000 })).resolves.toMatchObject({ id: 71, status: "unpaid", createdBy: 9 });
    await expect(accountant.school.invoices()).resolves.toEqual([]);
    expect(dbMocks.createInvoice).toHaveBeenCalledWith(expect.objectContaining({ studentId: 7, createdBy: 9 }));
  });
  it("allows accountants to verify bank transfers and blocks parents", async () => {
    const accountant = appRouter.createCaller({ ...ctx, user: { ...user, role: "accountant" as const } });
    await expect(accountant.school.verifyBankTransfer({ id: 12, status: "verified" })).resolves.toMatchObject({ id: 12, status: "verified", verifiedBy: 9 });
    expect(dbMocks.updatePaymentStatus).toHaveBeenCalledWith(12, "verified", 9);
    const parent = appRouter.createCaller({ ...ctx, user: { ...user, role: "parent" as const } });
    await expect(parent.school.verifyBankTransfer({ id: 12, status: "verified" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("attendance workflows", () => {
  it("returns only the selected class roster", async () => {
    const teacher = appRouter.createCaller({ ...ctx, user: { ...user, role: "teacher" as const } });
    await expect(teacher.school.students({ className: "JSS 2A" })).resolves.toEqual([{ id: 7, name: "Aisha Mohammed", className: "JSS 2A" }]);
    expect(dbMocks.listStudents).toHaveBeenCalledWith({ className: "JSS 2A" });
  });
  it("records a selected student status through the protected procedure", async () => {
    const teacher = appRouter.createCaller({ ...ctx, user: { ...user, role: "teacher" as const } });
    const attendanceDate = new Date("2026-08-22T12:00:00.000Z");
    await expect(teacher.school.recordAttendance({ studentId: 7, attendanceDate, status: "absent" })).resolves.toMatchObject({ studentId: 7, recordedBy: 9, status: "absent" });
    expect(dbMocks.createAttendance).toHaveBeenCalledWith(expect.objectContaining({ studentId: 7, recordedBy: 9, status: "absent" }));
  });
});

describe("assignment and profile workflows", () => {
  it("isolates family records to the linked student", async () => {
    const parent = appRouter.createCaller({ ...ctx, user: { ...user, role: "parent" as const, linkedStudentId: 7 } });
    await expect(parent.school.studentProfile({ id: 8 })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(parent.school.studentProfile({ id: 7 })).resolves.toBeNull();
    const unlinkedStudent = appRouter.createCaller({ ...ctx, user: { ...user, role: "student" as const, linkedStudentId: null } });
    await expect(unlinkedStudent.school.invoices()).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(unlinkedStudent.school.attendance()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects assignment submissions outside the linked student's class", async () => {
    dbMocks.getStudentProfile.mockResolvedValueOnce({ student: { id: 7, className: "SSS 1A" }, results: [], payments: [], attendance: [] } as never);
    const student = appRouter.createCaller({ ...ctx, user: { ...user, role: "student" as const, linkedStudentId: 7 } });
    await expect(student.school.submitAssignment({ assignmentId: 41, submissionText: "My submission" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(dbMocks.createAssignmentSubmission).not.toHaveBeenCalled();
  });

  it("allows teachers to create assignments and grade their own submissions", async () => {
    const teacherCtx = { ...ctx, user: { ...user, role: "teacher" as const } };
    const caller = appRouter.createCaller(teacherCtx);
    await expect(caller.school.createAssignment({ title: "Energy project", className: "JSS 2A", subject: "Science", instructions: "Complete the practical worksheet.", dueDate: "2026-09-01", totalMarks: 100 })).resolves.toMatchObject({ id: 41 });
    await expect(caller.school.assignmentSubmissions({ assignmentId: 41 })).resolves.toEqual([]);
    await expect(caller.school.gradeAssignmentSubmission({ id: 51, score: 84, feedback: "Good work" })).resolves.toMatchObject({ status: "graded" });
  });
  it("rejects non-teachers from creating assignments", async () => {
    const caller = appRouter.createCaller({ ...ctx, user: { ...user, role: "parent" as const } });
    await expect(caller.school.createAssignment({ title: "Energy project", className: "JSS 2A", subject: "Science", instructions: "Complete the practical worksheet.", dueDate: "2026-09-01", totalMarks: 100 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
  it("updates profiles without exposing password hashes and changes local passwords", async () => {
    const caller = appRouter.createCaller({ ...ctx, user: { ...user, role: "teacher" as const } });
    await expect(caller.auth.updateProfile({ name: "Updated Teacher", phone: "08030000000" })).resolves.not.toHaveProperty("passwordHash");
    await expect(caller.auth.changePassword({ currentPassword: "currentpass123", newPassword: "newpass1234" })).resolves.toEqual({ success: true });
  });
});

describe("examination-card bulk issuance", () => {
  it("allows administrators to issue cards by class or section", async () => {
    const caller = appRouter.createCaller(adminCtx);
    const base = { session: "2026 / 2027", term: "First Term", examinationTitle: "First Term Examination", examinationDate: "2026-10-15", venue: "Main hall" };
    await expect(caller.school.bulkIssueExamCards({ ...base, className: "JSS 1A" })).resolves.toMatchObject({ classes: 1, students: 3, created: 3 });
    await expect(caller.school.bulkIssueExamCards({ ...base, section: "Junior" })).resolves.toMatchObject({ classes: 6, students: 3, created: 3 });
    expect(dbMocks.bulkIssueExamCards).toHaveBeenCalledWith(expect.objectContaining({ className: "JSS 1A" }));
    expect(dbMocks.bulkIssueExamCards).toHaveBeenCalledWith(expect.objectContaining({ section: "Junior" }));
  });

  it("rejects an empty bulk issuance scope and non-administrator access", async () => {
    const caller = appRouter.createCaller(adminCtx);
    await expect(caller.school.bulkIssueExamCards({ session: "2026 / 2027", term: "First Term", examinationTitle: "First Term Examination", venue: "" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(appRouter.createCaller(ctx).school.bulkIssueExamCards({ session: "2026 / 2027", term: "First Term", examinationTitle: "First Term Examination", className: "JSS 1A", venue: "" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});


describe("school workflow procedures", () => {
  it("rejects invalid staff account and login inputs", async () => {
    await expect(appRouter.createCaller(adminCtx).school.createStaffAccount({ name: "A", phone: "1", username: "bad space", password: "short" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(appRouter.createCaller(loginCtx).auth.staffLogin({ username: "ab", password: "short" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects a wrong staff password", async () => {
    dbMocks.getUserByUsername.mockResolvedValueOnce({ id: 32, openId: "local:staff:teacher.two", name: "Teacher Two", username: "teacher.two", passwordHash: hashPassword("securepass123"), role: "user", loginMethod: "local" } as never);
    await expect(appRouter.createCaller(loginCtx).auth.staffLogin({ username: "teacher.two", password: "wrongpass123" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("authenticates a staff username and password and sets a session cookie", async () => {
    dbMocks.getUserByUsername.mockResolvedValueOnce({ id: 31, openId: "local:staff:teacher.one", name: "Teacher One", username: "teacher.one", passwordHash: hashPassword("securepass123"), role: "user", loginMethod: "local" } as never);
    const result = await appRouter.createCaller(loginCtx).auth.staffLogin({ username: "Teacher.One", password: "securepass123" });
    expect(result).toMatchObject({ success: true, user: { username: "teacher.one" } });
    expect(loginCtx.res.cookie).toHaveBeenCalled();
  });
  it("uses a longer session lifetime only when remember-me is selected", async () => {
    dbMocks.getUserByUsername.mockResolvedValueOnce({ id: 33, openId: "local:staff:remember", name: "Remembered Admin", username: "remember", passwordHash: hashPassword("securepass123"), role: "admin", loginMethod: "local" } as never);
    const rememberedCookie = vi.fn();
    const rememberedContext = { ...loginCtx, res: { cookie: rememberedCookie } as unknown as TrpcContext["res"] };
    await appRouter.createCaller(rememberedContext).auth.staffLogin({ username: "remember", password: "securepass123", rememberMe: true });
    expect(rememberedCookie.mock.calls[0]?.[2]).toMatchObject({ maxAge: 1000 * 60 * 60 * 24 * 30 });
  });

  it("authenticates every supported portal role for role-based routing", async () => {
    const cases = [["admin", "admin.one", "Overview"], ["accountant", "accounts.one", "Fees"], ["teacher", "teacher.one", "Results"], ["parent", "parent.one", "ReportCards"], ["student", "student.one", "Overview"]] as const;
    for (const [role, username, landing] of cases) {
      dbMocks.getUserByUsername.mockImplementationOnce(async () => ({ id: 31, openId: `local:${username}`, name: username, username, role, accountStatus: "active", passwordHash: hashPassword("securepass123") } as never));
      const loginContext = { ...loginCtx, res: { cookie: vi.fn() } as unknown as TrpcContext["res"] };
      const result = await appRouter.createCaller(loginContext).auth.staffLogin({ username, password: "securepass123" });
      expect(result).toMatchObject({ success: true, user: { role } });
      expect(getRoleLanding(role)).toBe(landing);
      expect(loginContext.res.cookie).toHaveBeenCalled();
    }
  });
  it("allows principal result lifecycle actions and denies teacher approval", async () => {
    const principalCtx = { ...ctx, user: { ...user, role: "principal" as const } };
    const teacherCtx = { ...ctx, user: { ...user, role: "teacher" as const } };
    await expect(appRouter.createCaller(principalCtx).school.updateResultStatus({ session: "2024 / 2025", term: "First Term", className: "JSS 2A", subject: "Mathematics", status: "approved" })).resolves.toMatchObject({ updated: 2, status: "approved" });
    await expect(appRouter.createCaller(teacherCtx).school.updateResultStatus({ session: "2024 / 2025", term: "First Term", className: "JSS 2A", subject: "Mathematics", status: "approved" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("enforces academic role access on result procedures", async () => {
    const teacherCtx = { ...ctx, user: { ...user, role: "teacher" as const } };
    const parentCtx = { ...ctx, user: { ...user, role: "parent" as const } };
    await expect(appRouter.createCaller(teacherCtx).school.results({ session: "2024 / 2025", term: "First Term", className: "JSS 2A", subject: "Mathematics" })).resolves.toEqual([]);
    await expect(appRouter.createCaller(parentCtx).school.results({ session: "2024 / 2025", term: "First Term", className: "JSS 2A", subject: "Mathematics" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows administrators to manage staff accounts and blocks other roles", async () => {
    const adminCaller = appRouter.createCaller(adminCtx);
    await expect(adminCaller.school.staffAccounts()).resolves.toHaveLength(1);
    await expect(adminCaller.school.updateStaffAccount({ id: 21, name: "Updated Staff", phone: "08030000001", username: "updated.staff", role: "principal" })).resolves.toMatchObject({ role: "principal" });
    await expect(adminCaller.school.setStaffAccountStatus({ id: 21, accountStatus: "inactive" })).resolves.toMatchObject({ accountStatus: "inactive" });
    await expect(appRouter.createCaller(ctx).school.staffAccounts()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("persists an administrator gallery upload", async () => {
    await expect(appRouter.createCaller(adminCtx).school.uploadGalleryImage({ title: "Science Lab", caption: "Learning in the lab", fileName: "lab.jpg", contentType: "image/jpeg", dataBase64: "a".repeat(120) })).resolves.toMatchObject({ imageUrl: "/manus-storage/academy-gallery/1/lab.jpg", title: "Science Lab" });
    expect(dbMocks.createGalleryImage).toHaveBeenCalledWith(expect.objectContaining({ title: "Science Lab", storageKey: "academy-gallery/1/lab.jpg" }));
  });

  it("returns public gallery and announcement records", async () => {
    await expect(appRouter.createCaller(loginCtx).school.gallery()).resolves.toHaveLength(1);
    await expect(appRouter.createCaller(loginCtx).school.announcements()).resolves.toMatchObject([{ title: "Open day" }]);
    await expect(appRouter.createCaller(adminCtx).school.createAnnouncement({ title: "Open day", summary: "Visit our academy." })).resolves.toMatchObject({ title: "Open day" });
  });

  it("persists a linked student on an administrator account update", async () => {
    await appRouter.createCaller(adminCtx).school.updateStaffAccount({ id: 21, name: "Parent User", phone: "08030000000", username: "parent.user", role: "parent", linkedStudentId: 7 });
    expect(dbMocks.updateStaffAccount).toHaveBeenCalledWith(21, expect.objectContaining({ linkedStudentId: 7 }));
  });

  it("allows administrators to reset a student password and blocks other roles", async () => {
    await expect(appRouter.createCaller(adminCtx).school.resetStudentPassword({ studentId: 7 })).resolves.toMatchObject({ username: "2026/AFSAL/NUR/001", initialPassword: "12345", mustChangePassword: true });
    expect(dbMocks.resetStudentPassword).toHaveBeenCalledWith(7);
    await expect(appRouter.createCaller({ ...ctx, user: { ...ctx.user, role: "teacher" as const } }).school.resetStudentPassword({ studentId: 7 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("blocks student record access while the default password must be changed", async () => {
    dbMocks.getStudentProfile.mockClear();
    const lockedStudent = appRouter.createCaller({ ...ctx, user: { ...ctx.user, role: "student" as const, linkedStudentId: 7, mustChangePassword: true } });
    await expect(lockedStudent.school.myStudentProfile()).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(dbMocks.getStudentProfile).not.toHaveBeenCalled();
  });

  it("returns the linked student profile through the protected procedure", async () => {
    dbMocks.getStudentProfile.mockResolvedValueOnce({ student: { id: 7, name: "Aisha Mohammed" }, results: [], payments: [] } as never);
    const linkedCtx = { ...ctx, user: { ...ctx.user, role: "parent" as const, linkedStudentId: 7 } };
    await expect(appRouter.createCaller(linkedCtx).school.myStudentProfile()).resolves.toMatchObject({ student: { id: 7 } });
    expect(dbMocks.getStudentProfile).toHaveBeenCalledWith(7, { publishedResultsOnly: true });
  });

  it("returns only the linked student’s non-hidden examination cards", async () => {
    dbMocks.listStudentExamCards.mockResolvedValueOnce([{ card: { id: 41, visibilityStatus: "pending" }, student: { id: 7 } }] as never);
    const studentCtx = { ...ctx, user: { ...ctx.user, role: "student" as const, linkedStudentId: 7 } };
    await expect(appRouter.createCaller(studentCtx).school.studentExamCards()).resolves.toMatchObject([{ card: { id: 41, visibilityStatus: "pending" } }]);
    expect(dbMocks.listStudentExamCards).toHaveBeenCalledWith(7);
  });

  it("covers every role landing destination", () => {
    expect(getRoleLanding("teacher")).toBe("Results");
    expect(getRoleLanding("accountant")).toBe("Fees");
    expect(getRoleLanding("parent")).toBe("ReportCards");
    expect(getRoleLanding("student")).toBe("Overview");
  });

  it("deactivates an account before rejecting its login", async () => {
    const account = { id: 21, openId: "local:staff:inactive", name: "Inactive Staff", username: "inactive", role: "teacher", accountStatus: "active", passwordHash: hashPassword("securepass123") };
    dbMocks.setStaffAccountStatus.mockImplementationOnce(async (_id: number, accountStatus: string) => { account.accountStatus = accountStatus; return account; });
    dbMocks.getUserByUsername.mockImplementationOnce(async () => account as never);
    await expect(appRouter.createCaller(adminCtx).school.setStaffAccountStatus({ id: 21, accountStatus: "inactive" })).resolves.toMatchObject({ accountStatus: "inactive" });
    await expect(appRouter.createCaller({ ...ctx, res: { ...ctx.res, cookie: vi.fn() } }).auth.staffLogin({ username: "inactive", password: "securepass123" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects login for a deactivated staff account", async () => {
    dbMocks.getUserByUsername.mockResolvedValueOnce({ id: 21, openId: "local:staff:inactive", name: "Inactive Staff", username: "inactive", role: "teacher", accountStatus: "inactive", passwordHash: "unused" } as never);
    await expect(appRouter.createCaller({ ...ctx, res: { ...ctx.res, cookie: vi.fn() } }).auth.staffLogin({ username: "inactive", password: "securepass123" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows only administrators to create a staff login", async () => {
    const account = await appRouter.createCaller(adminCtx).school.createStaffAccount({ name: "New Staff", phone: "08030000000", username: "new.staff", password: "securepass123" });
    expect(account).toMatchObject({ id: 21, name: "New Staff", username: "new.staff" });
    await expect(appRouter.createCaller(ctx).school.createStaffAccount({ name: "Blocked Staff", phone: "08030000000", username: "blocked.staff", password: "securepass123" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("returns staff profile related records through the protected procedure", async () => {
    dbMocks.getStaffProfile.mockResolvedValueOnce({ staff: { id: 4, name: "Dr. Musa", staffNo: "STF-4" }, relatedRecords: [{ label: "Department", detail: "Science" }] } as never);
    const profile = await appRouter.createCaller(ctx).school.staffProfile({ id: 4 });
    expect(profile).toMatchObject({ relatedRecords: [{ label: "Department", detail: "Science" }] });
  });

  it("persists a valid result draft and submits its context", async () => {
    const caller = appRouter.createCaller(ctx);
    const saved = await caller.school.saveResult({ studentId: 1, session: "2024 / 2025", term: "First Term", className: "SSS 2A", subject: "Mathematics", firstCa: 10, secondCa: 10, thirdCa: 10, caScore: 30, examScore: 54 });
    expect(saved).toMatchObject({ studentId: 1, caScore: 30, examScore: 54, status: "draft", submittedBy: 9 });
    const submitted = await caller.school.submitResults({ session: "2024 / 2025", term: "First Term", className: "SSS 2A", subject: "Mathematics" });
    expect(submitted).toEqual({ submitted: 1, status: "submitted" });
  });

  it("enforces student creation and validates payment inputs", async () => {
    const adminCaller = appRouter.createCaller(adminCtx);
    await adminCaller.school.createStudent({ admissionNo: "ASA/2025/9001", name: "New Learner", className: "JSS 2A", parentPhone: "08030000000", status: "active" });
    expect(dbMocks.createStudent).toHaveBeenCalled();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.school.createPayment({ studentId: 1, reference: "bad", method: "paystack", amountKobo: 1000 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("protects payment access for unauthenticated users", async () => {
    const caller = appRouter.createCaller({ user: undefined, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] });
    await expect(caller.school.payments()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller.school.createPayment({ studentId: 1, reference: "PAYSTACK-1234", method: "paystack", amountKobo: 1000 })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});


describe("remaining school procedure boundaries", () => {
  it("rejects invalid student creation input before the database call", async () => {
    const caller = appRouter.createCaller(adminCtx);
    await expect(caller.school.createStudent({ admissionNo: "x", name: "", className: "", status: "active" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("requires authentication to submit results", async () => {
    const caller = appRouter.createCaller({ user: undefined, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] });
    await expect(caller.school.submitResults({ session: "2024 / 2025", term: "First Term", className: "SSS 2A", subject: "Mathematics" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});


describe("staff intake procedure boundaries", () => {
  it("rejects invalid staff input before persistence", async () => {
    const caller = appRouter.createCaller(adminCtx);
    await expect(caller.school.createStaff({ staffNo: "x", name: "", staffRole: "", department: "", phone: "", email: "bad" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("requires authentication to list staff", async () => {
    const caller = appRouter.createCaller({ user: undefined, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] });
    await expect(caller.school.staff()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});


describe("staff persistence authorization", () => {
  it("allows an administrator to create a staff record through the persistence layer", async () => {
    const caller = appRouter.createCaller(adminCtx);
    const created = await caller.school.createStaff({ staffNo: "ASA-STAFF-9001", name: "New Teacher", staffRole: "Teacher", department: "Academics", phone: "08030000000", email: "teacher@example.com", status: "active" });
    expect(dbMocks.createStaff).toHaveBeenCalledWith(expect.objectContaining({ staffNo: "ASA-STAFF-9001", name: "New Teacher" }));
    expect(created).toMatchObject({ staffNo: "ASA-STAFF-9001", name: "New Teacher" });
  });

  it("forbids an ordinary user from creating a staff record", async () => {
    const caller = appRouter.createCaller(ctx);
    await expect(caller.school.createStaff({ staffNo: "ASA-STAFF-9002", name: "Blocked Teacher", staffRole: "Teacher", department: "Academics", phone: "08030000000", email: "blocked@example.com", status: "active" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});


describe("directory CRUD and bulk import", () => {
  it("allows an administrator to edit, delete, and bulk import records", async () => {
    const caller = appRouter.createCaller(adminCtx);
    await expect(caller.school.updateStudent({ id: 1, data: { name: "Updated Learner", className: "JSS 2A", parentPhone: "08030000000", status: "active" } })).resolves.toMatchObject({ id: 1, name: "Updated Learner" });
    await expect(caller.school.deleteStudent({ id: 1 })).resolves.toEqual({ id: 1, deleted: true });
    await expect(caller.school.bulkImportStaff({ records: [{ staffNo: "ASA-STAFF-IMPORT-1", name: "Imported Teacher", staffRole: "Teacher", department: "Academics", phone: "08030000000", email: "imported@example.com", status: "active" }] })).resolves.toHaveLength(1);
    expect(dbMocks.updateStudent).toHaveBeenCalled();
    expect(dbMocks.deleteStudent).toHaveBeenCalled();
    expect(dbMocks.bulkCreateStaff).toHaveBeenCalled();
  });

  it("forbids ordinary users from editing or bulk importing records", async () => {
    const caller = appRouter.createCaller(ctx);
    await expect(caller.school.updateStaff({ id: 1, data: { name: "Blocked", staffRole: "Teacher", department: "Academics", phone: "08030000000", email: "blocked@example.com", status: "active" } })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller.school.bulkImportStudents({ records: [{ name: "Blocked Learner", className: "JSS 2A", parentPhone: "08030000000", status: "active" }] })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});


describe("directory filtering and validation", () => {
  it("accepts protected search and filter inputs", async () => {
    const caller = appRouter.createCaller(ctx);
    await expect(caller.school.students({ search: "Aisha", className: "JSS 2A" })).resolves.toEqual([]);
    await expect(caller.school.staff({ search: "Teacher", role: "Teacher" })).resolves.toEqual([]);
  });

  it("rejects malformed CRUD and bulk-import inputs", async () => {
    const caller = appRouter.createCaller(adminCtx);
    await expect(caller.school.updateStudent({ id: 0, data: { name: "x", className: "", parentPhone: "", status: "active" } })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.school.deleteStaff({ id: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.school.bulkImportStudents({ records: [] })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.school.bulkImportStaff({ records: [{ staffNo: "x", name: "", staffRole: "", department: "", phone: "", email: "bad", status: "active" }] })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});


describe("complete directory mutation coverage", () => {
  it("covers staff update/delete and student bulk-import success paths", async () => {
    const caller = appRouter.createCaller(adminCtx);
    await expect(caller.school.updateStaff({ id: 2, data: { name: "Updated Staff", staffRole: "Teacher", department: "Sciences", phone: "08030000001", email: "updated@example.com", status: "active" } })).resolves.toMatchObject({ id: 2, name: "Updated Staff" });
    await expect(caller.school.deleteStaff({ id: 2 })).resolves.toEqual({ id: 2, deleted: true });
    await expect(caller.school.bulkImportStudents({ records: [{ name: "Imported Learner", className: "Primary 5B", parentPhone: "08030000002", status: "active" }] })).resolves.toHaveLength(1);
    expect(dbMocks.updateStaff).toHaveBeenCalled();
    expect(dbMocks.deleteStaff).toHaveBeenCalled();
    expect(dbMocks.bulkCreateStudents).toHaveBeenCalled();
  });

  it("forbids ordinary users from all destructive or import directory mutations", async () => {
    const caller = appRouter.createCaller(ctx);
    await expect(caller.school.deleteStudent({ id: 1 })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller.school.deleteStaff({ id: 1 })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller.school.bulkImportStaff({ records: [{ staffNo: "ASA-STAFF-BLOCKED", name: "Blocked", staffRole: "Teacher", department: "Academics", phone: "08030000003", email: "blocked2@example.com", status: "active" }] })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller.school.createStudent({ name: "Blocked Learner", className: "JSS 2A", parentPhone: "08030000004", status: "active" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});


describe("student update authorization", () => {
  it("forbids ordinary users from updating student records", async () => {
    const caller = appRouter.createCaller(ctx);
    await expect(caller.school.updateStudent({ id: 1, data: { name: "Blocked Update", className: "JSS 2A", parentPhone: "08030000005", status: "active" } })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});


describe("directory pagination and profiles", () => {
  it("accepts paginated student and staff queries and profile requests", async () => {
    const caller = appRouter.createCaller(ctx);
    await expect(caller.school.studentsPage({ page: 2, pageSize: 25, search: "Aisha", className: "JSS 2A" })).resolves.toMatchObject({ page: 2, pageSize: 25 });
    await expect(caller.school.staffPage({ page: 1, pageSize: 10, search: "Teacher", role: "Teacher" })).resolves.toMatchObject({ page: 1, pageSize: 10 });
    await expect(caller.school.studentProfile({ id: 1 })).resolves.toBeNull();
    await expect(caller.school.staffProfile({ id: 1 })).resolves.toBeNull();
    expect(dbMocks.pageStudents).toHaveBeenCalled();
    expect(dbMocks.pageStaff).toHaveBeenCalled();
  });

  it("rejects invalid pagination and profile identifiers", async () => {
    const caller = appRouter.createCaller(ctx);
    await expect(caller.school.studentsPage({ page: 0, pageSize: 25 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.school.staffPage({ page: 1, pageSize: 101 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.school.studentProfile({ id: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.school.staffProfile({ id: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});


describe("student portal credentials", () => {
  it("authenticates a student with the admission number and five-digit starter password", async () => {
    dbMocks.getUserByUsername.mockResolvedValueOnce({ id: 81, openId: "local:student:30001", name: "Nursery Learner", username: "2026/Afsal/NUR/626190", passwordHash: hashPassword("12345"), role: "student", accountStatus: "active", loginMethod: "local" } as never);
    const studentLoginContext = { ...loginCtx, res: { cookie: vi.fn() } as unknown as TrpcContext["res"] };
    await expect(appRouter.createCaller(studentLoginContext).auth.staffLogin({ username: "2026/Afsal/NUR/626190", password: "12345" })).resolves.toMatchObject({ success: true, user: { role: "student", username: "2026/Afsal/NUR/626190" } });
  });

  it("allows a student to replace the starter password from profile settings", async () => {
    dbMocks.getUserById.mockResolvedValueOnce({ id: 81, passwordHash: hashPassword("12345"), role: "student", loginMethod: "local" } as never);
    const student = appRouter.createCaller({ ...ctx, user: { ...user, id: 81, role: "student" as const, linkedStudentId: 30001 } });
    await expect(student.auth.changePassword({ currentPassword: "12345", newPassword: "newstudentpass" })).resolves.toEqual({ success: true });
    expect(dbMocks.updateCurrentUserPassword).toHaveBeenCalledWith(81, expect.stringContaining("scrypt$"));
  });
});
