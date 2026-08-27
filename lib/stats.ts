import { db } from "./db";
import { answers } from "./db/schema";

export async function getCumulativeStats() {
  const rows = await db.select({ score: answers.score }).from(answers);

  const total = rows.length;
  const average =
    total === 0
      ? 0
      : Math.round((rows.reduce((sum, row) => sum + row.score, 0) / total) * 10) / 10;

  return { total, average };
}
