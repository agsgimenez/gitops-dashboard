# Contributing to GitOps Dashboard

Thanks for taking the time to contribute!

## How to contribute

### Reporting bugs

Open an [issue](https://github.com/agsgimenez/gitops-dashboard/issues/new?template=bug_report.md) and include:

- Browser and OS
- Steps to reproduce
- Expected vs actual behavior
- Console errors (F12 → Console)

### Suggesting features

Open an [issue](https://github.com/agsgimenez/gitops-dashboard/issues/new?template=feature_request.md) with a clear description of the problem it solves.

### Branch naming

| Prefix | Use for |
|--------|---------|
| `feature/` | New functionality |
| `fix/` | Bug corrections |
| `docs/` | Documentation only |

Examples: `feature/env-comparison`, `fix/workflow-dispatch-modal`, `docs/screenshots`

### Submitting a PR

1. Fork the repo and create a branch using the naming convention above
2. Make your changes — the project is plain HTML/CSS/JS, no build step
3. Test by opening the files directly in a browser
4. Open a pull request against `main` — CI must pass before merging

## Project structure

```text
gitops-dashboard/
├── index.html              # Home: Workspace switcher + PAT setup
├── dashboard.html          # CI workflow monitor (reads ?ctx= from URL)
├── prs.html                # PR Board with live check runs
├── env-manager.html        # GitHub Environment variable/secret manager
├── release-status.html     # Branch diff + release workflow detection
├── config-gaps.html        # Reference file vs GitHub Environment gap checker
├── config.example.js       # Config template (copy to config.js to use)
├── Dockerfile              # nginx:alpine container image
├── docker-compose.yml      # Compose setup (port 8081)
├── docker-entrypoint.sh    # Generates config.js from env vars at start
├── nginx.conf              # nginx static file server config
├── scripts/
│   └── sync-env.sh         # Bulk-upload env vars via gh CLI
└── docs/
    └── index.html          # Public landing page
```

## Style guide

- **No frameworks or build tools** — keep it plain HTML/CSS/JS
- **No external CDN dependencies** — no scripts loaded from third parties
- **Consistent dark theme** — use the CSS custom properties defined at `:root`
- **Minified-style JS is fine** — the existing code uses compact formatting to keep files small
- All GitHub API calls go through `ghGet()` / `ghPost()` / `ghPatch()` / `ghDelete()`

## PAT scopes required for testing

| Scope | Used by |
|-------|---------|
| `repo` | Workflows, environments, variables, secrets, PRs |
| `workflow` | Dispatching `workflow_dispatch` |

## License

By contributing you agree your work will be released under the [MIT License](LICENSE).
