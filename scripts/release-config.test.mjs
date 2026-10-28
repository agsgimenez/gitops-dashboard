import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

async function pageContext(file, fetch) {
  const html = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
  const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
  const cells = Array.from({ length: 5 }, () => ({ innerHTML: '' }));
  const context = vm.createContext({
    fetch, URLSearchParams, console,
    window: { CI_CONFIG: { pat: 'fixture_token', repos: ['demo/example'] } },
    localStorage: { getItem: () => null, removeItem: () => {} },
    location: { search: '?ctx=demo', replace: () => {} },
    document: { getElementById: () => ({ innerHTML: '', value: '72', querySelectorAll: () => cells }) },
  });
  vm.runInContext(script.replace(/\ninit\(\);\s*$/, ''), context);
  return { context, cells };
}

test('config parsing returns names without exposing values', async () => {
  const { context } = await pageContext('config-gaps.html');
  assert.deepEqual(Array.from(context.parseEnvFile('# comment\nexport API_KEY=fixture\nPORT: 8080\nAPI_KEY=other')), ['API_KEY', 'PORT']);
  assert.deepEqual(Array.from(context.parseJsonFlat('{"Database":{"Password":"fixture"},"Enabled":true}')), ['Database__Password', 'Enabled']);
  assert.equal(context.detectAndParse('{', 'settings.json').error, 'JSON inválido');
});

test('environment API failures remain errors instead of empty variable lists', async () => {
  const { context } = await pageContext('config-gaps.html', async () => ({ ok: false, status: 403, headers: { get: () => null } }));
  await assert.rejects(context.fetchEnvironments('demo', 'example'), /GitHub 403/);
  await assert.rejects(context.fetchEnvVarNames('demo', 'example', 'dev'), /GitHub 403/);
});

test('failed release workflows are not reported as in progress', async () => {
  const { context, cells } = await pageContext('release-status.html', async (url) => ({
    ok: true, status: 200,
    json: async () => url.includes('/compare/') ? { ahead_by: 2 } : { workflow_runs: [{
      name: 'Release', status: 'completed', conclusion: 'failure',
      created_at: new Date().toISOString(), html_url: 'https://github.com/demo/example/actions/runs/1',
    }] },
  }));
  await context.processRepo('demo', 'example', 'test', 'main', 'release', 72);
  assert.match(cells[4].innerHTML, /Release sin éxito/);
});

test('release API errors stay distinguishable from absent workflow runs', async () => {
  const { context, cells } = await pageContext('release-status.html', async (url) => url.includes('/compare/')
    ? { ok: true, json: async () => ({ ahead_by: 2 }) }
    : { ok: false, status: 403, headers: { get: () => null } });
  await context.processRepo('demo', 'example', 'test', 'main', 'release', 72);
  assert.match(cells[3].innerHTML, /Error al consultar releases/);
  assert.match(cells[4].innerHTML, /No se pudo verificar/);
});
