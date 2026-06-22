# Monorepo layout

This is a **pnpm workspace** monorepo. Recipes are organized **by product → language →
flavor → recipe**:

```
recipes/<product>/<language>/{sdk,native}/<recipe-name>/
```

```
speechify-cookbook/
├── AGENTS.md                  # entry point → points into agents/
├── agents/                    # modular, load-on-demand instructions
├── README.md                  # human-facing index of every recipe
├── COVERAGE.md                # product × language × flavor matrix
├── CONTRIBUTING.md
├── package.json               # workspace root (prettier, shared scripts)
├── pnpm-workspace.yaml        # workspace globs + dependency catalog
├── tsconfig.base.json         # shared TS compiler options
├── templates/                 # copy-to-start scaffolds
│   ├── typescript/recipe/
│   └── python/recipe/
└── recipes/
    ├── audio/                 # Text-to-Speech today; will expand
    │   ├── typescript/
    │   │   ├── sdk/quickstart/
    │   │   └── native/quickstart/
    │   ├── python/
    │   │   ├── sdk/quickstart/
    │   │   └── native/quickstart/
    │   └── bash/
    │       ├── sdk/.gitkeep        # no bash SDK; placeholder
    │       └── native/.gitkeep     # curl recipes go here
    └── agents/                # Voice Agents (reserved; recipes coming back)
        ├── typescript/{sdk,native}/.gitkeep
        ├── python/{sdk,native}/.gitkeep
        └── bash/{sdk,native}/.gitkeep
```

## Why this shape

- **Product first** reads naturally for a product-led company — a user lands on "audio"
  then picks their language.
- **Flavor as a folder** (`sdk` / `native`) makes the two implementation styles first-class
  and orthogonal to the recipe name. No `-rest` suffix to remember.
- **Self-contained recipes**: each leaf folder has its own manifest, `.env.example`, and
  `README.md` so it can be copied out and run alone.

## Products

| Folder    | What                                        | Status                                      |
| --------- | ------------------------------------------- | ------------------------------------------- |
| `audio/`  | Text-to-Speech, plus future audio products. | Active. TypeScript on v2 SDK, Python on v1. |
| `agents/` | Voice Agents.                               | Namespace reserved; recipes coming back.    |

## Languages and tooling

| Language      | Manager  | Workspace member?                           | Notes                                                                       |
| ------------- | -------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| TypeScript/JS | **pnpm** | Yes — matched by `recipes/*/typescript/*/*` | Run with `tsx`. Versions come from the `catalog:` in `pnpm-workspace.yaml`. |
| Python        | **uv**   | No (managed per-recipe)                     | Each recipe has its own `pyproject.toml`; run with `uv run`.                |
| Bash          | —        | No (curl scripts)                           | Native flavor only. Each recipe is a `.sh` you can copy-paste.              |

## Naming rules

- Folders are **kebab-case**: `audio`, `agents`, `streaming-to-file`.
- Language folders are exactly `typescript`, `python`, or `bash`.
- Flavor folders are exactly `sdk` or `native`.
- Recipe names describe the task, not the API method: `quickstart`, `streaming-to-file`,
  `clone-a-voice`, `phone-call-agent`. No `-rest` / `-sdk` suffix — the parent folder
  encodes the flavor.
- Empty leaf folders (a language with no recipes yet) carry a `.gitkeep` so the namespace
  stays visible.

## Workspace mechanics

- `pnpm install` at the root installs all TypeScript recipes.
- Shared dependency versions live in the **catalog** (`pnpm-workspace.yaml`). Recipes
  reference them as `"@speechify/api": "catalog:"`.
- `pnpm -r <script>` runs a script across every JS recipe; `pnpm --filter <name> <script>`
  targets one.
- Python recipes are intentionally **outside** the pnpm workspace — see
  [`python-recipes.md`](./python-recipes.md).
