import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("school authorization", () => {
  it("blocks a regular authenticated user from creating students", async () => {
    const ctx: TrpcContext = {
      user: { id: 2, openId: "teacher-user", name: "Teacher", email: "teacher@example.com", loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);
    await expect(caller.school.createStudent({ admissionNo: "ASA/TEST/001", name: "Test Student", className: "JSS 2A", status: "active" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
