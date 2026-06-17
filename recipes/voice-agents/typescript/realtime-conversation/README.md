# Voice Agents: real-time conversation (audio in, audio out)

Stream audio to a Speechify voice agent in real time and save its spoken reply to a WAV file, with the live transcript printed to your terminal.

## Prerequisites

- A Speechify API key — https://console.speechify.ai/api-keys
- Node.js 20+

## Setup

```bash
cp .env.example .env # then paste your SPEECHIFY_API_KEY
pnpm install
```

## Run

```bash
pnpm start
```

Writes `agent_reply.wav` (the agent's spoken response) and prints the transcript.

## What it does

- Creates a throwaway voice agent, then opens a realtime conversation with `client.agent.createConversation(...)`.
- Connects with `@speechify/api/realtime` and streams `fixtures/caller.wav` to the agent via `session.sendAudio()` — raw PCM16 bytes, no audio device involved.
- Saves the agent's audio from `session.outputAudio()` to `agent_reply.wav` and prints transcript updates from `session.onText()`.
- Deletes the agent on exit.

> The SDK exposes the realtime session as raw byte streams — wire `sendAudio()` / `outputAudio()` to any source/sink (a telephony bridge, a WebSocket, files, your own capture lib).
> `fixtures/caller.wav` was produced from a Speechify sample (`https://speechify.ai/audio/multilingual/en.mp3`) with `ffmpeg -i en.mp3 -ar 48000 -ac 1 -sample_fmt s16 caller.wav`.
> Realtime support ships in the SDK's `realtime-connect` branch until released; this recipe pins that branch via git. Switch to the catalog `@speechify/api` version once it's published to npm.
