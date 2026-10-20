// Dữ liệu mẫu: các địa điểm tại TP.HCM, mỗi nơi có bài thuyết minh dài (vi, en, ja, ko).
// Giờ mở cửa và tọa độ chỉ mang tính tham khảo.
import { placesA } from './places-a.js';
import { placesB } from './places-b.js';
import { placesC } from './places-c.js';

const places = [...placesA, ...placesB, ...placesC];

export const seed = () => ({
  langs: [
    { code: 'vi', name: 'Tiếng Việt', tts: 'vi-VN' },
    { code: 'en', name: 'Tiếng Anh', tts: 'en-US' },
    { code: 'ja', name: 'Tiếng Nhật', tts: 'ja-JP' },
    { code: 'ko', name: 'Tiếng Hàn', tts: 'ko-KR' }
  ],
  nid: places.length + 1,
  contents: places.map((p, i) => ({ id: i + 1, tr: p.tr, meta: p.meta }))
});
