# 🏮 Hội An Audio Guide

**Hệ thống thuyết minh đa ngôn ngữ rảnh tay cho Phố cổ Hội An – “đi đến đâu, nghe đến đó”.**

Khách mở website (quét QR), chạm **một lần** “Bật định vị của tôi”; từ đó website hiện **vị trí GPS của chính khách** trên bản đồ, di tích gần nhất, và **tự phát thuyết minh** khi khách đến gần di tích bằng 6 ngôn ngữ (Tiếng Việt, English, 한국어, 中文, 日本語, Français). Đổi ngôn ngữ giữa chừng thì bài đang nghe **tự chuyển sang ngôn ngữ mới**.

Code hiện thực theo tài liệu `PRD_HoiAn_AudioGuide_v2.3` (Node.js + TypeScript, React + Vite, SQL Server, Microservices, Docker, GitHub Actions).

---

## 0. Chạy nhanh nhất trên Windows

Giải nén → bấm đúp **`CHAY-TAT-CA.bat`**. File này tự: mở Docker Desktop nếu chưa chạy, tải ảnh địa điểm còn thiếu (`tai-anh-dia-diem.bat`), rồi build + khởi động toàn bộ hệ thống và mở tunnel HTTPS (`start.bat`). Giữ cửa sổ mở trong lúc dùng.

## 1. Kiến trúc

```
Trình duyệt (React PWA) ──HTTPS /api/v1──► API Gateway :8080 ──► Auth :4001
   │  geofence chạy trên máy khách           (định tuyến, JWT,     Location :4002 ◄─┐ REST nội bộ
   │  (tọa độ KHÔNG gửi lên máy chủ)          rate limit, 503)      Content :4003 ──┘ X-Internal-Key
   └─► OpenStreetMap                                               Analytics :4004
                                                                        │
                                                         SQL Server 2022 + thư mục media
```

| Thành phần | Thư mục | Trách nhiệm | Bảng sở hữu |
|---|---|---|---|
| Frontend | `apps/web` | Giao diện khách + Admin, bộ máy thuyết minh rảnh tay, PWA | – |
| API Gateway | `services/gateway` | Điểm vào duy nhất, bảng định tuyến (PRD 8.3.2), xác thực JWT qua Auth, rate limit, trả 503 khi service lỗi | – |
| Auth Service | `services/auth` | Đăng nhập, JWT, khóa tạm khi sai 5 lần, tài khoản Admin | Admins |
| Location Service | `services/location` | Địa điểm, tìm kiếm/lọc, tọa độ, mã QR | Locations, LocationCategories |
| Content Service | `services/content` | Thuyết minh, ngôn ngữ dự phòng, âm thanh, bản dịch giao diện | Languages, Narrations, UiTranslations |
| Analytics Service | `services/analytics` | Phiên, heartbeat, sự kiện, thống kê | VisitSessions, VisitEvents |
| Shared | `packages/shared` | Lỗi chuẩn, middleware, gọi service nội bộ (timeout + retry), kết nối DB | – |

**Giao tiếp giữa các service** (FR-20): Content → Location (kiểm tra địa điểm), Location → Content (tiêu đề theo ngôn ngữ, tìm kiếm), Analytics → Location (tên địa điểm), Gateway → Auth (xác thực token). Mọi lời gọi nội bộ có `X-Internal-Key`, `X-Request-Id`, timeout 2 s, retry GET 1 lần; service phụ lỗi thì hệ thống **suy giảm có kiểm soát** (vd. danh sách vẫn hiện khi Content lỗi).

## 2. Cấu trúc thư mục

```
apps/web/src/
  tour/engine.ts        ← lõi thuyết minh rảnh tay (dwell 3 s, cooldown 30 phút, GPS ≤ 30 m, hàng đợi, ưu tiên)
  tour/providers.ts     ← nguồn vị trí: GPS thật của thiết bị (Geolocation API)
  tour/narrator.ts      ← trình phát: file MP3 hoặc giọng đọc tự động của thiết bị (Web Speech API)
  tour/TourContext.tsx  ← ghép mọi thứ: 1 chạm → mở khóa âm thanh + Wake Lock + định vị
  pages/, components/   ← giao diện khách (UI01–UI06);  admin/ ← giao diện quản trị (UI07–UI12)
services/*/src/app.ts   ← mỗi service một file app, dễ đọc và test
db/migrations/V001__init.sql   ← lược đồ CSDL (PRD Phần XII)
db/seed/data/*.json            ← 15 di tích + 90 bài thuyết minh (6 ngôn ngữ, PRD Phụ lục A, C)
tests/integration/             ← 32 test API với SQL Server thật
tests/e2e/handsfree.mjs        ← test trình duyệt: 1 chạm → tự thuyết minh 8 di tích
docker/, docker-compose.yml, .github/workflows/ci.yml, cd.yml
```

