import { AnswerForm } from "@/components/AnswerForm";
import { getCumulativeStats } from "@/lib/stats";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { total, average } = await getCumulativeStats();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-10 px-6 py-20">
      {total > 0 && (
        <div className="border border-ink px-6 py-4 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            Indice cumulé actuel
          </p>
          <p className="mt-1 font-serif text-3xl font-semibold tabular-nums">{average}%</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
            {total} observation{total === 1 ? "" : "s"} enregistrée{total === 1 ? "" : "s"}
          </p>
        </div>
      )}

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Protocole d&apos;observation n° 1
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold leading-snug sm:text-4xl">
          Quelle est la différence entre un ours et un train&nbsp;?
        </h2>
        <p className="mt-4 max-w-prose font-mono text-sm leading-relaxed text-ink-muted">
          Toute observation est recevable. Le comité se charge d&apos;en établir l&apos;indice de
          corrélation.
        </p>
      </div>
      <AnswerForm />
    </div>
  );
}
