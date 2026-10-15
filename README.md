# Thuyết minh tự động đa ngôn ngữ
Đồ án môn Công nghệ phần mềm — **Đề 3: Backend gồm các services giao tiếp với nhau, có CI/CD.**

## Kiến trúc

```
Trình duyệt / Mobile
        │
   ┌────▼─────┐  /api/auth/*     ┌──────────────┐
   │ gateway  ├─────────────────►│ auth :4001   │  đăng ký, đăng nhập (JWT), người dùng
   │  :4000   │                  └──────▲───────┘
   │          │  /api/content/*         │ GET /verify (xác thực token)
   │          ├─────────────────►┌──────┴───────┐
   └──────────┘                  │ content :4002│  nội dung, ngôn ngữ, tìm kiếm, audio
                                 └──────────────┘
```

- **gateway**: cổng vào duy nhất, phục vụ giao diện web và chuyển tiếp request.
- **auth**: quản lý tài khoản, cấp JWT.
- **content**: quản lý nội dung thuyết minh; gọi `auth /verify` để kiểm tra quyền → đây là phần *services giao tiếp với nhau*.

Mỗi service có `Dockerfile` riêng và có thể build, chạy, triển khai độc lập.

## Cấu trúc thư mục

| Thư mục | Nội dung |
|---|---|
| `thuyet-minh/tm/` | **Bản chính**: gateway + auth + content (Node.js ≥ 22, không cần thư viện ngoài) |
| `backend/`, `database/` | Bản cũ (Express + MySQL), giữ để tham khảo |
| `.github/workflows/` | CI/CD |

Chi tiết API và biến môi trường: xem [thuyet-minh/tm/README.md](thuyet-minh/tm/README.md).

## Chạy thử

```bash
cd thuyet-minh/tm
npm start                 # http://localhost:4000  (admin / admin123)
npm test                  # kiểm thử API
docker compose up --build # chạy cả 3 service bằng Docker
```

## CI/CD

| Workflow | Khi nào chạy | Làm gì |
|---|---|---|
| `ci.yml` | push / pull request | Chạy test → build Docker → chạy thử cả hệ thống (smoke test) |
| `cd.yml` | CI trên nhánh chính thành công | Build và đẩy image `thuyet-minh-auth`, `-content`, `-gateway` lên GitHub Container Registry |

Chạy image đã đẩy lên: `docker pull ghcr.io/<tên-github>/thuyet-minh-gateway:latest`.

## Cấu hình bí mật (GitHub Secrets)

Không ghi mật khẩu thật vào code. Vào **Settings → Secrets and variables → Actions → New repository secret** và tạo:

| Secret | Dùng cho |
|---|---|
| `JWT_SECRET` | Khóa ký token đăng nhập |
| `ADMIN_PASS` | Mật khẩu tài khoản `admin` |

CI đọc hai secret này khi chạy smoke test. Nếu chưa đặt, hệ thống dùng giá trị mặc định (chỉ để thử, **không dùng khi triển khai thật**). Khi chạy thật bằng Docker: đặt biến môi trường `JWT_SECRET`, `ADMIN_PASS` hoặc file `.env` (đã nằm trong `.gitignore`).

## Nhóm thực hiện

Nhóm DCT124C4 — Đại học Sài Gòn. 

Sinh Viên Thực Hiện:

Nguyễn Đạt Mạnh - 3124411162

Đàm Gia Khang - 3124411121

Phạm Quốc Trung - 3124411329
