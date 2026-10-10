import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { buildAttendancePayloads } from "../shared/attendanceUi";

describe("attendance roster workflow", () => {
  const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
  const routerSource = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");

  it("loads a class-scoped roster instead of a global capped list", () => {
    expect(homeSource).toContain('trpc.school.students.useQuery({ className }, { enabled: Boolean(className) })');
    expect(homeSource).toContain('<label>Class<select value={className}');
    expect(homeSource).not.toContain("const roster = (studentsQuery.data ?? []).slice(0, 50)");
  });

  it("builds one persistence payload for every selected student", () => {
    const date = new Date("2026-08-22T12:00:00.000Z");
    expect(buildAttendancePayloads([{ id: 7 }, { id: 8 }], { 7: "present", 8: "absent" }, date)).toEqual([
      { studentId: 7, attendanceDate: date, status: "present" },
      { studentId: 8, attendanceDate: date, status: "absent" },
    ]);
  });

  it("preserves one-action multi-student recording through the protected procedure", () => {
    expect(homeSource).toContain("Promise.all(buildAttendancePayloads(roster, statuses, date).map(payload => recordAttendance.mutateAsync(payload)))");
    expect(routerSource).toContain('recordAttendance: roleProcedure("admin", "principal", "teacher")');
    expect(routerSource).toContain('attendance: roleProcedure("admin", "principal", "teacher", "parent", "student", "user")');
  });
});
