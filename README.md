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

| Scope | Used for |
|-------|----------|
| `repo` | Read workflows, environments, variables and secrets |
| `workflow` | Trigger `workflow_dispatch` |

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
- Variables: visible values, editable directly in the UI
- Secrets: names shown as `••••••`, CLI button generates the `gh secret set` command
- Compare with `.env.example` to detect keys declared in the contract but missing in the environment

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
├── index.html            # Home: PAT setup + workspace switcher
├── dashboard.html        # CI dashboard (?ctx=<org>)
├── prs.html              # PR board (?ctx=<org>)
├── env-manager.html      # Environment manager (?ctx=<org>)
├── config.example.js     # Config template
├── config.js             # Your config (gitignored)
├── scripts/
│   └── sync-env.sh       # Bulk upload vars/secrets via gh CLI
├── envs/                 # Local .env files (gitignored)
├── docs/                 # Public landing page (GitHub Pages)
├── LICENSE
└── README.md
```

## License

MIT
