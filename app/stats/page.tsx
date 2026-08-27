import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { answers } from "@/lib/db/schema";
import { ScoreChart } from "@/components/ScoreChart";

const BUCKET_SIZE = 10;

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const rows = await db.select().from(answers).orderBy(desc(answers.createdAt));

  const total = rows.length;
  const average =
    total === 0
      ? 0
      : Math.round((rows.reduce((sum, row) => sum + row.score, 0) / total) * 10) / 10;

  const buckets = Array.from({ length: 100 / BUCKET_SIZE }, (_, i) => ({
    range: `${i * BUCKET_SIZE}-${i * BUCKET_SIZE + BUCKET_SIZE}`,
    count: 0,
  }));

  for (const row of rows) {
    const index = Math.min(Math.floor(row.score / BUCKET_SIZE), buckets.length - 1);
    buckets[index].count += 1;
  }

  const recent = rows.slice(0, 20);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">Statistiques globales</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Toutes les différences entre un ours et un train, analysées par notre institut.
        </p>
      </div>

      {total === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Aucune réponse pour le moment. Sois le premier à répondre !
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-4 text-center dark:border-gray-800">
              <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">{total}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">réponses collectées</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 text-center dark:border-gray-800">
              <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">{average}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">corrélation moyenne</p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold">Distribution des scores</h2>
            <ScoreChart buckets={buckets} />
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold">Dernières réponses</h2>
            <ul className="flex flex-col gap-2">
              {recent.map((row) => (
                <li
                  key={row.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 px-4 py-3 text-sm dark:border-gray-800"
                >
                  <span className="flex-1 truncate">{row.answerText}</span>
                  <span className="shrink-0 font-semibold text-amber-700 dark:text-amber-300">
                    {row.score}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
