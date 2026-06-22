# Text-to-Speech: TypeScript quickstart

Synthesize a sentence to an `output.mp3` file using the `@speechify/api` SDK.

## Prerequisites

- A Speechify API key — https://console.speechify.ai/api-keys
- Node 20+

## Setup

```bash
cp .env.example .env   # then paste your SPEECHIFY_API_KEY
pnpm install
```

## Run

```bash
pnpm start
```

You'll get an `output.mp3` in this folder.

## What it does

- Creates a `SpeechifyClient` with your API key.
- Calls `client.audio.speech(...)` with `input`, `voiceId`, `audioFormat`, and `model`
  (`simba-english` for English, lowest latency; `simba-multilingual` for 30+ languages).
- Decodes the base64 `response.audio_data` and writes it to disk.
