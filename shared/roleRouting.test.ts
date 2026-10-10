import { describe, expect, it } from "vitest";
import { getRoleLabel, getRoleLanding } from "./roleRouting";

describe("role routing", () => {
  it.each([
    ["teacher", "Teacher", "Results"],
    ["principal", "Principal", "Results"],
    ["accountant", "Accountant", "Fees"],
    ["parent", "Parent", "ReportCards"],
    ["student", "Student", "ReportCards"],
    ["admin", "Administrator", "Overview"],
  ])("routes %s to its tailored workspace", (role, label, landing) => {
    expect(getRoleLabel(role)).toBe(label);
    expect(getRoleLanding(role)).toBe(landing);
  });
});
