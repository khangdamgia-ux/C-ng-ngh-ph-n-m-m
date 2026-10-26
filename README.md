# Hội An Audio Guide – Thuyết minh tự động đa ngôn ngữ

Đồ án môn Công nghệ phần mềm — **Đề 3: Backend gồm các services giao tiếp với nhau, có CI/CD.**

Khách quét QR, mở website, chạm một lần "Bắt đầu tham quan"; hệ thống tự định vị và
tự phát thuyết minh về di tích nơi khách đang đứng bằng 6 ngôn ngữ
(Việt, Anh, Hàn, Trung, Nhật, Pháp). Có trang Admin để quản lý nội dung và xem thống kê.

## Kiến trúc

```
Trình duyệt (React PWA)
        │  http://localhost
   ┌────▼─────┐
   │  web     │  Nginx: phục vụ giao diện, chuyển /api sang gateway
   └────┬─────┘
        │ /api/v1/*
   ┌────▼──────┐   JWT      ┌──────────────┐
   │  gateway  ├───────────►│ auth :4001   │  đăng nhập, JWT, tài khoản admin
   │   :8080   │            └──────────────┘
   │           ├───────────►┌──────────────┐
   │           │            │ location:4002│  địa điểm, tìm kiếm, mã QR
   │           ├───────────►├──────────────┤
   │           │            │ content :4003│  thuyết minh, ngôn ngữ, âm thanh
   │           ├───────────►├──────────────┤
   └───────────┘            │ analytics:4004│ phiên tham quan, thống kê
                            └──────┬───────┘
                                   ▼
                          SQL Server 2022 + thư mục media
```

- **gateway**: cổng vào duy nhất của backend, định tuyến, xác thực JWT qua auth, giới hạn tốc độ, trả 503 khi service lỗi.
- **auth**: đăng nhập, cấp JWT, khóa tạm khi sai mật khẩu 5 lần.
- **location**: quản lý địa điểm, danh mục, tìm kiếm, tọa độ, mã QR.
- **content**: quản lý bài thuyết minh, ngôn ngữ, bản dịch giao diện, file âm thanh.
- **analytics**: phiên tham quan, sự kiện, thống kê.
- **Giao tiếp giữa các service** (REST nội bộ, header `X-Internal-Key`, timeout 2 s, retry 1 lần):
  content ↔ location, analytics → location, gateway → auth.
  Một service phụ lỗi thì hệ thống suy giảm có kiểm soát thay vì sập toàn bộ.

Mỗi service có image Docker riêng, build và triển khai độc lập.

## Cấu trúc thư mục

| Thư mục | Nội dung |
|---|---|
| `apps/web` | Giao diện khách + Admin (React, Vite, Leaflet, PWA) |
| `services/gateway`, `auth`, `location`, `content`, `analytics` | 5 service backend (Node.js, TypeScript, Express) |
| `packages/shared` | Code dùng chung: lỗi chuẩn, middleware, gọi service nội bộ, kết nối DB |
| `db/migrations`, `db/seed` | Lược đồ CSDL và dữ liệu mẫu (15 di tích × 6 ngôn ngữ) |
| `docker/`, `docker-compose.yml` | Dockerfile và cấu hình chạy cả hệ thống |
| `tests/` | Integration test (API) và E2E (Playwright) |
| `.github/workflows` | CI/CD |

Chi tiết xem [README gốc của dự án](./README.md) (nếu giữ lại) hoặc Swagger tại `/api/docs`.

## Chạy thử

Yêu cầu: Docker Desktop.

```bash
cp .env.example .env     # sửa DB_PASSWORD, JWT_SECRET, INTERNAL_API_KEY, SEED_ADMIN_PASSWORD
docker compose -p hoian-audio-guide up -d --build --wait
docker compose -p hoian-audio-guide --profile tools run --rm migrate
```

- Website: <http://localhost> · Demo mô phỏng vị trí: <http://localhost/map?demo=1>
- Quản trị: <http://localhost/admin> (tài khoản theo `SEED_ADMIN_USERNAME` / `SEED_ADMIN_PASSWORD` trong `.env`)
- Tài liệu API (Swagger): <http://localhost/api/docs>

Chạy chế độ phát triển (Node.js ≥ 22): `npm install` → `npm run db:seed` → `npm run dev` (http://localhost:5173).

Kiểm thử: `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:integration`, `npm run test:e2e`.

## CI/CD

| Workflow | Khi nào chạy | Làm gì |
|---|---|---|
| `ci.yml` | push / pull request vào `develop`, `main` | Lint → type check → unit test → build; integration test với SQL Server; build image của 5 service; E2E bằng Docker Compose + Playwright |
| `cd.yml` | push vào `main` | Build và đẩy 7 image (gateway, auth, location, content, analytics, web, migrate) lên GitHub Container Registry; nếu bật `DEPLOY_ENABLED=true` thì triển khai qua SSH, health check và tự rollback khi lỗi |

## Cấu hình bí mật

Không ghi mật khẩu thật vào code; file `.env` đã nằm trong `.gitignore`.
Trên GitHub: **Settings → Secrets and variables → Actions**.

| Secret / Variable | Dùng cho |
|---|---|
| `CI_SA_PASSWORD` (tùy chọn) | Mật khẩu SQL Server trong CI (có giá trị mặc định cho CI) |
| `DEPLOY_ENABLED` (variable) | Đặt `true` để bật bước triển khai |
| `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` | Triển khai qua SSH |

## Nhóm thực hiện

Nhóm DCT124C4 — Đại học Sài Gòn.

Sinh viên thực hiện:

- Nguyễn Đạt Mạnh – 3124411162
- Đàm Gia Khang – 3124411121
- Phạm Quốc Trung – 3124411329
