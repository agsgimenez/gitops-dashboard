#!/bin/sh
set -e

# Generate config.js from environment variables if GD_REPOS is set.
# GD_PAT  — GitHub Personal Access Token (optional; user can enter it in the browser instead)
# GD_REPOS — Comma or newline-separated list of owner/repo entries
#
# WARNING: if GD_PAT is set it will be written to config.js on disk inside the container.
#          Only use this behind a firewall / on localhost.

if [ -n "$GD_REPOS" ]; then
  REPOS_JS=""
  # Support both comma-separated and newline-separated
  NORMALIZED=$(echo "$GD_REPOS" | tr ',' '\n')
  while IFS= read -r line; do
    line=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    [ -z "$line" ] && continue
    [ "${line#\#}" != "$line" ] && continue  # skip comment lines
    REPOS_JS="${REPOS_JS}    \"${line}\",\n"
  done << EOF
$NORMALIZED
EOF

  PAT_LINE=""
  if [ -n "$GD_PAT" ]; then
    PAT_LINE="  pat: \"${GD_PAT}\","
  fi

  printf 'window.CI_CONFIG = {\n%s\n  repos: [\n%s  ]\n};\n' \
    "$PAT_LINE" \
    "$(printf '%b' "$REPOS_JS")" \
    > /usr/share/nginx/html/config.js

  echo "[entrypoint] config.js generated from environment variables (${#} entries)"
fi

exec nginx -g 'daemon off;'
