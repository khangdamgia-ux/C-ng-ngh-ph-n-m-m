import crypto from 'node:crypto';
import { createApp, HttpError } from '../../shared/http.js';
import { sign, verify } from '../../shared/token.js';
import { openStore } from '../../shared/store.js';

const hash = (pw, salt = crypto.randomBytes(16).toString('hex')) =>
  `${salt}:${crypto.scryptSync(pw, salt, 64).toString('hex')}`;
const check = (pw, stored) => {
  const [salt, h] = stored.split(':');
  const a = Buffer.from(h, 'hex'), b = crypto.scryptSync(pw, salt, 64);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};
const pub = (u) => ({ username: u.username, role: u.role, locked: u.locked, createdAt: u.createdAt });

export function buildApp({ file, secret, adminUser = 'admin', adminPass = 'admin123' }) {
  const { data, flush } = openStore(file, { users: [] });
  const find = (name) => data.users.find((u) => u.username === name);
  if (!find(adminUser)) {
    data.users.push({ username: adminUser, role: 'admin', locked: false, pass: hash(adminPass), createdAt: new Date().toISOString() });
    flush();
  }
  const app = createApp('auth');

  // Lấy user hiện tại từ token; kiểm tra lại trạng thái khóa/xóa mỗi lần.
  const current = (ctx, role) => {
    const t = verify((ctx.headers.authorization || '').replace(/^Bearer /i, ''), secret);
    const u = t && find(t.sub);
    if (!u || u.locked) throw new HttpError(401, 'Chưa đăng nhập hoặc tài khoản bị khóa');
    if (role && u.role !== role) throw new HttpError(403, 'Không đủ quyền');
    return u;
  };

  app.get('/health', () => ({ ok: true }));

  app.post('/register', ({ body }) => {
    const { username = '', password = '' } = body;
    if (!/^[a-zA-Z0-9_.-]{3,30}$/.test(username)) throw new HttpError(400, 'Tên đăng nhập 3-30 ký tự (chữ, số, _ . -)');
    if (password.length < 6) throw new HttpError(400, 'Mật khẩu tối thiểu 6 ký tự');
    if (find(username)) throw new HttpError(409, 'Tên đăng nhập đã tồn tại');
    const u = { username, role: 'user', locked: false, pass: hash(password), createdAt: new Date().toISOString() };
    data.users.push(u); flush();
    return { status: 201, data: pub(u) };
  });

  app.post('/login', ({ body }) => {
    const u = find(body.username);
    if (!u || !check(String(body.password || ''), u.pass)) throw new HttpError(401, 'Sai tên đăng nhập hoặc mật khẩu');
    if (u.locked) throw new HttpError(403, 'Tài khoản đã bị khóa');
    return { token: sign({ sub: u.username, role: u.role }, secret), user: pub(u) };
  });

  app.get('/me', (ctx) => pub(current(ctx)));
  // Service khác (content) gọi endpoint này để xác thực token.
  app.get('/verify', (ctx) => { const u = current(ctx); return { username: u.username, role: u.role }; });

  app.get('/users', (ctx) => { current(ctx, 'admin'); return data.users.map(pub); });
  app.patch('/users/:username', (ctx) => {
    const me = current(ctx, 'admin'), u = find(ctx.params.username);
    if (!u) throw new HttpError(404, 'Không tìm thấy người dùng');
    if (u.username === me.username) throw new HttpError(400, 'Không thể tự khóa chính mình');
    u.locked = Boolean(ctx.body.locked); flush(); return pub(u);
  });
  app.delete('/users/:username', (ctx) => {
    const me = current(ctx, 'admin');
    if (ctx.params.username === me.username) throw new HttpError(400, 'Không thể tự xóa chính mình');
    if (!find(ctx.params.username)) throw new HttpError(404, 'Không tìm thấy người dùng');
    data.users = data.users.filter((x) => x.username !== ctx.params.username);
    // data là object tham chiếu từ store, gán lại thuộc tính là đủ để flush.
    flush(); return { ok: true };
  });
  return app;
}
