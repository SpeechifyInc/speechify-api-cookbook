# Speechify Voice Agents

Reference for the Voice Agents surface. Authoritative docs:
<https://docs.speechify.ai/voice-agents>. Shapes below were verified live against the API.

Voice Agents are configurable, real-time conversational agents. There is **no dedicated
SDK** today, so all cookbook recipes are **native REST** and carry the `-rest` suffix
(`quickstart-rest`, `manage-agents-rest`, …). The bare names (`quickstart`, …) are reserved
for SDK versions once an SDK adds Voice Agents support.

## Auth

All requests use `Authorization: Bearer $SPEECHIFY_API_KEY`. Get a key at
<https://console.speechify.ai/api-keys>.

## Agents (CRUD)

```
POST   /v1/agents              # create  → 201
GET    /v1/agents              # list    → 200  { "agents": [ ... ] }  (newest first)
GET    /v1/agents/{id}         # get     → 200
PATCH  /v1/agents/{id}         # update  → 200  (send only the fields you want to change)
DELETE /v1/agents/{id}         # delete  → 204
```

Create body — required: `name`, `prompt`, `first_message`, `voice_id`:

```json
{ "name": "…", "prompt": "…", "first_message": "…", "voice_id": "sabrina" }
```

Built-in voices include `sabrina` (default), `carly`, `dominic`, `lyla`. The created agent
returns a rich object: `id` (`agent_01…`), `slug`, `language`, `temperature`,
`voice_id`, `widget_config`, `memory_enabled`, `save_audio_recording`, `amd`, etc.

## Start a conversation (live session)

```
POST /v1/agents/{id}/conversations    → 201
```

Returns:

```jsonc
{
  "conversation": { "id": "conv_01…", "agent_id": "…", "status": "pending", "message_count": 0, … },
  "room": "conv_01…",        // LiveKit room name
  "token": "eyJ…",            // LiveKit JWT
  "url": "wss://….livekit.cloud" // LiveKit Cloud URL
}
```

**The realtime transport is LiveKit.** To stream audio in/out, join the room with a
[LiveKit client SDK](https://docs.livekit.io/home/client/) using `url` + `token` + `room` —
you do **not** hand-roll a WebSocket protocol. (This is why a "raw WebSocket" recipe is the
wrong framing; a LiveKit-based audio recipe is the right one.)

## Inspect a conversation transcript

```
GET /v1/agents/conversations/{conversation_id}/messages    → 200
```

Returns `{ "messages": [ … ], "next_cursor": null, "has_more": false }`. Each message has a
`role` and text. Empty until a real audio session has run in the room. Page with
`next_cursor` while `has_more` is true.

## Embed the web widget

```html
<script src="https://api.speechify.ai/v1/widget/agents.js"></script>
<speechify-agent agent-id="<agent.id>"></speechify-agent>
```

## Recipe guidance

- Shipped native recipes: `quickstart-rest` (create agent + start session),
  `manage-agents-rest` (CRUD), `conversation-transcript-rest` (read transcript).
- Recipes that create agents should **delete what they create** (agents are persistent;
  don't accumulate demo agents). Only delete agents the recipe created — never list-and-
  delete the user's agents.
- Live audio belongs in a LiveKit-based recipe (use the LiveKit client with the session
  `url`/`token`/`room`), not a hand-rolled WebSocket client.
- The browser widget belongs in a small front-end recipe (single HTML page or Next.js
  route) under `voice-agents/typescript/`.
- When an SDK adds Voice Agents support, add SDK versions at the bare recipe names and keep
  these `-rest` ones.
