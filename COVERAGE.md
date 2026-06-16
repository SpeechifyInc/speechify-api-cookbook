# Coverage

What exists today and where the gaps are. Update this table whenever you add a recipe.

Legend: ✅ available · ⬜ planned / wanted · — not applicable

Recipes use the official SDK unless marked "native REST" (raw HTTP, no SDK — `-rest`
suffix). See `agents/monorepo.md` for the convention.

## Text-to-Speech

| Recipe                                 | TypeScript | Python | Rust |
| -------------------------------------- | :--------: | :----: | :--: |
| quickstart (synthesize to file)        |     ✅     |   ✅   |  ⬜  |
| quickstart — native REST (no SDK)      |     ✅     |   ✅   |  ⬜  |
| streaming                              |     ✅     |   ✅   |  ⬜  |
| SSML controls (pitch / rate / emotion) |     ✅     |   ✅   |  ⬜  |
| word-level timestamps (caption sync)   |     ✅     |   ✅   |  ⬜  |
| voice cloning                          |     ✅     |   ✅   |  ⬜  |

## Voice Agents

| Recipe                                         | TypeScript | Python | Rust |
| ---------------------------------------------- | :--------: | :----: | :--: |
| quickstart (create agent + start conversation) |     ✅     |   ⬜   |  ⬜  |
| live WebSocket audio session                   |     ⬜     |   ⬜   |  ⬜  |
| browser widget embed                           |     ⬜     |   —    |  —   |
| inspect conversation transcript                |     ⬜     |   ⬜   |  ⬜  |

> Rust columns are tracked for planning but Rust tooling is **not enabled yet** — see
> `agents/monorepo.md`.
