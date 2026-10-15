import path from 'node:path';
import { buildApp } from './app.js';

buildApp({
  file: path.join(process.env.DATA_DIR || './data', 'content.json'),
  authUrl: process.env.AUTH_URL || 'http://localhost:4001'
}).listen(Number(process.env.PORT) || 4002);
