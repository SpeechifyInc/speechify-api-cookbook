# Speechify Cookbook

Focused, runnable recipes for the Speechify
[Text-to-Speech](https://docs.speechify.ai/tts) and
[Voice Agents](https://docs.speechify.ai/voice-agents) APIs.

Each recipe is small, self-contained, and does one thing — copy a folder, add your API
key, and run it.

## Quick start

```bash
# 1. Get an API key: https://console.speechify.ai/api-keys
# 2. Pick a recipe below and follow its README.
```

The fastest path:

```bash
cd recipes/text-to-speech/typescript/quickstart
cp .env.example .env        # paste your SPEECHIFY_API_KEY
pnpm install && pnpm start  # writes output.mp3
```

## Recipes

### Text-to-Speech

| Recipe                                                       | Language   | Description                       |
| ------------------------------------------------------------ | ---------- | --------------------------------- |
| [quickstart](./recipes/text-to-speech/typescript/quickstart) | TypeScript | Synthesize speech to an MP3 file. |
| [quickstart](./recipes/text-to-speech/python/quickstart)     | Python     | Synthesize speech to an MP3 file. |

### Voice Agents

| Recipe                                                     | Language   | Description                                                  |
| ---------------------------------------------------------- | ---------- | ------------------------------------------------------------ |
| [quickstart](./recipes/voice-agents/typescript/quickstart) | TypeScript | Create an agent and open a live conversation session (REST). |

See [`COVERAGE.md`](./COVERAGE.md) for the full product × language matrix and what's planned.

## Repository layout

Recipes are organized **by product → language → recipe**:

```
recipes/<product>/<language>/<recipe-name>/
```

This is a **pnpm workspace** monorepo. TypeScript/JavaScript recipes are workspace members
(shared dependency versions via the pnpm `catalog:`); Python recipes use **uv** and are
managed per-recipe. Rust is planned but not yet enabled.

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
