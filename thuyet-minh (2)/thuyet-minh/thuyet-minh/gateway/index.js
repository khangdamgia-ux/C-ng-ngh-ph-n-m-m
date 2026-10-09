import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AUTH = process.env.AUTH_URL || 'http://localhost:4001';
const CONTENT = process.env.CONTENT_URL || 'http://localhost:4002';
const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };

async function proxy(req, res, base, rest) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const headers = { 'content-type': req.headers['content-type'] || 'application/json' };
  if (req.headers.authorization) headers.authorization = req.headers.authorization;
  try {
    const r = await fetch(base + rest, { method: req.method, headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks) });
    res.writeHead(r.status, { 'content-type': r.headers.get('content-type') || 'application/json' });
    res.end(Buffer.from(await r.arrayBuffer()));
  } catch {
    res.writeHead(502, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'Service không phản hồi' }));
  }
}

http.createServer((req, res) => {
  const url = req.url || '/';
  let m;
  if ((m = url.match(/^\/api\/auth(\/.*)$/))) return proxy(req, res, AUTH, m[1]);
  if ((m = url.match(/^\/api\/content(\/.*)$/))) return proxy(req, res, CONTENT, m[1]);
  const p = path.normalize(decodeURIComponent(url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const file = path.join(PUBLIC, p === path.sep || p === '.' ? 'index.html' : p);
  if (!file.startsWith(PUBLIC) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); return res.end('Not found');
  }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(Number(process.env.PORT) || 4000, () => console.log('[gateway] http://localhost:' + (process.env.PORT || 4000)));
