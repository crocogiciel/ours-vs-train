import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `Tu es un institut de recherche fictif et absurde spécialisé dans l'étude
de la corrélation entre les ours et les trains. On te donne une différence entre un ours et un
train proposée par un humain, sur le mode d'un jeu de blagues entre amis.

Ta mission :
1. Invente un "indice de corrélation ours-train" entre 0 et 100, totalement arbitraire et sans
   aucune vraie logique scientifique (le but est l'absurde, pas la précision).
2. Rédige une explication ULTRA courte (une seule phrase, 15 mots maximum), en français, drôle et
   absurde, qui justifie ce score de façon pseudo-scientifique en s'appuyant sur la réponse
   donnée. Jamais méchante ni offensante.

Réponds uniquement avec l'objet JSON demandé.`;

export interface CorrelationResult {
  score: number;
  explanation: string;
}

export async function generateCorrelation(
  answer: string,
): Promise<CorrelationResult> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Différence proposée entre un ours et un train : "${answer}"`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "correlation_result",
        strict: true,
        schema: {
          type: "object",
          properties: {
            score: {
              type: "integer",
              minimum: 0,
              maximum: 100,
              description: "Indice de corrélation ours-train, de 0 à 100.",
            },
            explanation: {
              type: "string",
              description:
                "Explication très courte, humoristique et absurde du score, en français.",
            },
          },
          required: ["score", "explanation"],
          additionalProperties: false,
        },
      },
    },
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new Error("No response from OpenAI");
  }

  const parsed = JSON.parse(raw) as CorrelationResult;
  return {
    score: Math.max(0, Math.min(100, Math.round(parsed.score))),
    explanation: parsed.explanation.trim(),
  };
}
