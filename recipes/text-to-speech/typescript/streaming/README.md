# Text-to-Speech: TypeScript streaming

Stream synthesized audio to disk as it is generated, instead of waiting for the whole clip.
Useful for long inputs and low-latency playback.

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

You'll get an `output.mp3` written chunk by chunk.

## What it does

- Calls `client.tts.audio.stream(...)` with `accept` (`audio/mpeg`, `audio/ogg`,
  `audio/aac`, or `audio/pcm`), `input`, `voiceId`, and `model`.
- Receives a Node `Readable` and pipes it straight to a file with `stream/promises`
  `pipeline` — the same stream could instead feed an audio player or HTTP response.
- For prosody/emotion control, pass SSML in `input` (see the `ssml-emotion` recipe).
