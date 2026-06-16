# Voice Agents: TypeScript quickstart

Create a Speechify Voice Agent and open a live conversation session — the "control plane"
for a real-time voice agent. There is no Voice Agents SDK yet, so this uses the REST API
directly with native `fetch`.

## Prerequisites

- A Speechify API key — https://console.speechify.ai/api-keys
- Node 20+ (for built-in `fetch`)

## Setup

```bash
cp .env.example .env   # then paste your SPEECHIFY_API_KEY
pnpm install
```

## Run

```bash
pnpm start
```

You'll see a new agent `id`, then the conversation session payload — including a
`wss://realtime.speechify.ai/...` WebSocket URL and auth token you'd connect an audio
client to.

## What it does

- `POST /v1/agents` — creates an agent with a `prompt`, `first_message`, and `voice_id`
  (`sabrina`, `carly`, `dominic`, or `lyla`).
- `POST /v1/agents/{id}/conversations` — starts a session and returns the WebSocket URL +
  token for streaming audio.

## Next steps

- Connect a WebSocket audio client to stream speech in/out (a separate, more advanced
  recipe).
- Or embed the drop-in browser widget — see [`agents/voice-agents.md`](../../../../agents/voice-agents.md).
