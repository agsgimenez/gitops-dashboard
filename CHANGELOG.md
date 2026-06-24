# Changelog

All notable changes to GitOps Dashboard are documented here.

## [1.1.0] — 2026-06-24

### Added

- **Release Status** (`release-status.html`) — per-repo diff between two configurable branches (default `test → main`); detects repos with pending commits and no recent release workflow run. Config bar: source/target branch, workflow name pattern (comma-separated, OR logic), recency window in hours. Skeleton loading per repo; status chips in header.
- **Config Gaps** (`config-gaps.html`) — compares a reference file (`.env.example`, `appsettings.example.json`, YAML, or any custom path) against a GitHub Environment's variable list. Shows present / missing / extra keys without exposing values. Preset buttons for common reference file names; parsers for `.env`, flat JSON (`Section__Key`), and simple YAML.
- **Docker support** — `Dockerfile` + `nginx.conf` + `docker-compose.yml` + `docker-entrypoint.sh`. Generates `config.js` at container start from `GD_PAT` / `GD_REPOS` env vars, or accepts a mounted `config.js` volume. Health check at `/healthz`.
- **Navigation** — 🚀 Releases and 🔍 Config Gaps links added to the header of Dashboard, PR Board, and Env Manager; context (`?ctx=`) is forwarded automatically.

## [1.0.0] — 2026-06-05

### Added

- **Workspace switcher** — full-screen landing with real GitHub avatars; auto-skips picker for single-org configs
- **PR Board** (`prs.html`) — open PRs across all repos with live check run status, labels, reviewers, draft detection; filters: all / failing / ready / draft / needs review
- **Browser notifications** — native OS notification when a running workflow completes (success or failure)
- **Env Manager** (`env-manager.html`) — read variables and secret names from GitHub Environments; add/edit/delete vars; compare against `.env.example`; dynamic environment list loaded from API
- **Multi-page navigation** — `index.html` (home) → `dashboard.html?ctx=<org>` → `prs.html?ctx=<org>` / `env-manager.html?ctx=<org>`; context passed via URL param
- **Workflow dispatch** — trigger `workflow_dispatch` from the dashboard; inputs parsed automatically from YAML
- **Run history modal** — last 10 runs per workflow with status, duration, actor, branch
- **Event-type grouping** — runs grouped by push / pull_request / manual / schedule
- **Auto-refresh** — 30-second countdown with automatic reload
- `config.js` support — skip setup screen when a config file is present
- `scripts/sync-env.sh` — bulk-upload environment variables/secrets via `gh` CLI
