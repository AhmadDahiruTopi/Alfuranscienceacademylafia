import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const guestContext: TrpcContext = { user: undefined, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] };

describe("school result persistence procedures", () => {
  it("requires authentication to save scores", async () => {
    const caller = appRouter.createCaller(guestContext);
    await expect(caller.school.saveResult({ studentId: 1, session: "2024 / 2025", term: "First Term", className: "SSS 2A", subject: "Mathematics", caScore: 30, examScore: 55 })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("rejects scores outside CA and examination limits before database access", async () => {
    const caller = appRouter.createCaller({ ...guestContext, user: { id: 7, openId: "teacher", name: "Teacher", email: "teacher@example.com", loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() } });
    await expect(caller.school.saveResult({ studentId: 1, session: "2024 / 2025", term: "First Term", className: "SSS 2A", subject: "Mathematics", caScore: 41, examScore: 55 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.school.submitResults({ session: "", term: "First Term", className: "SSS 2A", subject: "Mathematics" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
