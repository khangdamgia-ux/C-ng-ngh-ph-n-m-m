// Chạy cả 3 service cùng lúc (Windows/Linux/Mac): npm start
import { spawn } from 'node:child_process';

const common = { JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-doi-khi-deploy' };
const svc = [
  ['auth', 'services/auth/index.js', { PORT: 4001 }],
  ['content', 'services/content/index.js', { PORT: 4002, AUTH_URL: 'http://localhost:4001' }],
  ['gateway', 'gateway/index.js', { PORT: 4000, AUTH_URL: 'http://localhost:4001', CONTENT_URL: 'http://localhost:4002' }]
];
const procs = svc.map(([name, file, env]) => {
  const p = spawn(process.execPath, [file], { stdio: 'inherit', env: { ...process.env, ...common, ...env } });
  p.on('exit', (code) => { console.log(`[${name}] dừng (code ${code})`); });
  return p;
});
const stop = () => { procs.forEach((p) => p.kill()); process.exit(0); };
process.on('SIGINT', stop); process.on('SIGTERM', stop);
console.log('Mở http://localhost:4000  (admin/admin123)');
