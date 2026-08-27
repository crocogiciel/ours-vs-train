export interface CorrelationResult {
  score: number;
  explanation: string;
}

export function ResultCard({ score, explanation }: CorrelationResult) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-amber-300 bg-amber-50 p-6 text-center shadow-sm dark:border-amber-700 dark:bg-amber-950">
      <p className="text-sm uppercase tracking-wide text-amber-700 dark:text-amber-300">
        Indice de corrélation ours-train
      </p>
      <p className="mt-2 text-5xl font-bold text-amber-900 dark:text-amber-100">
        {score}%
      </p>
      <p className="mt-4 text-base italic text-amber-800 dark:text-amber-200">
        {explanation}
      </p>
    </div>
  );
}
