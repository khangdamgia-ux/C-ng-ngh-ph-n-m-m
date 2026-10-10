import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import { buildApp as buildAuth } from '../services/auth/app.js';
import { buildApp as buildContent } from '../services/content/app.js';

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tm-'));
let authSrv, contentSrv, A, C;
const call = async (base, p, { method = 'GET', body, token } = {}) => {
  const r = await fetch(base + p, { method, headers: { 'content-type': 'application/json', ...(token && { authorization: `Bearer ${token}` }) },
    body: body && JSON.stringify(body) });
  return { status: r.status, data: await r.json() };
};

test.before(async () => {
  authSrv = await buildAuth({ file: path.join(dir, 'a.json'), secret: 's3cret' }).listen(0);
  A = `http://localhost:${authSrv.address().port}`;
  contentSrv = await buildContent({ file: path.join(dir, 'c.json'), authUrl: A }).listen(0);
  C = `http://localhost:${contentSrv.address().port}`;
});
test.after(() => { authSrv.close(); contentSrv.close(); });

test('FR-01: đăng ký, đăng nhập, sai mật khẩu, trùng tên', async () => {
  assert.equal((await call(A, '/register', { method: 'POST', body: { username: 'annie', password: '123456' } })).status, 201);
  assert.equal((await call(A, '/register', { method: 'POST', body: { username: 'annie', password: '123456' } })).status, 409);
  assert.equal((await call(A, '/login', { method: 'POST', body: { username: 'annie', password: 'sai-mk' } })).status, 401);
  const ok = await call(A, '/login', { method: 'POST', body: { username: 'annie', password: '123456' } });
  assert.equal(ok.status, 200);
  assert.equal((await call(A, '/me', { token: ok.data.token })).data.username, 'annie');
});

test('FR-02..05: xem, tìm kiếm, chọn ngôn ngữ, fallback, audio', async () => {
  const { data: { token } } = await call(A, '/login', { method: 'POST', body: { username: 'annie', password: '123456' } });
  assert.equal((await call(C, '/contents')).status, 401);
  const all = (await call(C, '/contents?lang=vi', { token })).data;
  assert.equal(all.length, 15);
  assert.ok(all.every((c) => typeof c.lat === 'number' && c.category && c.address), 'mỗi địa điểm có tọa độ, loại, địa chỉ');
  assert.ok((await call(C, '/contents?lang=vi&category=religion', { token })).data.every((c) => c.category === 'religion'));
  assert.equal((await call(C, '/contents/3?lang=en', { token })).data.address, '01 Công xã Paris');
  const ja = (await call(C, '/contents?lang=ja', { token })).data;
  assert.equal(ja.find((c) => c.id === 1).title, 'ベンタイン市場');
  assert.equal(ja.find((c) => c.id === 2).fallback, true);
  const found = (await call(C, '/contents?lang=en&q=cathedral', { token })).data;
  assert.deepEqual(found.map((c) => c.id), [3]);
  const audio = (await call(C, '/contents/1/audio?lang=ko', { token })).data;
  assert.equal(audio.tts, 'ko-KR');
});

test('Quản trị: người dùng thường bị chặn, admin CRUD nội dung/ngôn ngữ/người dùng', async () => {
  const user = (await call(A, '/login', { method: 'POST', body: { username: 'annie', password: '123456' } })).data.token;
  const admin = (await call(A, '/login', { method: 'POST', body: { username: 'admin', password: 'admin123' } })).data.token;
  assert.equal((await call(C, '/contents', { method: 'POST', token: user, body: { tr: {} } })).status, 403);
  assert.equal((await call(C, '/languages', { method: 'POST', token: admin, body: { code: 'fr', name: 'Tiếng Pháp', tts: 'fr-FR' } })).status, 201);
  const created = await call(C, '/contents', { method: 'POST', token: admin, body: { tr: { vi: { title: 'Bưu điện', body: 'Bưu điện Thành phố.' }, fr: { title: 'Poste', body: 'La poste centrale.' } }, meta: { category: 'history', lat: '10.78', lng: 106.7 } } });
  assert.equal(created.data.meta.lat, 10.78);
  assert.equal((await call(C, '/contents', { method: 'POST', token: admin, body: { tr: { vi: { title: 'a', body: 'b' } }, meta: { lat: 999 } } })).status, 400);
  assert.equal(created.status, 201);
  assert.equal((await call(C, '/contents', { method: 'POST', token: admin, body: { tr: { en: { title: 'x', body: 'y' } } } })).status, 400);
  const id = created.data.id;
  assert.equal((await call(C, `/contents/${id}`, { method: 'PUT', token: admin, body: { tr: { vi: { title: 'Bưu điện SG', body: 'Đã sửa.' } } } })).status, 200);
  assert.equal((await call(C, `/contents/${id}`, { method: 'DELETE', token: admin })).status, 200);
  assert.equal((await call(C, `/contents/${id}`, { token: admin })).status, 404);
  assert.equal((await call(C, '/languages/fr', { method: 'DELETE', token: admin })).status, 200);
  // khóa tài khoản có hiệu lực ngay trên service khác
  assert.equal((await call(A, '/users/annie', { method: 'PATCH', token: admin, body: { locked: true } })).status, 200);
  assert.equal((await call(C, '/contents', { token: user })).status, 401);
  assert.equal((await call(A, '/users/annie', { method: 'DELETE', token: admin })).status, 200);
});
