import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  answerText: text("answer_text").notNull(),
  score: integer("score").notNull(),
  explanation: text("explanation").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Answer = typeof answers.$inferSelect;
export type NewAnswer = typeof answers.$inferInsert;
