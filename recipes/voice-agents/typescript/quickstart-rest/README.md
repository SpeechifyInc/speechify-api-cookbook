# Voice Agents: TypeScript quickstart (native REST)

Create a Speechify Voice Agent and open a live conversation session — the "control plane"
for a real-time voice agent.

> **Native REST recipe.** There is no Voice Agents SDK yet, so every Voice Agents recipe
> calls the API directly with `fetch` and carries the `-rest` suffix. When an SDK adds
> Voice Agents support, the SDK version will take the bare name (`quickstart`).

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

You'll see a new agent get created, the conversation session details, then the agent gets
deleted again (so the example is repeatable).

## What it does

- `POST /v1/agents` — creates an agent with a `prompt`, `first_message`, and `voice_id`
  (`sabrina`, `carly`, `dominic`, or `lyla`).
- `POST /v1/agents/{id}/conversations` — starts a session and returns `{ url, token, room,
conversation }`. The `url` is a **LiveKit** room (`wss://…livekit.cloud`); you join it
  with a [LiveKit client](https://docs.livekit.io/home/client/) using `token` + `room` to
  stream audio in/out.
- `DELETE /v1/agents/{id}` — cleans up the demo agent. Remove this to keep the agent
  (agents are persistent; you normally create one and reuse it across conversations).

## Next steps

- Manage agents (list / get / update / delete) — see [`manage-agents-rest`](../manage-agents-rest).
- Read a conversation transcript — see [`conversation-transcript-rest`](../conversation-transcript-rest).
- Embed the drop-in browser widget — see [`agents/voice-agents.md`](../../../../agents/voice-agents.md).
