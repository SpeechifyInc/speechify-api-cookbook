# Voice Agents: conversation transcript (Python, native REST)

Start a conversation and read its transcript over the REST API.

> **Native REST recipe.** No Voice Agents SDK exists yet, so this uses `requests` and
> carries the `-rest` suffix; the SDK version will take the bare name
> (`conversation-transcript`).

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

## What it does

- `POST /v1/agents/{id}/conversations` — starts a conversation and returns its `id`.
- `GET /v1/agents/conversations/{conversation_id}/messages` — returns the transcript,
  paginated as `{ messages, next_cursor, has_more }`; each message has a `role` and text.

> The transcript is **empty until a real audio session runs** in the conversation's LiveKit
> room (see [`quickstart-rest`](../quickstart-rest)). Point this at an existing conversation
> id to print a real transcript. To page through long transcripts, follow `next_cursor`
> while `has_more` is true.
