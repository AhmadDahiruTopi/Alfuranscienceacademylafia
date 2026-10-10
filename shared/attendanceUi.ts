export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export function buildAttendancePayloads(
  roster: Array<{ id: number }>,
  statuses: Record<number, AttendanceStatus>,
  attendanceDate: Date,
) {
  return roster.map(student => ({
    studentId: student.id,
    attendanceDate,
    status: statuses[student.id] ?? "present" as AttendanceStatus,
  }));
}
