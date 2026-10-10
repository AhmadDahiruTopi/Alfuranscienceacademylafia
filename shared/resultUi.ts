export type ResultFeedback = "idle" | "saved" | "submitted" | "error";

export type BoardSection = "early" | "secondary";

export function getBoardSection(className: string): BoardSection {
  const normalized = className.trim().toUpperCase();
  return normalized.startsWith("JSS") || normalized.startsWith("SSS") ? "secondary" : "early";
}

export function getScoreLimits(className: string) {
  return getBoardSection(className) === "secondary"
    ? { caEach: 10, exam: 70, total: 100, label: "Junior / Senior" }
    : { caEach: 20, exam: 40, total: 100, label: "Nursery / Primary" };
}

export function calculateResultRow(name: string, ca: number, exam: number) {
  const total = ca + exam;
  const grade = total >= 75 ? "A" : total >= 65 ? "B" : total >= 55 ? "C" : total >= 45 ? "D" : total >= 40 ? "E" : "F";
  return { name, ca, exam, total, average: total, grade };
}

export function resultFeedbackLabel(feedback: ResultFeedback) {
  return feedback === "saved" ? "Saved successfully" : feedback === "submitted" ? "Submitted for review" : feedback === "error" ? "Save failed" : "";
}
