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
      <div className="flex flex-col items-start gap-4">
        <ResultCard id={result.id} score={result.score} explanation={result.explanation} />
        <button
          type="button"
          onClick={handleReset}
          className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted underline underline-offset-4 hover:text-ink"
        >
          Soumettre une nouvelle observation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          01 — Différence observée
        </span>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          maxLength={500}
          rows={2}
          placeholder="Ex : le pelage"
          className="w-full resize-none border-b-2 border-ink bg-transparent py-3 font-serif text-lg leading-relaxed outline-none placeholder:text-ink-muted/50 focus:border-accent"
          disabled={loading}
        />
      </label>

      {error && (
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !answer.trim()}
        className="self-start border-2 border-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink"
      >
        {loading ? "Analyse en cours…" : "Soumettre au comité"}
      </button>
    </form>
  );
}
