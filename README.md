# Ours vs Train

"Quelle est la différence entre un ours et un train ?" Un mini-jeu web qui pose la question,
calcule un "indice de corrélation" pseudo-scientifique via l'API OpenAI, et affiche des stats
globales sur toutes les réponses collectées.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Drizzle ORM + Supabase (Postgres)
- OpenAI API (`gpt-4o-mini`, structured outputs)
- Recharts

## Setup

1. Installer les dépendances :

   ```bash
   pnpm install
   ```

2. Copier `.env.example` vers `.env.local` et renseigner :
   - `DATABASE_URL` : connection string d'un projet [Supabase](https://supabase.com)
     (Project Settings > Database > Connection string > **Transaction pooler**, port 6543 —
     recommandé pour un déploiement serverless sur Vercel)
   - `OPENAI_API_KEY` : clé API depuis [platform.openai.com](https://platform.openai.com)

3. Créer la table `answers` sur la base :

   ```bash
   pnpm db:push
   ```

4. Lancer le serveur de dev :

   ```bash
   pnpm dev
   ```

   Ouvrir [http://localhost:3000](http://localhost:3000).

## Déploiement

Le projet est prévu pour être déployé sur [Vercel](https://vercel.com/new), en connectant ce
dépôt GitHub. Penser à renseigner `DATABASE_URL` et `OPENAI_API_KEY` dans les variables
d'environnement du projet Vercel.
