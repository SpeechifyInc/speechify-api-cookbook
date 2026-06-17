# Voice Agents: manage agents — CRUD (Python, native REST)

The full agent lifecycle over the REST API: **create → list → get → update → delete**.

> **Native REST recipe.** No Voice Agents SDK exists yet, so this uses `requests` and
> carries the `-rest` suffix; the SDK version will take the bare name (`manage-agents`).

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

Creates an agent, lists/gets/updates it, then deletes it — leaving your account as it was.

## What it does

| Step   | Call                                                              |
| ------ | ----------------------------------------------------------------- |
| Create | `POST /v1/agents`                                                 |
| List   | `GET /v1/agents` → `{ "agents": [...] }`                          |
| Get    | `GET /v1/agents/{id}`                                             |
| Update | `PATCH /v1/agents/{id}` (send only the fields you want to change) |
| Delete | `DELETE /v1/agents/{id}` → `204`                                  |

Useful agent fields include `name`, `prompt`, `first_message`, `voice_id`, `language`,
`temperature`, and `save_audio_recording` — see the
[API reference](https://docs.speechify.ai/voice-agents).
