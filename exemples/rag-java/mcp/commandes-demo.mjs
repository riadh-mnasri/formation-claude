import { createInterface } from 'node:readline';

const orders = new Map([
  ['DEMO-103', { commande: 'DEMO-103', statut: 'expédiée', source: 'jeu de démonstration' }]
]);
const tool = {
  name: 'lire_statut_commande',
  description: 'Lit le statut d’une commande fictive sans modifier la commande.',
  inputSchema: {
    type: 'object',
    properties: { identifiant: { type: 'string', pattern: '^DEMO-[0-9]{3}$' } },
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
          serverInfo: { name: 'commandes-demo', version: '1.0.0' },
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
      if (params?.name !== tool.name || !/^DEMO-[0-9]{3}$/.test(params.arguments?.identifiant ?? '')) {
        send({ id, error: { code: -32602, message: 'Outil ou identifiant inconnu' } });
        break;
      }
      const order = orders.get(params.arguments.identifiant);
      send({ id, result: {
        content: [{ type: 'text', text: order ? JSON.stringify(order) : 'Commande fictive inconnue.' }],
        isError: !order
      } });
      break;
    default:
      send({ id, error: { code: -32601, message: 'Méthode inconnue' } });
  }
}
