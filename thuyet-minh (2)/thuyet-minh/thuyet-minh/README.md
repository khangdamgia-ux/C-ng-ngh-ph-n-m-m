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
