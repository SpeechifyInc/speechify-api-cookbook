# Monorepo layout

This is a **pnpm workspace** monorepo. Recipes are organized **by product, then by
language, then by recipe**:

```
recipes/<product>/<language>/<recipe-name>/
```

```
speechify-cookbook/
├── AGENTS.md                  # entry point → points into agents/
├── agents/                    # modular, load-on-demand instructions
├── README.md                  # human-facing index of every recipe
├── COVERAGE.md                # product × language matrix (what exists / is missing)
├── CONTRIBUTING.md
├── package.json               # workspace root (prettier, shared scripts)
├── pnpm-workspace.yaml         # workspace globs + dependency catalog
├── tsconfig.base.json          # shared TS compiler options
├── templates/                 # copy-to-start scaffolds
│   ├── typescript/recipe/
│   └── python/recipe/
└── recipes/
    ├── text-to-speech/
    │   ├── typescript/
    │   │   └── quickstart/
    │   └── python/
    │       └── quickstart/
    └── voice-agents/
        └── typescript/
            └── quickstart/
```

## Why this shape

- **Product first** reads naturally for a product-led company — a user lands on "TTS"
  then picks their language. (Researched against Deepgram, ElevenLabs, and Cartesia
  cookbooks; product-first + self-contained examples is the best fit here.)
- **Self-contained recipes**: each leaf folder has its own manifest, `.env.example`, and
  `README.md` so it can be copied out and run alone.

## Languages and tooling (current scope: JS + Python)

| Language      | Manager  | Workspace member?                         | Notes                                                                       |
| ------------- | -------- | ----------------------------------------- | --------------------------------------------------------------------------- |
| TypeScript/JS | **pnpm** | Yes — matched by `recipes/*/typescript/*` | Run with `tsx`. Versions come from the `catalog:` in `pnpm-workspace.yaml`. |
| Python        | **uv**   | No (managed per-recipe)                   | Each recipe has its own `pyproject.toml`; run with `uv run`.                |

> Rust is planned but **not yet enabled** — do not add Rust tooling until requested. When
> it lands it will follow the same axis (`recipes/<product>/rust/<recipe>/` with Cargo).

## Naming rules

- Folders are **kebab-case**: `text-to-speech`, `voice-agents`, `streaming-to-file`.
- Language folders are exactly `typescript` or `python`.
- Recipe names describe the task, not the API method: `quickstart`, `streaming-to-file`,
  `clone-a-voice`, `phone-call-agent`.
- Recipes use the official SDK by default. A **native (raw HTTP)** variant of a recipe
  takes the same name plus a `-rest` suffix (e.g. `quickstart` → `quickstart-rest`) and
  has no SDK dependency. Provide native variants where they add value (e.g. quickstarts,
  or anything a user on an SDK-less language would need); the SDK version stays the
  recommended path. Voice Agents recipes are native today because there is no SDK yet.

## Workspace mechanics

- `pnpm install` at the root installs all TypeScript recipes.
- Shared dependency versions live in the **catalog** (`pnpm-workspace.yaml`). Recipes
  reference them as `"@speechify/api": "catalog:"`.
- `pnpm -r <script>` runs a script across every JS recipe; `pnpm --filter <name> <script>`
  targets one.
- Python recipes are intentionally **outside** the pnpm workspace — see
  [`python-recipes.md`](./python-recipes.md).
