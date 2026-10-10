import http from 'node:http';

export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type, authorization',
  'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS'
};

async function readJson(req) {
  const chunks = []; let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > 1_000_000) throw new HttpError(413, 'Body quá lớn');
    chunks.push(c);
  }
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new HttpError(400, 'JSON không hợp lệ'); }
}

export function createApp(name = 'service') {
  const routes = [];
  const add = (method) => (path, handler) => {
    const keys = [];
    const re = new RegExp('^' + path.replace(/:([a-zA-Z]+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '/?$');
    routes.push({ method, re, keys, handler });
  };
  const send = (res, status, data) => {
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', ...CORS });
    res.end(JSON.stringify(data));
  };
  const handler = async (req, res) => {
    if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
    const url = new URL(req.url, 'http://x');
    try {
      for (const r of routes) {
        const m = r.method === req.method && url.pathname.match(r.re);
        if (!m) continue;
        const params = Object.fromEntries(r.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
        const body = ['POST', 'PUT', 'PATCH'].includes(req.method) ? await readJson(req) : {};
        const out = await r.handler({ req, params, body, query: Object.fromEntries(url.searchParams), headers: req.headers });
        return send(res, out?.status || 200, out?.status ? out.data : out);
      }
      throw new HttpError(404, 'Không tìm thấy');
    } catch (e) {
      if (!(e instanceof HttpError)) console.error(`[${name}]`, e);
      send(res, e.status || 500, { error: e instanceof HttpError ? e.message : 'Lỗi máy chủ' });
    }
  };
  const app = {
    get: add('GET'), post: add('POST'), put: add('PUT'), patch: add('PATCH'), delete: add('DELETE'),
    listen: (port) => new Promise((resolve) => {
      const s = http.createServer(handler).listen(port, () => { console.log(`[${name}] listening on :${s.address().port}`); resolve(s); });
    })
  };
  return app;
}
