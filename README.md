# GitOps Dashboard

Dashboard estático (HTML puro, sin build ni servidor) para monitorear y operar GitHub Actions workflows desde el browser.

## Páginas

| Archivo | Rol |
|---------|-----|
| `index.html` | Home — setup de PAT + workspace switcher de org/usuario |
| `dashboard.html?ctx=<org>` | Dashboard de CI filtrado al contexto elegido |
| `prs.html?ctx=<org>` | PR Board — PRs abiertos con check runs por repo |
| `env-manager.html?ctx=<org>` | Gestor de variables y secrets de GitHub Environments |

El flujo de navegación es: `index.html` → `dashboard.html?ctx=MyOrg` → `env-manager.html?ctx=MyOrg`.

## Características

- **Workspace switcher**: al abrir `index.html` se muestran los orgs/usuarios con sus avatares reales de GitHub; un click entra directo al dashboard de ese contexto
- **Multi-org**: si el config tiene repos de múltiples owners, el selector aparece; si hay uno solo, entra directo
- **Monitor de workflows**: agrupado por tipo de evento (push, PR, manual, schedule) con chips de estado
- **Historial**: últimas 10 ejecuciones por workflow en un modal
- **Dispatch**: ejecutar workflows con inputs declarados en el YAML, sin salir del dashboard
- **PR Board**: PRs abiertos por repo con check runs en tiempo real (carga progresiva), filtros por failing/ready/draft/needs review
- **Notificaciones del browser**: aviso cuando un workflow en ejecución completa; botón 🔔 en el header para activar
- **Env Manager**: ver variables y secrets de GitHub Environments (environments cargados dinámicamente desde la API), agregar/editar/eliminar variables, generar comandos `gh` CLI para secrets, comparar con `.env.example`
- **Auto-refresh**: countdown de 30 segundos

## Setup

### 1. Configurar repos

Copiá `config.example.js` a `config.js` y editalo:

```js
window.CI_CONFIG = {
  
  repos: [
    // Org 1
    "my-org/repo-a",
    "my-org/repo-b",
    // Org 2
    "another-org/repo-c",
    // Personal
    "my-user/personal-repo",
  ]
};
```

`config.js` está en `.gitignore` — nunca se commitea.

### 2. PAT requerido

Generá un token en [github.com/settings/tokens](https://github.com/settings/tokens) con scopes:

| Scope | Para qué |
|-------|----------|
| `repo` | Leer workflows, environments, variables y secrets |
| `workflow` | Disparar `workflow_dispatch` |

### 3. Abrir

Abrí `index.html` directamente en el browser. No requiere servidor ni `npm install`.

```powershell
start "C:\ruta\gitops-dashboard\index.html"
```

## Env Manager

Desde el dashboard → botón **🔑 Env Manager** (pasa el contexto actual automáticamente).

- **Repo → environments**: al seleccionar un repo los environments se cargan desde la GitHub API (`GET /repos/{owner}/{repo}/environments`)
- **Variables**: valores visibles, editables directo en UI
- **Secrets**: solo se muestran los nombres con `••••••`. Botón **CLI** genera el comando `gh secret set` para copiarlo
- **Comparar con `.env.example`**: detecta keys declaradas en el contrato que faltan en el environment

## Scripts

`scripts/sync-env.sh` — sube un archivo `.env` completo a un GitHub Environment via `gh` CLI:

```bash
./scripts/sync-env.sh <repo> <environment> [envs-dir]
# Lee  envs/.env.<repo>.<environment>         → gh variable set
# Lee  envs/.env.<repo>.<environment>.secrets  → gh secret set
```

Ejemplo:
```bash
./scripts/sync-env.sh my-repo production
```

Los archivos en `envs/` están gitignoreados.

## Estructura

```
gitops-dashboard/
├── index.html            # Home: setup + workspace switcher de org
├── dashboard.html        # CI dashboard (recibe ?ctx=<org>)
├── env-manager.html      # Gestor de environments (recibe ?ctx=<org>)
├── config.example.js     # Template de configuración
├── config.js             # Configuración real (gitignored)
├── scripts/
│   └── sync-env.sh       # Upload bulk vars/secrets via gh CLI
├── envs/                 # Archivos .env locales (gitignored)
├── LICENSE
└── README.md
```

## Licencia

MIT
