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
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Publication périodique
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold">Bulletin statistique</h2>
        <p className="mt-2 max-w-prose font-mono text-sm text-ink-muted">
          Synthèse de l&apos;ensemble des observations soumises au comité.
        </p>
      </div>

      {total === 0 ? (
        <p className="border border-line p-6 font-mono text-sm text-ink-muted">
          Aucune observation enregistrée à ce jour. Soyez le premier contributeur.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-px border border-ink bg-ink">
            <div className="bg-paper p-6 text-center">
              <p className="font-serif text-4xl font-semibold tabular-nums">{total}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Observations
              </p>
            </div>
            <div className="bg-paper p-6 text-center">
              <p className="font-serif text-4xl font-semibold tabular-nums">{average}%</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Corrélation moyenne
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Fig. 1 — Distribution des indices
            </h3>
            <ScoreChart buckets={buckets} />
          </div>

          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Fig. 2 — Dernières observations
            </h3>
            <div className="border border-line">
              {recent.map((row, i) => (
                <div
                  key={row.id}
                  className={`flex items-center justify-between gap-4 px-4 py-3 ${
                    i !== 0 ? "border-t border-line" : ""
                  }`}
                >
                  <span className="truncate font-serif text-sm">{row.answerText}</span>
                  <span className="shrink-0 font-mono text-sm tabular-nums text-accent">
                    {row.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
