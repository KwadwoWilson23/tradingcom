# Traders Ring

A no-login trading competition arena for browsing competitions, entering a public leaderboard username, connecting MT4/MT5 accounts read-only, and tracking live rankings.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000/join](http://localhost:3000/join) to preview the public join flow.

## Environment Variables

Create `.env.local` from `.env.example` and set these values in Vercel and Railway:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
METAAPI_TOKEN=
METAAPI_DOMAIN=https://mt-client-api-v1.agiliumtrade.agiliumtrade.ai
```

## Deploy Frontend on Vercel

`vercel.json` is included with the Next.js framework setting and `npm ci` install command.

1. Import the repository in Vercel.
2. Set the environment variables from `.env.example`.
3. Deploy with the default build command: `npm run build`.

## Deploy Backend on Railway

`railway.json` is included for Railway's Nixpacks builder.

1. Create a Railway service from the repository.
2. Set the same backend environment variables.
3. Railway will run `npm ci && npm run build`, then start with `npm run start`.

The API routes currently live inside this Next.js app under `src/app/api`. If the backend is later split into a standalone service, point frontend API calls to the Railway service URL.
