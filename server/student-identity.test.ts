import { describe, expect, it } from "vitest";
import { formatStudentAdmissionNumber, getStudentSectionPrefix, INITIAL_STUDENT_PASSWORD, isStudentAdmissionNumber } from "@shared/studentIdentity";

describe("student identity rules", () => {
  it("maps every supported academic section to the requested prefix", () => {
    expect(getStudentSectionPrefix("NURSERY 1A")).toBe("NUR");
    expect(getStudentSectionPrefix("PRIMARY 4B")).toBe("PRI");
    expect(getStudentSectionPrefix("JSS 2A")).toBe("JSS");
    expect(getStudentSectionPrefix("SSS 3B")).toBe("SSS");
  });

  it("formats and validates section-coded admission numbers", () => {
    const admissionNumber = formatStudentAdmissionNumber("JSS 2A", 123);
    expect(admissionNumber).toBe("2026/AFSAL/JSS/123");
    expect(isStudentAdmissionNumber(admissionNumber)).toBe(true);
    expect(isStudentAdmissionNumber("2026/AFSAL/123456")).toBe(false);
    expect(formatStudentAdmissionNumber("NURSERY 1A", 1)).toBe("2026/AFSAL/NUR/001");
  });

  it("rejects unsupported classes and out-of-range sequences", () => {
    expect(() => getStudentSectionPrefix("Unknown class")).toThrow();
    expect(() => formatStudentAdmissionNumber("NURSERY 1A", 0)).toThrow();
    expect(() => formatStudentAdmissionNumber("NURSERY 1A", 1000)).toThrow();
  });

  it("uses the requested initial password", () => {
    expect(INITIAL_STUDENT_PASSWORD).toBe("12345");
  });
});
