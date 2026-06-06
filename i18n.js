window.I18N = {
  es: {
    nav_home: '← Inicio',
    nav_dashboard: '← GitOps Dashboard',

    setup_desc: 'Conecta tu GitHub PAT para ver y disparar workflows desde el browser.',
    setup_pat_label: 'GitHub Personal Access Token',
    setup_repos_label: 'Repositorios (uno por línea, owner/repo)',
    setup_submit: 'Acceder',
    setup_required: 'PAT y repos son requeridos',
    setup_pat_hint: 'Scopes: <code>repo</code> + <code>workflow</code>. <a href="https://github.com/settings/tokens/new" target="_blank">Generar →</a>',
    setup_repos_placeholder: 'LenoxHR/ci-workflow\nmy-org/repo',

    picker_heading: '¿Desde dónde trabajás hoy?',
    picker_loading: 'Cargando…',
    picker_all: 'Todos',

    filter_all: 'Todos',
    filter_failure: '❌ Fallos',
    filter_running: '🔄 Corriendo',
    filter_dispatch: '▶ Manuales',
    filter_schedule: '⏰ Scheduled',
    filter_failing: '❌ Failing checks',
    filter_ready: '✅ Ready to merge',
    filter_draft: '📝 Draft',
    filter_review: '👀 Necesitan review',

    loading: 'Cargando…',
    refresh: '↻ Refresh',
    no_repos: 'Sin repos. Configurá en ⚙.',
    no_runs: 'Sin runs para este filtro.',
    chips: '{repos} repos · {total} workflows',

    btn_history: '📋 Historial',
    btn_run: '▶ Ejecutar',
    btn_cancel: 'Cancelar',
    btn_submit: 'Ejecutar',
    btn_submitting: 'Ejecutando…',
    btn_saving: 'Guardando…',
    btn_view: '↗ Ver',

    dm_title: 'Ejecutar — {name}',
    dm_loading: 'Detectando parámetros…',
    dm_no_inputs: 'Este workflow no declara inputs de dispatch.<br>Solo se enviará el <strong>ref</strong>.',
    dm_ref_label: 'Branch / Tag (ref)',
    dm_ref_required: 'El ref es requerido',
    dm_success: '✅ Workflow disparado en {ref}',
    dm_error: 'Error: {msg}',

    hm_title: 'Historial — {name}',
    hm_loading: 'Cargando…',
    hm_empty: 'Sin ejecuciones',
    hm_error: 'Error: {msg}',

    th_run: 'Run', th_status: 'Estado', th_branch: 'Branch',
    th_actor: 'Actor', th_duration: 'Duración', th_ago: 'Hace',
    th_num: '#', th_title_col: 'Título', th_author: 'Autor',
    th_checks: 'Checks', th_reviewers: 'Reviewers', th_updated: 'Actualizado',
    th_actions: 'Acciones', th_workflow: 'Workflow',

    pr_loading: 'Cargando PRs…',
    pr_none: 'No hay PRs abiertos.',
    pr_none_filter: 'Sin PRs para este filtro.',
    pr_count: '{n} PR{s} abierto{s}',
    pr_failing: '❌ {n} con fallos',
    pr_ready: '✅ {n} listo{s}',
    checks_failing: '❌ {n} fallo{s}',
    checks_running: '🔄 {n} corriendo',
    checks_ok: '✅ {n}',

    settings_title: 'Configuración',
    settings_pat: 'GitHub PAT',
    settings_repos: 'Repositorios',
    settings_save: 'Guardar y recargar',
    settings_reset: 'Resetear configuración',
    settings_reset_confirm: '¿Borrar configuración?',
    settings_required: 'PAT y repos son requeridos',

    env_no_pat: '⚠ Sin PAT configurado. Abrí el GitOps Dashboard primero.',
    env_no_selection: 'Sin selección',
    env_loading_envs: '— Cargando... —',
    env_no_envs: '— Sin environments —',
    env_env_placeholder: '— Environment —',
    env_repo_placeholder: '— Repo —',
    env_load_btn: 'Cargar vars',
    env_compare_btn: 'Comparar con .env.example',
    env_vars_title: 'Variables del Environment',
    env_empty: 'Seleccioná un repo y environment para ver las variables.',
    env_no_vars: 'Sin variables ni secrets en este environment.',
    env_add_title: 'Nueva variable',
    env_key_label: 'Nombre',
    env_val_label: 'Valor',
    env_val_hint: 'Las variables son visibles en logs. Para secretos usá la sección de abajo.',
    env_add_btn: 'Agregar variable',
    env_cli_title: 'Comandos gh CLI',
    env_tab_vars: 'Variables',
    env_tab_secrets: 'Secrets',
    env_tab_bulk: 'Bulk desde archivo',
    env_cli_copy: 'Copiar',
    env_compare_title: 'Comparación con .env.example',
    env_missing_badge: '{n} faltante{s}',
    env_no_required: 'No se encontraron vars requeridas en .env.example.',
    env_compare_loading: 'Cargando .env.example…',
    env_compare_error: 'Error: {msg}',
    env_no_envs_toast: '⚠ Este repo no tiene GitHub Environments configurados',
    env_name_req: '⚠ Nombre requerido',
    env_updated: 'Actualizada',
    env_created: 'Creada',
    env_deleted: '🗑 Eliminad{o}: {name}',
    env_edit_title: 'Editar: {name}',
    env_edit_key_label: 'Nombre',
    env_edit_val_label: 'Nuevo valor',
    env_edit_submit: 'Guardar',
    env_delete_modal_title: 'Eliminar variable',
    env_delete_irreversible: 'Esta acción no se puede deshacer.',
    env_delete_submit: 'Eliminar',
    env_cli_vars_placeholder: '# completá los campos para generar el comando',
    env_cli_secrets_placeholder: '# completá el nombre para generar el comando',
    env_cli_bulk_placeholder: '# seleccioná repo y environment arriba para generar',
    env_secrets_hint: 'Los secrets se encriptan con libsodium — no se pueden setear desde el browser. Usá este comando en terminal.',
    env_bulk_hint: 'Usá <code style="background:var(--s2);padding:1px 4px;border-radius:3px">scripts/sync-env.sh</code> desde la raíz del gitops-dashboard para subir un archivo entero:',
    env_th_name: 'Nombre', env_th_value: 'Valor', env_th_updated: 'Actualizada',
    compare_ok: '✓ ok', compare_missing: '✗ faltante', compare_extra: 'extra',
    copied: '📋 Copiado al portapapeles',
  },
  en: {
    nav_home: '← Home',
    nav_dashboard: '← GitOps Dashboard',

    setup_desc: 'Connect your GitHub PAT to monitor and trigger workflows from the browser.',
    setup_pat_label: 'GitHub Personal Access Token',
    setup_repos_label: 'Repositories (one per line, owner/repo)',
    setup_submit: 'Sign in',
    setup_required: 'PAT and repos are required',
    setup_pat_hint: 'Scopes: <code>repo</code> + <code>workflow</code>. <a href="https://github.com/settings/tokens/new" target="_blank">Generate →</a>',
    setup_repos_placeholder: 'LenoxHR/ci-workflow\nmy-org/repo',

    picker_heading: 'Where are you working today?',
    picker_loading: 'Loading…',
    picker_all: 'All',

    filter_all: 'All',
    filter_failure: '❌ Failures',
    filter_running: '🔄 Running',
    filter_dispatch: '▶ Manual',
    filter_schedule: '⏰ Scheduled',
    filter_failing: '❌ Failing checks',
    filter_ready: '✅ Ready to merge',
    filter_draft: '📝 Draft',
    filter_review: '👀 Needs review',

    loading: 'Loading…',
    refresh: '↻ Refresh',
    no_repos: 'No repos. Configure in ⚙.',
    no_runs: 'No runs for this filter.',
    chips: '{repos} repos · {total} workflows',

    btn_history: '📋 History',
    btn_run: '▶ Run',
    btn_cancel: 'Cancel',
    btn_submit: 'Run',
    btn_submitting: 'Running…',
    btn_saving: 'Saving…',
    btn_view: '↗ View',

    dm_title: 'Run — {name}',
    dm_loading: 'Detecting parameters…',
    dm_no_inputs: 'This workflow has no dispatch inputs.<br>Only the <strong>ref</strong> will be sent.',
    dm_ref_label: 'Branch / Tag (ref)',
    dm_ref_required: 'Ref is required',
    dm_success: '✅ Workflow triggered on {ref}',
    dm_error: 'Error: {msg}',

    hm_title: 'History — {name}',
    hm_loading: 'Loading…',
    hm_empty: 'No runs',
    hm_error: 'Error: {msg}',

    th_run: 'Run', th_status: 'Status', th_branch: 'Branch',
    th_actor: 'Actor', th_duration: 'Duration', th_ago: 'Ago',
    th_num: '#', th_title_col: 'Title', th_author: 'Author',
    th_checks: 'Checks', th_reviewers: 'Reviewers', th_updated: 'Updated',
    th_actions: 'Actions', th_workflow: 'Workflow',

    pr_loading: 'Loading PRs…',
    pr_none: 'No open PRs.',
    pr_none_filter: 'No PRs for this filter.',
    pr_count: '{n} open PR{s}',
    pr_failing: '❌ {n} failing',
    pr_ready: '✅ {n} ready',
    checks_failing: '❌ {n} failure{s}',
    checks_running: '🔄 {n} running',
    checks_ok: '✅ {n}',

    settings_title: 'Settings',
    settings_pat: 'GitHub PAT',
    settings_repos: 'Repositories',
    settings_save: 'Save and reload',
    settings_reset: 'Reset configuration',
    settings_reset_confirm: 'Delete configuration?',
    settings_required: 'PAT and repos are required',

    env_no_pat: '⚠ No PAT configured. Open GitOps Dashboard first.',
    env_no_selection: 'No selection',
    env_loading_envs: '— Loading... —',
    env_no_envs: '— No environments —',
    env_env_placeholder: '— Environment —',
    env_repo_placeholder: '— Repo —',
    env_load_btn: 'Load vars',
    env_compare_btn: 'Compare with .env.example',
    env_vars_title: 'Environment Variables',
    env_empty: 'Select a repo and environment to see variables.',
    env_no_vars: 'No variables or secrets in this environment.',
    env_add_title: 'New variable',
    env_key_label: 'Name',
    env_val_label: 'Value',
    env_val_hint: 'Variables are visible in logs. Use the secrets section below for sensitive values.',
    env_add_btn: 'Add variable',
    env_cli_title: 'gh CLI commands',
    env_tab_vars: 'Variables',
    env_tab_secrets: 'Secrets',
    env_tab_bulk: 'Bulk from file',
    env_cli_copy: 'Copy',
    env_compare_title: 'Compare with .env.example',
    env_missing_badge: '{n} missing',
    env_no_required: 'No required vars found in .env.example.',
    env_compare_loading: 'Loading .env.example…',
    env_compare_error: 'Error: {msg}',
    env_no_envs_toast: '⚠ This repo has no GitHub Environments configured',
    env_name_req: '⚠ Name required',
    env_updated: 'Updated',
    env_created: 'Created',
    env_deleted: '🗑 Deleted {o}: {name}',
    env_edit_title: 'Edit: {name}',
    env_edit_key_label: 'Name',
    env_edit_val_label: 'New value',
    env_edit_submit: 'Save',
    env_delete_modal_title: 'Delete variable',
    env_delete_irreversible: 'This action cannot be undone.',
    env_delete_submit: 'Delete',
    env_cli_vars_placeholder: '# fill in the fields to generate the command',
    env_cli_secrets_placeholder: '# fill in the name to generate the command',
    env_cli_bulk_placeholder: '# select a repo and environment above to generate',
    env_secrets_hint: 'Secrets are encrypted with libsodium — they cannot be set from the browser. Use this command in a terminal.',
    env_bulk_hint: 'Use <code style="background:var(--s2);padding:1px 4px;border-radius:3px">scripts/sync-env.sh</code> from the gitops-dashboard root to upload a full env file:',
    env_th_name: 'Name', env_th_value: 'Value', env_th_updated: 'Updated',
    compare_ok: '✓ ok', compare_missing: '✗ missing', compare_extra: 'extra',
    copied: '📋 Copied to clipboard',
  },
};

const LS_LANG = 'gd_lang';

function getLang() { return localStorage.getItem(LS_LANG) || 'es'; }

function t(key, vars = {}) {
  const lang = getLang();
  let s = window.I18N?.[lang]?.[key] ?? window.I18N?.en?.[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

function toggleLang() {
  localStorage.setItem(LS_LANG, getLang() === 'es' ? 'en' : 'es');
  location.reload();
}

function applyI18n() {
  document.documentElement.lang = getLang();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n);
    if (el.dataset.i18nHtml !== undefined) el.innerHTML = val;
    else el.textContent = val;
  });
  const btn = document.getElementById('lang-btn');
  if (!btn) return;
  const lang = getLang();
  btn.innerHTML = lang === 'es'
    ? '<strong>ES</strong>&thinsp;|&thinsp;<span style="opacity:.45">EN</span>'
    : '<span style="opacity:.45">ES</span>&thinsp;|&thinsp;<strong>EN</strong>';
}
