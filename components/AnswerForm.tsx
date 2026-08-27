"use client";

import { useState } from "react";
import { ResultCard, type CorrelationResult } from "./ResultCard";

export function AnswerForm() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CorrelationResult | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!answer.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Une erreur est survenue.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setAnswer("");
    setResult(null);
    setError(null);
  }

  if (result) {
    return (
      <div className="flex flex-col items-center gap-4">
        <ResultCard score={result.score} explanation={result.explanation} />
        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-medium text-amber-700 underline hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
        >
          Proposer une autre différence
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3">
      <textarea
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        maxLength={500}
        rows={3}
        placeholder="Ex : le pelage"
        className="w-full resize-none rounded-xl border border-gray-300 bg-white p-4 text-base shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900"
        disabled={loading}
      />
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading || !answer.trim()}
        className="rounded-xl bg-amber-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Calcul en cours..." : "Envoyer"}
      </button>
    </form>
  );
}
