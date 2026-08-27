import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { answers } from "@/lib/db/schema";
import { generateCorrelation } from "@/lib/openai";

const bodySchema = z.object({
  answer: z.string().trim().min(1, "La réponse ne peut pas être vide.").max(500),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Requête invalide." },
      { status: 400 },
    );
  }

  const { answer } = parsed.data;

  try {
    const { score, explanation } = await generateCorrelation(answer);

    await db.insert(answers).values({
      answerText: answer,
      score,
      explanation,
    });

    return NextResponse.json({ score, explanation });
  } catch (error) {
    console.error("Failed to generate correlation:", error);
    return NextResponse.json(
      { error: "Impossible de calculer la corrélation pour le moment." },
      { status: 500 },
    );
  }
}