## 3. Chạy nhanh bằng Docker (khuyên dùng)

Yêu cầu: Docker Desktop.

```bash
cp .env.example .env          # rồi sửa DB_PASSWORD, JWT_SECRET, INTERNAL_API_KEY, SEED_ADMIN_PASSWORD
docker compose up -d --build --wait
docker compose --profile tools run --rm migrate   # tạo bảng + nạp 15 di tích × 6 ngôn ngữ + tài khoản admin
```

- Website: <http://localhost>
- Quản trị: <http://localhost/admin> (tài khoản `SEED_ADMIN_USERNAME` / `SEED_ADMIN_PASSWORD` trong `.env`)

> `DB_PASSWORD` phải đủ mạnh theo yêu cầu SQL Server (≥ 8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt).

## 4. Chạy ở chế độ phát triển

Yêu cầu: Node.js 22 LTS, npm 10, SQL Server (hoặc container: `docker run -d -e ACCEPT_EULA=Y -e MSSQL_SA_PASSWORD='...' -p 1433:1433 mcr.microsoft.com/mssql/server:2022-latest`).

```bash
npm install
cp .env.example .env     # DB_HOST=localhost, điền mật khẩu
npm run db:seed          # migration + dữ liệu mẫu (chạy lại nhiều lần không bị trùng)
npm run dev              # chạy 4 service + Gateway + Vite → http://localhost:5173
```

## 5. Định vị GPS & thuyết minh tự động

1. Bấm nút **GPS** trên thanh trên cùng, hoặc nút ◎ ở góc bản đồ. Trình duyệt hỏi quyền vị trí → cho phép.
2. Chấm xanh hiện vị trí thật của bạn trên bản đồ (kèm vòng sai số); khối định vị cho biết **sai số** và **di tích gần nhất**.
3. Bật công tắc **“Tự thuyết minh khi đến gần”** (mặc định bật): vào vùng di tích ≥ 3 giây → tự phát; đang nghe mà đi qua di tích khác → xếp hàng.
4. Đang nghe mà đổi ngôn ngữ ở góc trên → thuyết minh tự chuyển sang ngôn ngữ mới (đang tạm dừng thì nạp sẵn, bấm Phát là nghe ngôn ngữ mới).
5. Lần sau mở lại trang, nếu đã cấp quyền, định vị tự bật lại.

Trên laptop không có GPS, trình duyệt ước lượng vị trí theo Wi-Fi/IP (sai số lớn). Khi phát triển có thể giả lập vị trí bằng Chrome DevTools → *More tools* → **Sensors** → *Location*.

Trên điện thoại thật: website cần chạy qua **HTTPS** (Geolocation API bắt buộc). Khi thử trong mạng LAN, dùng một đường hầm HTTPS hoặc chứng chỉ tự ký.

## 6. Kiểm thử

| Lệnh | Nội dung |
|---|---|
| `npm run lint` | ESLint toàn bộ dự án |
| `npm run typecheck` | Kiểm tra kiểu TypeScript |
| `npm test` | Unit test: bộ máy geofence (TC12, TC13, TC30, TC31, TC44…), ngôn ngữ dự phòng, bảng định tuyến Gateway, khóa đăng nhập, Haversine, tách câu giọng đọc |
| `npm run test:integration` | 32 test API qua Gateway với SQL Server thật (cần `npm run db:seed` trước) |
| `npm run test:e2e` | Trình duyệt thật: 1 chạm → tự thuyết minh 8/8 di tích (cần hệ thống đang chạy; lần đầu `npx playwright install chromium`; đặt `BASE_URL`) |

CI (`.github/workflows/ci.yml`) chạy lint → type check → unit test → build → integration test (SQL Server service container) → build Docker image → E2E. CD (`cd.yml`) đẩy image lên GHCR và triển khai qua SSH, có health check và tự rollback (bật bằng biến `DEPLOY_ENABLED=true` + secrets `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`).

## 7. Đối chiếu PRD → code

