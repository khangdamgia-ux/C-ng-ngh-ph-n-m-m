# Hệ thống thuyết minh đa ngôn ngữ

Ba service Node.js, không cần cài thư viện ngoài (chỉ dùng module có sẵn của Node >= 22):

| Service | Cổng | Vai trò |
|---|---|---|
| gateway | 4000 | Phục vụ giao diện web và chuyển tiếp `/api/auth/*`, `/api/content/*` |
| services/auth | 4001 | Đăng ký, đăng nhập (JWT), quản lý người dùng |
| services/content | 4002 | Nội dung, ngôn ngữ, tìm kiếm, dữ liệu audio. Gọi auth `/verify` để xác thực |

## Chạy
```
npm start        # mở http://localhost:4000 (admin / admin123)
                 # /login = đăng nhập, /register = đăng ký (2 trang riêng)
npm test         # kiểm thử API
docker compose up --build
```
Biến môi trường: `JWT_SECRET`, `ADMIN_USER`, `ADMIN_PASS`, `DATA_DIR`, `AUTH_URL`, `CONTENT_URL`.
Dữ liệu lưu trong thư mục `data/` (file JSON). Hãy đổi `JWT_SECRET` và `ADMIN_PASS` khi triển khai.

## Đối chiếu yêu cầu
- FR-01: `POST /api/auth/register`, `/login`, `GET /me`
- FR-02: `GET /api/content/contents`
- FR-03: `GET /api/content/contents?q=...`
- FR-04: `GET /api/content/languages`, chọn trong giao diện
- FR-05: `GET /api/content/contents/:id?lang=xx` (thiếu bản dịch thì dùng tiếng Việt)
- Nghe thuyết minh: `GET /api/content/contents/:id/audio?lang=xx`, giao diện đọc bằng Web Speech API của trình duyệt
- Quản trị: `POST/PUT/DELETE /contents`, `POST/DELETE /languages`, `GET/PATCH/DELETE /api/auth/users`

CI/CD: `.github/workflows/ci.yml` chạy test, build Docker và smoke test.

## Giao diện & dữ liệu địa điểm
- Trang: `/login`, `/register`, `/` (ứng dụng; chưa đăng nhập sẽ tự chuyển về `/login`).
- 15 địa điểm TP.HCM, mỗi nơi có loại, địa chỉ, tọa độ, giờ mở cửa (tham khảo), năm; vi + en đầy đủ, một số có ja/ko (thiếu thì dùng bản tiếng Việt).
- `GET /contents?category=history|religion|culture|food|nature`; `POST/PUT /contents` nhận thêm `meta: {category, emoji, address, hours, year, lat, lng}`.
- Giao diện: lọc theo loại, sắp xếp "gần tôi" (định vị), yêu thích (lưu theo tài khoản trong trình duyệt), bản đồ OpenStreetMap + chỉ đường, nghe thuyết minh có chỉnh tốc độ, chuyển địa điểm trước/sau.
- Lưu ý: nếu thư mục `data/` đã có `content.json` cũ thì dữ liệu mẫu mới sẽ không được nạp; hãy xóa `data/content.json` để seed lại.
