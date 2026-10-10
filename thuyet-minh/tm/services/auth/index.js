import path from 'node:path';
import { buildApp } from './app.js';

const secret = process.env.JWT_SECRET || 'dev-secret-doi-khi-deploy';
if (!process.env.JWT_SECRET) console.warn('[auth] JWT_SECRET chưa đặt, đang dùng giá trị mặc định (chỉ dùng khi dev).');

const app = buildApp({
  file: path.join(process.env.DATA_DIR || './data', 'auth.json'),
  secret,
  adminUser: process.env.ADMIN_USER || 'admin',
  adminPass: process.env.ADMIN_PASS || 'admin123'
});
app.listen(Number(process.env.PORT) || 4001);
