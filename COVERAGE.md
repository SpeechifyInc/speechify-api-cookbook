# Coverage

What exists today and where the gaps are. Update this table whenever you add a recipe.

Legend: ✅ available · ⬜ planned / wanted

Recipes come in two flavors:

- **SDK** — uses an official Speechify SDK for that language.
- **Native** — calls the REST API directly (no SDK), e.g. `fetch` (TS), `requests` (Python), `curl` (Bash).

Each cell points at `recipes/audio/<language>/<flavor>/<recipe>/`.

## Audio (Text-to-Speech)

|                                        | TypeScript<br>SDK | TypeScript<br>Native | Python<br>SDK | Python<br>Native | Bash<br>Native |
| -------------------------------------- | :---------------: | :------------------: | :-----------: | :--------------: | :------------: |
| quickstart (synthesize to file)        |        ✅         |          ✅          |      ⬜       |        ⬜        |       ⬜       |
| streaming                              |        ✅         |          ⬜          |      ⬜       |        ⬜        |       ⬜       |
| SSML controls (pitch / rate / emotion) |        ✅         |          ⬜          |      ⬜       |        ⬜        |       ⬜       |
| word-level timestamps (caption sync)   |        ✅         |          ⬜          |      ⬜       |        ⬜        |       ⬜       |
| voice cloning                          |        ✅         |          ⬜          |      ⬜       |        ⬜        |       ⬜       |

> Python parity is deferred until `speechify-api` ships a v2 on PyPI; bash (curl) recipes
> are planned.