| Yêu cầu | Nơi hiện thực |
|---|---|
| FR-01 QR (chung + từng di tích `?src=qr`) | `pages/Detail.tsx`, `main.tsx`, `location/app.ts` (`/admin/locations/:id/qr`) |
| FR-02/03 Ngôn ngữ + dự phòng ko → en → vi | `i18n/`, `content/src/fallback.ts` |
| FR-04 Trình phát (tua, tốc độ, Media Session) | `tour/narrator.ts`, `components/Player.tsx` |
| **FR-05 Rảnh tay (cốt lõi)** | `tour/engine.ts`, `tour/TourContext.tsx`, `components/StartTourButton.tsx`, `TourBar.tsx` |
| FR-06–10 Danh sách, tìm kiếm không dấu, lọc, gần tôi, chi tiết | `location/app.ts`, `pages/Places.tsx`, `pages/Detail.tsx` |
| FR-11 Bản đồ + chỉ đường | `components/MapView.tsx` (Leaflet/OSM), link Google Maps đi bộ |
| FR-12 Yêu thích, lịch sử | `storage.ts`, `pages/Favorites.tsx`, `pages/History.tsx` |
| FR-13–17 Quản trị | `auth/app.ts`, `location/app.ts`, `content/app.ts`, `admin/*` |
| FR-18/19 Phiên & thống kê | `analytics/app.ts`, `analytics.ts`, `admin/Dashboard.tsx`, `admin/Stats.tsx` |
| FR-20 Giao tiếp service | `shared/src/client.ts`, `gateway/src/routes.ts`, `gateway/src/app.ts` |
| Định vị GPS của người dùng | `tour/providers.ts` (`BrowserGpsProvider`), `components/GpsCard.tsx`, `components/MapView.tsx` |
| NFR-04 Bảo mật | bcrypt cost 12, JWT 60 phút, helmet, CORS, rate limit, Zod, truy vấn tham số hóa, chặn header nội bộ giả mạo |
| NFR-09 Quyền riêng tư | tọa độ chỉ xử lý trên trình duyệt; không lưu IP |
| NFR-10 Phục hồi | 503 có `requestId`, suy giảm có kiểm soát, Error Boundary, PWA cache |

## 8. Lưu ý và giới hạn đã biết

- **Âm thanh:** dữ liệu mẫu chưa có file MP3, nên website dùng **giọng đọc tự động của thiết bị** (Web Speech API). Chất lượng và việc có giọng cho từng ngôn ngữ phụ thuộc thiết bị và trình duyệt: Android và iOS thường có đủ, Windows có thể thiếu giọng tiếng Việt. Admin có thể tải lên MP3/M4A ≤ 5 MB cho từng bài.
- **Khóa màn hình:** trình duyệt tạm dừng GPS và JavaScript khi khóa màn hình, nên website giữ màn hình sáng bằng Screen Wake Lock. Muốn chạy nền thì cần app native (ngoài phạm vi).
- **Tọa độ 15 di tích là tham khảo**, cần đo lại tại thực địa. **Giá vé** để trống, chờ Admin nhập. Nội dung lịch sử cần đối chiếu nguồn chính thống (xem PRD Phụ lục C).
- `bcryptjs` (bcrypt viết bằng JavaScript thuần, cùng thuật toán, không cần biên dịch native) được dùng thay `bcrypt`.
- `npm audit` báo lỗ hổng của `braces`/`micromatch` (phụ thuộc của `http-proxy-middleware`). Lỗ hổng chỉ khai thác được khi glob do người dùng nhập, mà Gateway định tuyến bằng hàm, không dùng glob.
- **Bản đồ không còn nền xám:** mỗi ô ảnh nền tự thử lần lượt nhiều nguồn độc lập (ảnh offline đóng gói sẵn → server của mình → OSM → Esri → OSM-FR; không dùng CARTO vì nó đóng dấu "API KEY REQUIRED"), có timeout, tự thử lại khi mạng chập chờn/có mạng lại/quay lại tab, và từ chối ô "bị chặn". Nếu tất cả nguồn đều không tới được, nền là giấy be + lưới, kèm thông báo và nút "Thử lại"; các điểm tham quan vẫn dùng bình thường (`apps/web/src/components/resilientTiles.ts`).
- **Chống mất mạng hoàn toàn:** chạy **một lần** `npm run tiles:offline` (cần Internet) để tải ~vài trăm ô của khu Phố cổ vào `apps/web/public/tiles-local/`, rồi build lại. Từ đó bản đồ khu Phố cổ (zoom 14–18) đi cùng website, không phụ thuộc mạng của từng máy.
- Khi triển khai lượng truy cập lớn nên dùng nhà cung cấp tile riêng theo chính sách sử dụng của OSM.

---

## Tài liệu API (Swagger)

Sau khi chạy `start.bat` (Docker) mở `http://localhost/api/docs`, hoặc bấm đúp `mo-api-docs.bat`. Chạy dev: `http://localhost:5173/api/docs`. Đăng nhập bằng `POST /api/v1/auth/login` → token tự điền vào nút Authorize. Spec viết tay ở `services/gateway/src/openapi.ts`.


## Nạp đủ 6 ngôn ngữ vào database đang chạy

Chạy `nap-ngon-ngu.bat` (cần Docker Desktop đang chạy). Script chỉ **thêm cái còn thiếu** (ngôn ngữ, địa điểm, bản thuyết minh vi/en/fr/ko/zh/ja), không ghi đè nội dung đã sửa trong admin.

## 👥 Nhóm Thực Hiện: 09

| Nguyễn Đạt Mạnh | 3124411162 |

| Đàm Gia Khang   | 3124411121 |

| Phạm Quốc Trung | 3124411329 |

---
