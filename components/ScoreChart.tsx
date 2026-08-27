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

const INK = "#1c1b18";
const ACCENT = "#8a2418";
const LINE = "#d6d0c2";

export function ScoreChart({ buckets }: { buckets: ScoreBucket[] }) {
  return (
    <div className="h-72 w-full border border-line p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={buckets} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="2 4" stroke={LINE} vertical={false} />
          <XAxis
            dataKey="range"
            tick={{ fontSize: 11, fontFamily: "var(--font-plex-mono)", fill: INK }}
            axisLine={{ stroke: INK }}
            tickLine={false}
            label={{
              value: "Indice de corrélation",
              position: "insideBottom",
              offset: -4,
              fontSize: 11,
              fontFamily: "var(--font-plex-mono)",
              fill: INK,
            }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fontFamily: "var(--font-plex-mono)", fill: INK }}
            axisLine={{ stroke: INK }}
            tickLine={false}
            width={30}
          />
          <Tooltip
            contentStyle={{
              background: "#f7f5ef",
              border: "1px solid #1c1b18",
              borderRadius: 0,
              fontFamily: "var(--font-plex-mono)",
              fontSize: 12,
            }}
            formatter={(value) => [`${value} réponse${value === 1 ? "" : "s"}`, "Total"]}
          />
          <Bar dataKey="count" fill={ACCENT} radius={0} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
