# Text-to-Speech: Python streaming

Stream synthesized audio to disk as it is generated, instead of waiting for the whole clip.
Useful for long inputs and low-latency playback.

## Prerequisites

- A Speechify API key — https://console.speechify.ai/api-keys
- Python 3.9+ and [uv](https://docs.astral.sh/uv/)

## Setup

```bash
cp .env.example .env   # then paste your SPEECHIFY_API_KEY
```

## Run

```bash
uv run main.py
```

You'll get an `output.mp3` written chunk by chunk.

## What it does

- Calls `client.tts.audio.stream(...)` with `accept` (`audio/mpeg`, `audio/ogg`,
  `audio/aac`, or `audio/pcm`), `input`, `voice_id`, and `model`.
- Iterates the returned `Iterator[bytes]`, writing each chunk to the file as it arrives —
  the same loop could instead feed an audio player.
- For prosody/emotion control, pass SSML in `input` (see the `ssml-emotion` recipe).
