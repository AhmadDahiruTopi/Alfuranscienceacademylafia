export const INITIAL_STUDENT_PASSWORD = "12345";

export type StudentSection = "NUR" | "PRI" | "JSS" | "SSS";

export function getStudentSectionPrefix(sectionOrClass: string): StudentSection {
  const value = sectionOrClass.trim().toUpperCase();
  if (value.includes("NUR")) return "NUR";
  if (value.includes("PRI")) return "PRI";
  if (value.includes("JSS") || value.includes("JUNIOR")) return "JSS";
  if (value.includes("SSS") || value.includes("SENIOR")) return "SSS";
  throw new Error("A student class must belong to Nursery, Primary, JSS, or SSS");
}

export function formatStudentAdmissionNumber(sectionOrClass: string, sequence: number): string {
  const number = Math.trunc(sequence);
  if (!Number.isInteger(number) || number < 1 || number > 999) {
    throw new Error("Admission number sequence must be between 001 and 999");
  }
  return `2026/AFSAL/${getStudentSectionPrefix(sectionOrClass)}/${String(number).padStart(3, "0")}`;
}

export function isStudentAdmissionNumber(value: string): boolean {
  return /^2026\/AFSAL\/(NUR|PRI|JSS|SSS)\/\d{3}$/.test(value.trim());
}
