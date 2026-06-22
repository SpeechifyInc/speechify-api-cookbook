# Speechify Cookbook

Focused, runnable recipes for the Speechify
[Text-to-Speech](https://docs.speechify.ai/tts) API.

Each recipe is small, self-contained, and does one thing — copy a folder, add your API
key, and run it.

## Quick start

```bash
# 1. Get an API key: https://console.speechify.ai/api-keys
# 2. Pick a recipe below and follow its README.
```

The fastest path:

```bash
cd recipes/audio/typescript/sdk/quickstart
cp .env.example .env        # paste your SPEECHIFY_API_KEY
pnpm install && pnpm start  # writes output.mp3
```

## Recipes

Recipes are organized by **product → language → flavor → recipe**:

```
recipes/<product>/<language>/{sdk,native}/<recipe>/
```

- **SDK** — uses an official Speechify SDK for that language.
- **Native** — calls the REST API directly (no SDK), e.g. `fetch` in TS, `requests` in Python, `curl` in Bash.

### Audio (Text-to-Speech)

| Recipe                                                        | Flavor | Description                                               |
| ------------------------------------------------------------- | ------ | --------------------------------------------------------- |
| [quickstart](./recipes/audio/typescript/sdk/quickstart)       | SDK    | Synthesize speech to an MP3 file.                         |
| [quickstart](./recipes/audio/typescript/native/quickstart)    | Native | Same, calling the REST API directly with `fetch`.         |
| [streaming](./recipes/audio/typescript/sdk/streaming)         | SDK    | Stream audio to disk as it is generated.                  |
| [ssml-emotion](./recipes/audio/typescript/sdk/ssml-emotion)   | SDK    | Control emotion, pitch, rate, pauses & emphasis via SSML. |
| [speech-marks](./recipes/audio/typescript/sdk/speech-marks)   | SDK    | Word-level timestamps → WebVTT captions.                  |
| [voice-cloning](./recipes/audio/typescript/sdk/voice-cloning) | SDK    | Clone a voice from a sample, synthesize, then delete it.  |

All recipes above are TypeScript. The `audio/python/` and `audio/bash/` namespaces are
reserved for when those land — see [`COVERAGE.md`](./COVERAGE.md).

## Repository layout

```
recipes/audio/<language>/{sdk,native}/<recipe>/
```

- `audio/` — Text-to-Speech today; the audio platform will expand.
- `<language>` — `typescript` (active), `python` and `bash` (reserved).
- `sdk` — uses the official Speechify SDK for that language.
- `native` — calls the REST API directly (no SDK).

This is a **pnpm workspace** monorepo. TypeScript/JavaScript recipes are workspace members
(shared dependency versions via the pnpm `catalog:`); Python recipes use **uv** and are
managed per-recipe.

| Path         | What                                                                      |
| ------------ | ------------------------------------------------------------------------- |
| `recipes/`   | The recipes themselves.                                                   |
| `templates/` | Copy-to-start scaffolds for new recipes.                                  |
| `agents/`    | Modular maintenance/usage instructions, loaded on demand via `AGENTS.md`. |
| `AGENTS.md`  | Entry point for AI agents and contributors.                               |

## Tooling

- **Node 20+** and **pnpm** for JavaScript/TypeScript recipes.
- **Python 3.9+** and **[uv](https://docs.astral.sh/uv/)** for Python recipes.
- `pnpm install` at the root sets up all JS recipes.
- `pnpm format` formats the repo with Prettier.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and
[`agents/creating-a-recipe.md`](./agents/creating-a-recipe.md). New recipes start from
`templates/`.

## License

[MIT](./LICENSE)
