export type ScoreRecord = { studentId: string; scores: number[] };

export function calculateResult(scores: number[]) {
  const total = scores.reduce((sum, score) => sum + score, 0);
  const average = scores.length ? total / scores.length : 0;
  const grade = average >= 75 ? "A" : average >= 65 ? "B" : average >= 55 ? "C" : average >= 45 ? "D" : average >= 40 ? "E" : "F";
  return { total, average: Number(average.toFixed(2)), grade };
}

export function rankResults(records: ScoreRecord[]) {
  return [...records]
    .sort((a, b) => calculateResult(b.scores).total - calculateResult(a.scores).total)
    .map((record, index) => ({ ...record, ...calculateResult(record.scores), position: index + 1 }));
}
