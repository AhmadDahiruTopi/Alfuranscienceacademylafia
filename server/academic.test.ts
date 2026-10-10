import { describe, expect, it } from "vitest";
import { calculateResult, rankResults } from "../shared/academic";

describe("academic result calculations", () => {
  it("calculates total, average, and grade", () => {
    expect(calculateResult([80, 70, 75])).toEqual({ total: 225, average: 75, grade: "A" });
    expect(calculateResult([60, 58, 62])).toEqual({ total: 180, average: 60, grade: "C" });
  });

  it("supports score entry boundaries", () => {
    expect(calculateResult([0, 0])).toEqual({ total: 0, average: 0, grade: "F" });
    expect(calculateResult([100])).toEqual({ total: 100, average: 100, grade: "A" });
  });

  it("ranks students by total score and updates position when scores change", () => {
    const initial = rankResults([
      { studentId: "ASA-02", scores: [65, 70] },
      { studentId: "ASA-01", scores: [80, 75] },
    ]);
    expect(initial.map(item => [item.studentId, item.position])).toEqual([["ASA-01", 1], ["ASA-02", 2]]);

    const updated = rankResults([
      { studentId: "ASA-02", scores: [95, 70] },
      { studentId: "ASA-01", scores: [80, 75] },
    ]);
    expect(updated[0]?.studentId).toBe("ASA-02");
    expect(updated[0]?.position).toBe(1);
  });
});
