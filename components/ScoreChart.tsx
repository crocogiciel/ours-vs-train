"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface ScoreBucket {
  range: string;
  count: number;
}

export function ScoreChart({ buckets }: { buckets: ScoreBucket[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={buckets} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
          <XAxis
            dataKey="range"
            tick={{ fontSize: 12 }}
            label={{ value: "Indice de corrélation", position: "insideBottom", offset: -4, fontSize: 12 }}
          />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={30} />
          <Tooltip
            formatter={(value) => [`${value} réponse${value === 1 ? "" : "s"}`, "Total"]}
          />
          <Bar dataKey="count" fill="#d97706" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
