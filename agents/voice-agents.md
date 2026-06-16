# Speechify Voice Agents

Reference for the Voice Agents surface. Authoritative docs:
<https://docs.speechify.ai/voice-agents>.

Voice Agents are configurable, real-time conversational agents. There is **no dedicated
SDK** today — you interact over REST (to create/configure agents and inspect
conversations) and WebSocket (for the live audio session), or embed a drop-in web widget.

## Auth

All requests use `Authorization: Bearer $SPEECHIFY_API_KEY`. Get a key at
<https://console.speechify.ai/api-keys>.

## Create an agent

```
POST https://api.speechify.ai/v1/agents
```

```json
{
  "name": "string",
  "prompt": "string",
  "first_message": "string",
  "voice_id": "sabrina"
}
```

Built-in voices include `sabrina` (default), `carly`, `dominic`, and `lyla`. The response
returns an agent `id`.

## Start a conversation (live session)

```
POST https://api.speechify.ai/v1/agents/{id}/conversations
```

Returns a WebSocket URL (`wss://realtime.speechify.ai/...`), an auth token, and room
details for streaming audio in/out.

## Inspect a conversation

```
GET https://api.speechify.ai/v1/agents/conversations/{conversation_id}/messages
```

Returns the transcript and analytics for a finished or in-progress conversation.

## Embed the web widget

```html
<script src="https://api.speechify.ai/v1/widget/agents.js"></script>
<speechify-agent agent-id="<agent.id>"></speechify-agent>
```

## Recipe guidance

- A good first TS/Python recipe: create an agent, start a conversation, print the returned
  WebSocket URL + token (the "control plane"). Keep the raw audio-streaming WebSocket
  client as a separate, more advanced recipe.
- The browser widget belongs in a small front-end recipe (a single HTML page or a Next.js
  route) under `voice-agents/typescript/`.
- **Verify endpoint shapes against the live API / docs before shipping** — these routes
  are newer than TTS. If a field differs, trust the API and update this file.
