import { describe, expect, it } from "vitest";
import { buildPrintableDirectoryHtml, buildStaffCsv, buildStudentCaCsv, buildStudentCredentialCsv, buildStudentCsv } from "../shared/directoryExport";
import { buildStaffRelatedRecords } from "./db";

describe("directory exports", () => {
  it("exports student and staff rows with serial numbers and escaped values", () => {
    expect(buildStudentCsv([{ name: "Aisha, Bello", admissionNo: "ASA/1", className: "JSS 2A", studentPhone: "0801", parentPhone: "0802", status: "active" }])).toContain('1,"Aisha, Bello","ASA/1","JSS 2A"');
    expect(buildStaffCsv([{ name: "Dr. Musa", staffRole: "Teacher", department: "Science", phone: "0803", email: "musa@example.com", status: "active" }])).toContain('1,"Dr. Musa","Teacher","Science"');
  });

  it("exports student login credentials with admission-number usernames and the initial password", () => {
    const csv = buildStudentCredentialCsv([{ name: 'Aisha, "Bello"', className: "PRIMARY 1A", admissionNo: "2026/Afsal/PRI/123456" }], "12345");
    expect(csv.split("\n")[0]).toBe("Serial,Student Name,Class,Admission Number,Login Username,Initial Password");
    expect(csv).toContain('1,"Aisha, ""Bello""","PRIMARY 1A","2026/Afsal/PRI/123456","2026/Afsal/PRI/123456","12345"');
  });

  it("builds printable output for the filtered directory and escapes cells", () => {
    const html = buildPrintableDirectoryHtml("Filtered students", ["Name", "Class"], [["Aisha <Bello>", "SSS 2A"]]);
    expect(html).toContain("Filtered students");
    expect(html).toContain("Aisha &lt;Bello&gt;");
    expect(html).toContain("window.print");
  });

  it("formats persistent staff profile related records", () => {
    expect(buildStaffRelatedRecords({ staffRole: "Teacher", department: "Science", phone: "08000000000", email: "teacher@example.com", status: "active" })).toEqual([
      { label: "Role", detail: "Teacher" },
      { label: "Department", detail: "Science" },
      { label: "Phone", detail: "08000000000" },
      { label: "Email", detail: "teacher@example.com" },
      { label: "Employment status", detail: "active" },
    ]);
  });

  it("sorts the CA sheet alphabetically and preserves assessment columns", () => {
    const csv = buildStudentCaCsv([
      { student: { name: "Zainab Yusuf" }, firstCa: 8, secondCa: 9, thirdCa: 10, exam: 55 },
      { student: { name: "Aisha Bello" }, firstCa: 10, secondCa: 10, thirdCa: 9, exam: 60 },
    ]);
    expect(csv.split("\n")[1]).toContain('1,"Aisha Bello",10,10,9,60');
    expect(csv.split("\n")[2]).toContain('2,"Zainab Yusuf",8,9,10,55');
  });
});
