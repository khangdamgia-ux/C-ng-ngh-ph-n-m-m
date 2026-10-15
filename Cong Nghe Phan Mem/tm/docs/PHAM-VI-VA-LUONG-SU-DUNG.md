# Phạm vi sản phẩm và luồng sử dụng

## 1. Luồng sử dụng chính

1. Người dùng mở hệ thống.
2. Đăng nhập bằng tài khoản đã đăng ký.
3. Tìm kiếm hoặc chọn nội dung/địa điểm muốn tìm hiểu.
4. Chọn ngôn ngữ thuyết minh.
5. Hệ thống tải nội dung theo ngôn ngữ đã chọn.
6. Hệ thống hiển thị nội dung và cung cấp chức năng đọc thuyết minh bằng âm thanh.
7. Người dùng nghe, tạm dừng hoặc tiếp tục tìm hiểu nội dung khác.

Nếu nội dung chưa có bản dịch ở ngôn ngữ được chọn, hệ thống có thể sử dụng nội dung tiếng Việt làm phương án dự phòng.

## 2. Phạm vi phiên bản đầu

### Trong phạm vi
- Đăng ký, đăng nhập và quản lý phiên người dùng.
- Quản lý, hiển thị và tìm kiếm nội dung thuyết minh.
- Lựa chọn ngôn ngữ và hiển thị nội dung tương ứng.
- Đọc nội dung thành tiếng bằng chức năng giọng nói của trình duyệt (Web Speech API).
- Các chức năng quản trị nội dung cơ bản.

### Chưa cam kết trong phiên bản đầu
- Nhận diện giọng nói hoặc hội thoại trực tiếp với người dùng.
- Bản dịch hoàn chỉnh cho tất cả nội dung và mọi ngôn ngữ.
- Tạo, lưu trữ và phát tệp âm thanh thu sẵn cho toàn bộ nội dung.
- Ứng dụng di động độc lập.

## 3. Ghi chú triển khai

Chức năng đọc thành tiếng hiện dựa vào khả năng hỗ trợ giọng nói của trình duyệt và hệ điều hành. Chất lượng, giọng đọc và ngôn ngữ khả dụng có thể khác nhau giữa các thiết bị. Khi phát triển tiếp, nhóm nên kiểm thử lựa chọn ngôn ngữ, trường hợp thiếu bản dịch và hành vi khi trình duyệt không hỗ trợ giọng đọc.
