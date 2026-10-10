import fs from 'node:fs';
import path from 'node:path';

// Lưu dữ liệu dạng file JSON (đủ cho MVP; có thể thay bằng DB sau).
export function openStore(file, initial) {
  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { data = structuredClone(initial); }
  const flush = () => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file + '.tmp', JSON.stringify(data, null, 2));
    fs.renameSync(file + '.tmp', file);
  };
  flush();
  return { data, flush };
}
