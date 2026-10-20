// Tạo bản dịch cho một địa điểm: [tiêu đề, nội dung] theo từng ngôn ngữ.
export const L = (vi, en, ja, ko) => {
  const tr = { vi: { title: vi[0], body: vi[1] }, en: { title: en[0], body: en[1] } };
  if (ja) tr.ja = { title: ja[0], body: ja[1] };
  if (ko) tr.ko = { title: ko[0], body: ko[1] };
  return tr;
};
