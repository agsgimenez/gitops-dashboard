# GitOps Dashboard

Too many tabs open to monitor GitHub Actions across multiple orgs? GitOps Dashboard gives you a single pane of glass for your GitHub operations — workflows, PRs, environments — without leaving the browser.

- Monitor CI workflows across all your repos and orgs
- Trigger `workflow_dispatch` with declared inputs, without leaving the dashboard
- Track open PRs with live check runs and reviewer status
- Manage GitHub Environment variables and secrets from a visual UI
- No backend. No build step. No install required.

Built with plain HTML, CSS and JavaScript. Runs directly in the browser.

## Screenshots

> _Add screenshots after setup_

| Dashboard | PR Board | Env Manager |
|-----------|----------|-------------|
| ![Dashboard](docs/dashboard.png) | ![PR Board](docs/pr-board.png) | ![Env Manager](docs/env-manager.png) |

## Pages

| File | Role |
|------|------|
| `index.html` | Home — PAT setup + workspace switcher |
| `dashboard.html?ctx=<org>` | CI dashboard filtered to selected context |
| `prs.html?ctx=<org>` | PR Board — open PRs with live check runs |
| `env-manager.html?ctx=<org>` | GitHub Environments variable and secret manager |
| `release-status.html?ctx=<org>` | Branch diff + release workflow detection per repo |
| `config-gaps.html?ctx=<org>` | Reference file vs GitHub Environment variable gap checker |

## Setup

### 1. Clone and configure repos

Copy `config.example.js` to `config.js` and list your repos:

```js
window.CI_CONFIG = {
  repos: [
    "my-org/repo-a",
    "my-org/repo-b",
    "another-org/repo-c",
    "my-user/personal-repo",
  ]
};
```

`config.js` is in `.gitignore` — it is never committed.

### 2. Generate a GitHub PAT

Go to [github.com/settings/tokens](https://github.com/settings/tokens) and create a token with:

| Scope | Required | Used for |
|-------|----------|----------|
| `repo` | ✅ Yes | Read workflows, environments, repo-level and env-level variables/secrets |
| `workflow` | ✅ Yes | Trigger `workflow_dispatch` |
| `admin:org` (read) | ⚠ Optional | Show org-level variables and secrets in the Env Manager. Without it the org section displays a "no access" notice but the rest still works. |

The token is entered once in the UI and stored in your browser's `localStorage`. It is never written to any file.

### 3. Open

Open `index.html` directly in the browser — no server, no `npm install`.

```powershell
start "C:\path\to\gitops-dashboard\index.html"
```

## Features

### Workflow Dashboard

- Workspace switcher: pick an org or user to scope the dashboard; real GitHub avatars load automatically
- Workflows grouped by trigger type (push, PR, manual, schedule) with status chips
- Filter by actor: after data loads a pill row appears with every user who triggered a run — click one to scope the view
- Run history modal — last 10 executions per workflow
- Dispatch: run `workflow_dispatch` workflows with their declared inputs
- Browser notifications: get an OS alert when a running workflow completes (🔔 toggle in header)
- Auto-refresh every 30 seconds

### PR Board

- All open PRs across your repos in one view
- Check runs load progressively in the background — PRs appear immediately
- Filter by status: failing checks / ready to merge / draft / needs review
- Filter by user: pill row shows every author and requested reviewer — select one to see only PRs that involve them
- Shows labels (with real colors), reviewer avatars, and `head → base` branch flow

### Environment Manager

- Environments loaded dynamically from the GitHub API — no hardcoded list
- **Multi-scope view**: variables and secrets shown in three sections — org, repo, and environment — so you see the full effective config, not just one level
- Override indicators (`↑org`, `↑repo`) flag keys that exist at a lower scope and are being overridden
- Variables: visible values, editable directly in the UI (env-level only)
- Secrets: names shown as `••••••`, CLI button generates the `gh secret set` command
- Compare with `.env.example` to detect keys declared in the contract but missing in the environment
- Org-level section requires `admin:org` PAT scope; shows a clear notice if absent

### Release Status

- Per-repo comparison between two configurable branches (default `test → main`) using the GitHub compare API
- Detects repos with pending commits that have no recent release workflow run
- Workflow name matching by substring, supports multiple comma-separated patterns (e.g. `prepare release, publish releases`)
- Status: ✅ Synchronized / ⚠️ Release prepared · pending merge / ⏳ In progress / 🔴 Pending release
- Config: source branch, target branch, workflow name pattern, recency window in hours

### Config Gaps

- Select a repo, a reference file path, and optionally a GitHub Environment
- Supported formats: `.env` (`KEY=value`), flat JSON (flattened to `Section__Key`), simple YAML
- Compares declared keys against environment variable names — **values are never fetched or displayed**
- Shows: ✓ present / ✗ missing / ∞ extra in environment
- Preset buttons for `.env.example`, `appsettings.example.json`, `.env.template`

## Docker

Run the dashboard as a container — useful for LAN access without keeping a browser tab open as a server.

```bash
# Option A: pass config via environment variables
GD_PAT=ghp_xxx GD_REPOS="my-org/repo-a,my-org/repo-b" docker compose up -d

# Option B: mount your existing config.js (recommended — PAT never written to env)
# Edit docker-compose.yml to uncomment the volumes section, then:
docker compose up -d
```

Runs on port `8081` by default. Change the port mapping in `docker-compose.yml` if needed.

Health check available at `http://localhost:8081/healthz`.

> **Note:** If using `GD_PAT`, the token is written to `config.js` on the container's filesystem. Only use this behind a firewall or on localhost.

## Security

GitOps Dashboard has no backend. All GitHub API requests run directly from your browser using the PAT you provide.

- Your token is stored in `localStorage` only — never written to files, never sent to any third-party service
- No telemetry, no analytics, no external requests beyond `api.github.com` and `github.com` (avatars)
- Open source — you can read every line before running it
- `workflow_dispatch` is gated by the `workflow` scope; you control which token you create and what scopes you grant
- Secrets values are never fetched — only names are retrieved via the GitHub API

## Scripts

`scripts/sync-env.sh` uploads a local `.env` file to a GitHub Environment via the `gh` CLI:

```bash
./scripts/sync-env.sh <owner/repo> <environment> [envs-dir]
# Reads  envs/.env.<repo>.<environment>          → gh variable set
# Reads  envs/.env.<repo>.<environment>.secrets   → gh secret set
```

Files in `envs/` are gitignored.

## Project structure

```text
gitops-dashboard/
├── index.html              # Home: PAT setup + workspace switcher
├── dashboard.html          # CI dashboard (?ctx=<org>)
├── prs.html                # PR board (?ctx=<org>)
├── env-manager.html        # Environment manager (?ctx=<org>)
├── release-status.html     # Branch diff + release workflow status (?ctx=<org>)
├── config-gaps.html        # Reference file vs GitHub Environment gap checker (?ctx=<org>)
├── config.example.js       # Config template
├── config.js               # Your config (gitignored)
├── Dockerfile              # nginx:alpine image
├── docker-compose.yml      # Compose with port 8081 and volume/env config
├── docker-entrypoint.sh    # Generates config.js from GD_PAT / GD_REPOS at start
├── nginx.conf              # Static file server config
├── scripts/
│   └── sync-env.sh         # Bulk upload vars/secrets via gh CLI
├── envs/                   # Local .env files (gitignored)
├── docs/                   # Public landing page (GitHub Pages)
├── LICENSE
└── README.md
```

## License

MIT
