import { readFile } from 'node:fs/promises';
import { createInterface } from 'node:readline';

const ticket = await readFile(new URL('../docs/regle-livraison.txt', import.meta.url), 'utf8');
const tool = {
  name: 'lire_fiche',
  description: 'Lit le contenu de la fiche fictive CATALOGUE-12.',
  inputSchema: {
    type: 'object',
    properties: { identifiant: { type: 'string', enum: ['CATALOGUE-12'] } },
    required: ['identifiant'],
    additionalProperties: false
  },
  annotations: { readOnlyHint: true, openWorldHint: false }
};

const lines = createInterface({ input: process.stdin, crlfDelay: Infinity });
function send(message) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', ...message }) + '\n');
}

for await (const line of lines) {
  let request;
  try {
    request = JSON.parse(line);
  } catch {
    send({ id: null, error: { code: -32700, message: 'JSON invalide' } });
    continue;
  }
  if (!request || request.jsonrpc !== '2.0' || typeof request.method !== 'string') {
    send({ id: request?.id ?? null, error: { code: -32600, message: 'Requête invalide' } });
    continue;
  }
  const { id, method, params } = request;
  if (id === undefined) continue;

  switch (method) {
    case 'initialize':
      send({
        id,
        result: {
          protocolVersion: '2025-11-25',
          serverInfo: { name: 'catalogue-livraison', version: '1.0.0' },
          capabilities: { tools: {} }
        }
      });
      break;
    case 'ping':
      send({ id, result: {} });
      break;
    case 'tools/list':
      send({ id, result: { tools: [tool] } });
      break;
    case 'tools/call':
      if (params?.name !== tool.name || params.arguments?.identifiant !== 'CATALOGUE-12') {
        send({ id, error: { code: -32602, message: 'Outil ou identifiant inconnu' } });
        break;
      }
      send({ id, result: { content: [{ type: 'text', text: ticket }] } });
      break;
    default:
      send({ id, error: { code: -32601, message: 'Méthode inconnue' } });
  }
}
