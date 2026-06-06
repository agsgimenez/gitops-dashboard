#!/usr/bin/env bash
# =============================================================================
# sync-env.sh — Sincroniza variables de entorno locales → GitHub Environments
# =============================================================================
# Uso:
#   ./scripts/sync-env.sh <repo> <environment>
#
# Ejemplos:
#   ./scripts/sync-env.sh usuarios development
#   ./scripts/sync-env.sh PWA-VUEJS testing
#   ./scripts/sync-env.sh lenoxsolution production
#
# Archivos que lee desde el directorio actual o --env-dir (gitignored localmente):
#   .env.<repo>.<environment>         → vars no sensibles → gh variable set
#   .env.<repo>.<environment>.secrets → vars sensibles    → gh secret set
#
# Prerrequisito: gh CLI autenticado (gh auth status)
#
# Estructura de archivos recomendada en este mismo directorio:
#   envs/
#     .env.usuarios.development
#     .env.usuarios.development.secrets
#     .env.PWA-VUEJS.testing
#     ...  (todos gitignored via .gitignore)
# =============================================================================
set -euo pipefail

ORG="LenoxHR"
REPO="${1:-}"
ENVIRONMENT="${2:-}"
ENV_DIR="${3:-envs}"   # carpeta donde buscar los archivos

# --- Validar argumentos ---
if [[ -z "$REPO" || -z "$ENVIRONMENT" ]]; then
  echo "Uso: $0 <repo> <environment> [env-dir]"
  echo ""
  echo "Repos disponibles:"
  echo "  usuarios, PWA-VUEJS, MaynarCheckpoint, lenoxsolution, ci-workflow"
  echo ""
  echo "Environments disponibles:"
  echo "  development, testing, production"
  exit 1
fi

case "$ENVIRONMENT" in
  development) GH_ENV="Development" ;;
  testing)     GH_ENV="Testing" ;;
  production)  GH_ENV="Production" ;;
  *)
    echo "ERROR: environment inválido '${ENVIRONMENT}'. Opciones: development | testing | production"
    exit 1
    ;;
esac

FULL_REPO="${ORG}/${REPO}"
VARS_FILE="${ENV_DIR}/.env.${REPO}.${ENVIRONMENT}"
SECRETS_FILE="${ENV_DIR}/.env.${REPO}.${ENVIRONMENT}.secrets"

# --- Verificar gh CLI ---
if ! command -v gh &>/dev/null; then
  echo "ERROR: gh CLI no encontrado. Instalar: https://cli.github.com"
  exit 1
fi

if ! gh auth status &>/dev/null; then
  echo "ERROR: gh CLI no autenticado. Correr: gh auth login"
  exit 1
fi

# --- Función de carga ---
upload_entries() {
  local file="$1"
  local mode="$2"   # var | secret
  local count=0
  local skipped=0

  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ "$line" =~ ^[[:space:]]*# ]] && continue
    [[ -z "${line//[[:space:]]/}" ]] && continue

    key="${line%%=*}"
    value="${line#*=}"
    [[ -z "$key" ]] && continue

    if [[ -z "$value" ]]; then
      echo "  SKIP (vacío): $key"
      ((skipped++)) || true
      continue
    fi

    if [[ "$mode" == "secret" ]]; then
      gh secret set "$key" --env "$GH_ENV" --repo "$FULL_REPO" --body "$value"
      echo "  [secret] ✓ $key"
    else
      gh variable set "$key" --env "$GH_ENV" --repo "$FULL_REPO" --body "$value"
      echo "  [var]    ✓ $key"
    fi
    ((count++)) || true
  done < "$file"

  echo "  → $count subidos, $skipped saltados (valor vacío)"
}

echo ""
echo "=========================================="
echo " Repo:        $FULL_REPO"
echo " Environment: $GH_ENV"
echo "=========================================="

# --- Vars no sensibles ---
if [[ -f "$VARS_FILE" ]]; then
  echo ""
  echo "--- Variables (vars.*) desde $VARS_FILE ---"
  upload_entries "$VARS_FILE" "var"
else
  echo ""
  echo "SKIP: $VARS_FILE no existe"
  echo "  Crealo con los valores y volvé a correr:"
  echo "  cp <repo>/.env.example ${VARS_FILE}"
fi

# --- Secrets ---
if [[ -f "$SECRETS_FILE" ]]; then
  echo ""
  echo "--- Secrets (secrets.*) desde $SECRETS_FILE ---"
  upload_entries "$SECRETS_FILE" "secret"
else
  echo ""
  echo "SKIP: $SECRETS_FILE no existe (sin secrets para este env)"
fi

echo ""
echo "✓ Listo. Verificar en:"
echo "  https://github.com/${FULL_REPO}/settings/environments"
echo ""
