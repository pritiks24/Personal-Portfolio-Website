# Personal Portfolio Website

A creative personal portfolio built with Next.js, React, Tailwind CSS, Framer Motion, and lucide-react.

The site is designed as a modern smartphone home screen where each app icon opens a portfolio section.

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

Most placeholder content lives in:

```txt
components/portfolio/data.ts
components/portfolio/PortfolioApps.tsx
components/portfolio/HomeScreen.tsx
```

## Gemini-powered portfolio search

Set `GEMINI_API_KEY` in Vercel's project environment variables for Production (and Preview if desired), then redeploy. For local development, copy `.env.example` to `.env.local`, set the key there, and restart the dev server. Never put the key in a `NEXT_PUBLIC_` variable or commit it.

`GEMINI_MODEL` is optional and defaults to `gemini-3.5-flash`. Set it to a model available to your Google AI Studio project if needed.

The `/api/ask` server route uses Gemini to select relevant verified portfolio facts. It returns the original fact text, not unchecked model-written claims. Unknown facts use the contact fallback. Without a key, the original prepared-question matching still works. Provider failures show a temporary-service message (or a prepared answer when one is available). No application rate limiter is installed.

Edit `lib/portfolio-knowledge.ts` to add personal facts. Project and experience entries are also included from `components/portfolio/data.ts`.

Run the server integration checks with `node --test tests/ask-api.test.cjs`.
