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

| Recipe                                                                 | Language   | Description                                               |
| ---------------------------------------------------------------------- | ---------- | --------------------------------------------------------- |
| [quickstart](./recipes/text-to-speech/typescript/quickstart)           | TypeScript | Synthesize speech to an MP3 file (SDK).                   |
| [quickstart](./recipes/text-to-speech/python/quickstart)               | Python     | Synthesize speech to an MP3 file (SDK).                   |
| [quickstart-rest](./recipes/text-to-speech/typescript/quickstart-rest) | TypeScript | Same, calling the REST API directly (no SDK, `fetch`).    |
| [quickstart-rest](./recipes/text-to-speech/python/quickstart-rest)     | Python     | Same, calling the REST API directly (no SDK, `requests`). |
| [streaming](./recipes/text-to-speech/typescript/streaming)             | TypeScript | Stream audio to disk as it is generated.                  |
| [streaming](./recipes/text-to-speech/python/streaming)                 | Python     | Stream audio to disk as it is generated.                  |
| [ssml-emotion](./recipes/text-to-speech/typescript/ssml-emotion)       | TypeScript | Control emotion, pitch, rate, pauses & emphasis via SSML. |
| [ssml-emotion](./recipes/text-to-speech/python/ssml-emotion)           | Python     | Control emotion, pitch, rate, pauses & emphasis via SSML. |
| [speech-marks](./recipes/text-to-speech/typescript/speech-marks)       | TypeScript | Word-level timestamps → WebVTT captions.                  |
| [speech-marks](./recipes/text-to-speech/python/speech-marks)           | Python     | Word-level timestamps → WebVTT captions.                  |
| [voice-cloning](./recipes/text-to-speech/typescript/voice-cloning)     | TypeScript | Clone a voice from a sample, synthesize, then delete it.  |
| [voice-cloning](./recipes/text-to-speech/python/voice-cloning)         | Python     | Clone a voice from a sample, synthesize, then delete it.  |

### Voice Agents

Voice Agents recipes are **native REST** (`-rest` suffix) today. The first **SDK** recipe,
`realtime-conversation`, previews the Python SDK's upcoming realtime support — it is pinned
to the SDK's pre-release branch until that ships, then switches to the published version.

| Recipe                                                                                         | Language   | Description                                                                          |
| ---------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| [quickstart-rest](./recipes/voice-agents/typescript/quickstart-rest)                           | TypeScript | Create an agent and open a live conversation session.                                |
| [quickstart-rest](./recipes/voice-agents/python/quickstart-rest)                               | Python     | Create an agent and open a live conversation session.                                |
| [manage-agents-rest](./recipes/voice-agents/typescript/manage-agents-rest)                     | TypeScript | Agent CRUD: create, list, get, update, delete.                                       |
| [manage-agents-rest](./recipes/voice-agents/python/manage-agents-rest)                         | Python     | Agent CRUD: create, list, get, update, delete.                                       |
| [conversation-transcript-rest](./recipes/voice-agents/typescript/conversation-transcript-rest) | TypeScript | Start a conversation and read its transcript.                                        |
| [conversation-transcript-rest](./recipes/voice-agents/python/conversation-transcript-rest)     | Python     | Start a conversation and read its transcript.                                        |
| [realtime-conversation](./recipes/voice-agents/python/realtime-conversation)                   | Python     | Stream audio to a voice agent in real time and save its spoken reply (SDK realtime). |

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
