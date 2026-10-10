export type RoleLandingView = "Overview" | "Results" | "Fees" | "ReportCards";

export const roleLanding: Record<string, RoleLandingView> = {
  admin: "Overview",
  principal: "Results",
  teacher: "Results",
  accountant: "Fees",
  parent: "ReportCards",
  student: "Overview",
  user: "Results",
};

export function getRoleLanding(role: string | null | undefined): RoleLandingView {
  return roleLanding[role ?? ""] ?? "Overview";
}

export const roleLabels: Record<string, string> = {
  admin: "Administrator",
  principal: "Principal",
  teacher: "Teacher",
  accountant: "Accountant",
  parent: "Parent",
  student: "Student",
  user: "Teacher",
};

export function getRoleLabel(role: string | null | undefined): string {
  return roleLabels[role ?? ""] ?? "Teacher";
}
