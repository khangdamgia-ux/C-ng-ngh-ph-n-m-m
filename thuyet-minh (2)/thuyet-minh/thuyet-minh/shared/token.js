import crypto from 'node:crypto';

const hmac = (data, secret) => crypto.createHmac('sha256', secret).update(data).digest('base64url');

export function sign(payload, secret, ttlSec = 8 * 3600) {
  const h = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const p = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + ttlSec })).toString('base64url');
  return `${h}.${p}.${hmac(`${h}.${p}`, secret)}`;
}

export function verify(token, secret) {
  const [h, p, s] = String(token || '').split('.');
  if (!h || !p || !s) return null;
  const expected = Buffer.from(hmac(`${h}.${p}`, secret));
  const given = Buffer.from(s);
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null;
  try {
    const d = JSON.parse(Buffer.from(p, 'base64url').toString('utf8'));
    return d.exp > Math.floor(Date.now() / 1000) ? d : null;
  } catch { return null; }
}
