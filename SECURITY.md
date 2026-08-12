# Security policy

GitOps Dashboard runs entirely in the browser and acts with the permissions of
the GitHub token supplied by the user. Security reports are welcome and should
be handled privately.

## Supported versions

| Version | Supported |
| --- | --- |
| Latest release | Yes |
| Older releases | No |

The project is a static application. Fixes are published on the default branch
and included in the next tagged release.

## Report a vulnerability

Use
[GitHub private vulnerability reporting](https://github.com/agsgimenez/gitops-dashboard/security/advisories/new)
when possible. If that channel is unavailable, email
[gimenezagustin98@hotmail.com](mailto:gimenezagustin98@hotmail.com) with the
subject `GitOps Dashboard security report`.

Include the affected page or commit, reproduction steps, expected impact and
any suggested mitigation. Do not open a public issue for an unpatched
vulnerability or include real tokens, repository names or secret values in the
report.

An initial acknowledgement is normally sent within seven days. Confirmed
issues are fixed and disclosed according to severity and exploitability; no
specific remediation deadline is guaranteed.

## Security model

- GitHub API requests go directly from the browser to `api.github.com`.
- The PAT is stored in browser `localStorage` under the current origin. It is
  not encrypted at rest and remains accessible to scripts running on that
  origin.
- The application does not have a backend, telemetry or analytics.
- GitHub secret values are never fetched. The interface only retrieves secret
  names and metadata allowed by the token.
- Workflow dispatches and environment changes are limited by the token's
  scopes and repository access.
- The optional `scripts/sync-env.sh` uses the authenticated GitHub CLI and reads
  local ignored files; it does not pass secret values as command arguments.

## User responsibilities

- Serve the application from a trusted origin. Do not host modified or
  unreviewed scripts alongside it.
- Prefer a dedicated, least-privilege token and limit its lifetime and
  repository access.
- Do not use the application from a shared browser profile or untrusted device.
- Clear the saved token from the settings screen or browser storage when access
  is no longer required, and revoke exposed tokens in GitHub immediately.
- Keep `config.js`, `envs/` and local secret files out of version control.

## Out of scope

- Compromise of the user's browser, extensions, device or hosting origin.
- Actions performed by a token with permissions intentionally granted by its
  owner.
- Availability or behavior of GitHub APIs and the GitHub CLI.
- Reports that require publishing real credentials or accessing repositories
  without authorization.
