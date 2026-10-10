import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { calculateResultRow, getScoreLimits, getBoardSection, resultFeedbackLabel } from "../shared/resultUi";

describe("result-entry UI calculations", () => {
  it("recalculates total, average, and grade from CA and exam", () => {
    expect(calculateResultRow("Aisha Mohammed", 32, 54)).toMatchObject({ total: 86, average: 86, grade: "A" });
    expect(calculateResultRow("Yusuf Ibrahim", 20, 30).grade).toBe("D");
  });

  it("uses the correct board-specific score limits", () => {
    expect(getBoardSection("NURSERY 1A")).toBe("early");
    expect(getScoreLimits("PRIMARY 5B")).toMatchObject({ caEach: 20, exam: 40, total: 100 });
    expect(getBoardSection("JSS 1A")).toBe("secondary");
    expect(getScoreLimits("SSS 3B")).toMatchObject({ caEach: 10, exam: 70, total: 100 });
  });

  it("exposes clear save and submit confirmations", () => {
    expect(resultFeedbackLabel("saved")).toBe("Saved successfully");
    expect(resultFeedbackLabel("submitted")).toBe("Submitted for review");
    expect(resultFeedbackLabel("error")).toBe("Save failed");
  });

  it("renders clear Staff assigned-workspace indicators", () => {
    const source = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
    expect(source).toContain("Your assigned workspace");
    expect(source).toContain("Current upload scope");
    expect(source).toContain("Scope locked");
    expect(source).toContain("{reportSection}");
    expect(source).toContain("{selectedClass?.name || \"Choose a class\"}");
    expect(source).toContain("{subject || \"Choose a subject\"}");
  });
});
