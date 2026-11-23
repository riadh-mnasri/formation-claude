import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const call = (id, identifiant) => ({
  jsonrpc: '2.0', id, method: 'tools/call',
  params: { name: 'lire_statut_commande', arguments: { identifiant } }
});
const requests = [
  { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'verifier', version: '1' } } },
  { jsonrpc: '2.0', method: 'notifications/initialized' },
  { jsonrpc: '2.0', id: 2, method: 'tools/list' },
  call(3, 'DEMO-103'),
  call(4, 'DEMO-999')
];
const run = spawnSync(process.execPath, [fileURLToPath(new URL('commandes-demo.mjs', import.meta.url))], {
  input: requests.map(request => JSON.stringify(request)).join('\n') + '\n',
  encoding: 'utf8'
});
assert.equal(run.status, 0, run.stderr);
const [init, tools, known, missing] = run.stdout.trim().split('\n').map(JSON.parse);
assert.equal(init.result.serverInfo.name, 'commandes-demo');
assert.equal(tools.result.tools[0].annotations.readOnlyHint, true);
assert.deepEqual(JSON.parse(known.result.content[0].text), {
  commande: 'DEMO-103', statut: 'expédiée', source: 'jeu de démonstration'
});
assert.equal(missing.result.isError, true);
assert.equal(missing.result.content[0].text, 'Commande fictive inconnue.');
console.log('Lecture MCP en local · données fictives');
console.log('DEMO-103 : expédiée');
console.log('DEMO-999 : commande inconnue');
