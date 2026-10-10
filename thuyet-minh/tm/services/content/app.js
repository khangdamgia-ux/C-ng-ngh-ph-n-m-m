import { createApp, HttpError } from '../../shared/http.js';
import { openStore } from '../../shared/store.js';
import { seed } from './seed.js';

export function buildApp({ file, authUrl }) {
  const { data, flush } = openStore(file, seed());
  const app = createApp('content');
  const lang = (c) => data.langs.find((l) => l.code === c);

  // Giao tiếp giữa các service: hỏi auth-service xem token có hợp lệ không.
  async function auth(ctx, role) {
    let r;
    try { r = await fetch(`${authUrl}/verify`, { headers: { authorization: ctx.headers.authorization || '' } }); }
    catch { throw new HttpError(503, 'Auth service không phản hồi'); }
    if (!r.ok) throw new HttpError(401, 'Chưa đăng nhập hoặc tài khoản bị khóa');
    const u = await r.json();
    if (role && u.role !== role) throw new HttpError(403, 'Không đủ quyền');
    return u;
  }

  // FR-05: trả nội dung theo ngôn ngữ; thiếu bản dịch thì dùng tiếng Việt (fallback).
  const localize = (ct, code) => {
    const hit = ct.tr[code], base = ct.tr.vi;
    const t = hit?.title && hit?.body ? hit : base;
    return { id: ct.id, title: t.title, body: t.body, lang: t === hit ? code : 'vi', fallback: t !== hit,
             available: Object.keys(ct.tr), ...(ct.meta || {}) };
  };
  const find = (id) => {
    const ct = data.contents.find((c) => c.id === Number(id));
    if (!ct) throw new HttpError(404, 'Không tìm thấy nội dung');
    return ct;
  };
  const cleanTr = (tr) => {
    if (!tr || typeof tr !== 'object') throw new HttpError(400, 'Thiếu bản dịch');
    const out = {};
    for (const [code, v] of Object.entries(tr)) {
      const title = String(v?.title || '').trim(), body = String(v?.body || '').trim();
      if (!title && !body) continue;
      if (!lang(code)) throw new HttpError(400, `Ngôn ngữ "${code}" chưa được hỗ trợ`);
      if (!title || !body) throw new HttpError(400, `Ngôn ngữ "${code}" cần đủ tiêu đề và nội dung`);
      out[code] = { title, body };
    }
    if (!out.vi) throw new HttpError(400, 'Bắt buộc có bản tiếng Việt (ngôn ngữ gốc)');
    return out;
  };

  // Thông tin địa điểm đi kèm (không phụ thuộc ngôn ngữ): loại, biểu tượng, địa chỉ, tọa độ, giờ mở cửa...
  const cleanMeta = (m = {}) => {
    const out = {};
    for (const k of ['category', 'emoji', 'address', 'hours', 'ticket', 'year']) {
      const v = String(m[k] ?? '').trim().slice(0, 200);
      if (v) out[k] = v;
    }
    for (const k of ['lat', 'lng']) {
      if (m[k] === '' || m[k] == null) continue;
      const n = Number(m[k]);
      if (!Number.isFinite(n) || Math.abs(n) > (k === 'lat' ? 90 : 180)) throw new HttpError(400, `Tọa độ ${k} không hợp lệ`);
      out[k] = n;
    }
    return out;
  };

  app.get('/health', () => ({ ok: true }));

  // ---- Ngôn ngữ ----
  app.get('/languages', () => data.langs);
  app.post('/languages', async (ctx) => {
    await auth(ctx, 'admin');
    const code = String(ctx.body.code || '').trim().toLowerCase(), name = String(ctx.body.name || '').trim();
    if (!/^[a-z]{2,3}(-[a-z]{2,4})?$/.test(code) || !name) throw new HttpError(400, 'Cần mã (vd: fr) và tên ngôn ngữ');
    if (lang(code)) throw new HttpError(409, 'Ngôn ngữ đã tồn tại');
    const l = { code, name, tts: String(ctx.body.tts || code) };
    data.langs.push(l); flush();
    return { status: 201, data: l };
  });
  app.delete('/languages/:code', async (ctx) => {
    await auth(ctx, 'admin');
    if (ctx.params.code === 'vi') throw new HttpError(400, 'Không thể xóa ngôn ngữ gốc (vi)');
    if (!lang(ctx.params.code)) throw new HttpError(404, 'Không tìm thấy ngôn ngữ');
    data.langs = data.langs.filter((l) => l.code !== ctx.params.code);
    for (const c of data.contents) delete c.tr[ctx.params.code];
    flush(); return { ok: true };
  });

  // ---- Nội dung cho người dùng (FR-02, FR-03, FR-05) ----
  app.get('/contents', async (ctx) => {
    await auth(ctx);
    const code = lang(ctx.query.lang) ? ctx.query.lang : 'vi';
    const q = String(ctx.query.q || '').trim().toLowerCase(), cat = String(ctx.query.category || '');
    return data.contents.map((c) => localize(c, code))
      .filter((c) => !cat || c.category === cat)
      .filter((c) => !q || `${c.title} ${c.body} ${c.address || ''}`.toLowerCase().includes(q))
      .map(({ body, available, ...c }) => ({ ...c, summary: body.slice(0, 110) }));
  });
  app.get('/contents/:id', async (ctx) => {
    await auth(ctx);
    return localize(find(ctx.params.id), lang(ctx.query.lang) ? ctx.query.lang : 'vi');
  });
  // Cung cấp dữ liệu âm thanh: văn bản + mã giọng đọc để client đọc (Web Speech API).
  app.get('/contents/:id/audio', async (ctx) => {
    await auth(ctx);
    const c = localize(find(ctx.params.id), lang(ctx.query.lang) ? ctx.query.lang : 'vi');
    return { text: `${c.title}. ${c.body}`, lang: c.lang, tts: lang(c.lang)?.tts || c.lang, fallback: c.fallback };
  });

  // ---- Quản lý nội dung (admin) ----
  app.get('/admin/contents', async (ctx) => { await auth(ctx, 'admin'); return data.contents; });
  app.post('/contents', async (ctx) => {
    await auth(ctx, 'admin');
    const ct = { id: data.nid++, tr: cleanTr(ctx.body.tr), meta: cleanMeta(ctx.body.meta) };
    data.contents.push(ct); flush();
    return { status: 201, data: ct };
  });
  app.put('/contents/:id', async (ctx) => {
    await auth(ctx, 'admin');
    const ct = find(ctx.params.id); ct.tr = cleanTr(ctx.body.tr); ct.meta = cleanMeta(ctx.body.meta); flush(); return ct;
  });
  app.delete('/contents/:id', async (ctx) => {
    await auth(ctx, 'admin');
    const ct = find(ctx.params.id);
    data.contents = data.contents.filter((c) => c !== ct); flush(); return { ok: true };
  });
  return app;
}
