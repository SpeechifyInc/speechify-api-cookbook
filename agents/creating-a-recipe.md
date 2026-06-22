# Creating a recipe

The canonical checklist for adding a new recipe. Follow it top to bottom.

## 1. Pick a location

```
recipes/<product>/<language>/{sdk,native}/<recipe-name>/
```

- `product`: `audio` (Text-to-Speech today; the audio platform will expand) or `agents`
  (Voice Agents). Create a new top-level product only for a genuinely new Speechify
  product.
- `language`: `typescript`, `python`, or `bash` (`bash` is `native`-only).
- `sdk` or `native`: SDK-based recipes use an official Speechify SDK; native recipes call
  the REST API directly (`fetch`, `requests`, `curl`).
- `recipe-name`: kebab-case, describes the task (`streaming-to-file`, not `tts-stream-2`).
  Do not add `-rest` / `-sdk` suffixes — the parent folder already encodes the flavor.

## 2. Copy the template

- TypeScript → copy [`templates/typescript/recipe`](../templates/typescript/recipe).
- Python → copy [`templates/python/recipe`](../templates/python/recipe).

Then read the language guide:
[`typescript-recipes.md`](./typescript-recipes.md) or
[`python-recipes.md`](./python-recipes.md).

## 3. Every recipe MUST contain

- `README.md` — follow the **fixed template** below.
- `.env.example` — only the keys it needs (almost always just `SPEECHIFY_API_KEY=`).
- A manifest — `package.json` (TS) or `pyproject.toml` (Python).
- Source that runs end to end and produces a visible result (a saved file, printed output,
  or a live session).

## 4. README template

Keep recipe READMEs short and identical in shape:

```markdown
# <Product>: <what this recipe does>

<One sentence on what you'll build and the end result.>

## Prerequisites

- A Speechify API key — https://console.speechify.ai/api-keys
- <Node 20+ / Python 3.9+>

## Setup

\`\`\`bash
cp .env.example .env # then paste your SPEECHIFY_API_KEY
<install command>
\`\`\`

## Run

\`\`\`bash
<run command>
\`\`\`

## What it does

<2–4 bullets explaining the key API calls / parameters.>
```

## 5. Wire it up

- Add a row to the repo [`README.md`](../README.md) recipe index.
- Update [`COVERAGE.md`](../COVERAGE.md).
- Run `pnpm format` from the root before committing.

## 6. Verify it actually runs

Do not mark a recipe done until you have run it from a clean state with the README's exact
commands against the live API. If you cannot run it (e.g. no key), say so explicitly.
