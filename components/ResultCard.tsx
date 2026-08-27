export interface CorrelationResult {
  id: number;
  score: number;
  explanation: string;
}

export function ResultCard({ id, score, explanation }: CorrelationResult) {
  const reportNumber = `OT-${String(id).padStart(6, "0")}`;

  return (
    <div className="border-2 border-ink p-8">
      <div className="flex items-baseline justify-between border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
        <span>Rapport n° {reportNumber}</span>
        <span>Confidentiel</span>
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
        Indice de corrélation inter-espèces
      </p>
      <p className="mt-2 font-serif font-semibold tabular-nums leading-none text-ink">
        <span className="text-7xl">{score}</span>
        <span className="align-top text-3xl">%</span>
      </p>

      <p className="mt-6 border-t border-line pt-6 font-serif text-lg italic leading-relaxed">
        « {explanation} »
      </p>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
        Résultat non vérifié par un comité scientifique indépendant.
      </p>
    </div>
  );
}
