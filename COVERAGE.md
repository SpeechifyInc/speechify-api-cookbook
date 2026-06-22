# Coverage

What exists today and where the gaps are. Update this table whenever you add a recipe.

Legend: ✅ available · ⬜ planned / wanted · — not applicable

Recipes come in two flavors:

- **SDK** — uses an official Speechify SDK for that language.
- **Native** — calls the REST API directly (no SDK), e.g. `fetch` (TS), `requests` (Python), `curl` (Bash).

Each cell points at `recipes/<product>/<language>/<flavor>/<recipe>/`.

## Audio (Text-to-Speech)

|                                        | TypeScript<br>SDK | TypeScript<br>Native | Python<br>SDK | Python<br>Native | Bash<br>Native |
| -------------------------------------- | :---------------: | :------------------: | :-----------: | :--------------: | :------------: |
| quickstart (synthesize to file)        |        ✅         |          ✅          |      ✅       |        ✅        |       ⬜       |
| streaming                              |        ✅         |          ⬜          |      ✅       |        ⬜        |       ⬜       |
| SSML controls (pitch / rate / emotion) |        ✅         |          ⬜          |      ✅       |        ⬜        |       ⬜       |
| word-level timestamps (caption sync)   |        ✅         |          ⬜          |      ✅       |        ⬜        |       ⬜       |
| voice cloning                          |        ✅         |          ⬜          |      ✅       |        ⬜        |       ⬜       |

## Voice Agents

Voice Agents has no SDK yet, so SDK columns are reserved. The `recipes/agents/` namespace
is in place; recipes are coming back after the v2 reset.

|                                                | TypeScript<br>SDK | TypeScript<br>Native | Python<br>SDK | Python<br>Native | Bash<br>Native |
| ---------------------------------------------- | :---------------: | :------------------: | :-----------: | :--------------: | :------------: |
| quickstart (create agent + start conversation) |         —         |          ⬜          |       —       |        ⬜        |       ⬜       |
| manage agents (CRUD)                           |         —         |          ⬜          |       —       |        ⬜        |       ⬜       |
| inspect conversation transcript                |         —         |          ⬜          |       —       |        ⬜        |       ⬜       |
| browser widget embed                           |         —         |          ⬜          |       —       |        —         |       —        |
| live audio session (LiveKit room)              |         —         |          ⬜          |       —       |        ⬜        |       —        |
