# Nhập sản lượng báo cáo hàng giờ v8.4

![Version](https://img.shields.io/badge/version-8.4-blue.svg)
![Status](https://img.shields.io/badge/status-ready--to--deploy-success.svg)
![Architecture](https://img.shields.io/badge/architecture-proxy--based-green.svg)
![Location](https://img.shields.io/badge/location-Vietnam-red.svg)

Hệ thống nhập sản lượng báo cáo hàng giờ, hỗ trợ nhập liệu sản lượng, theo dõi tiến độ, quản lý OT, và điều khiển máy FA.

## Có gì mới trong v8.4?

### 🔒 Bảo mật & Xác thực
- **Captcha chuyển vào form đăng nhập**: Cloudflare Turnstile được đưa vào màn hình đăng nhập thay vì widget nổi gọi liên tục
- **Tự động chọn máy mặc định**: Máy số 1 được tự động chọn khi vào bước 3, FA luôn BẬT

### 🎨 Giao diện & UX
- **Giao diện header mới**: Sticky header + summary banner (GÓI / TARGET / THỰC TẾ / HOÀN THÀNH / CÓ OT) luôn cố định trên đầu
- **Modal gửi dữ liệu**: Hiển thị ảnh thumbnail, thông tin package, thanh tiến trình
- **Modal cảnh báo**: Popup xác nhận vượt target dạng modal đẹp mắt, hỗ trợ phím Enter
- **Lọc Status mới**: Thêm Đủ / Vượt / Thiếu Target
- **Tinh gọn layout**: Giảm padding, bỏ dòng phụ đề, summary đưa lên header

### ⚡ Cải tiến luồng thao tác
- **Nhập SL thực tế**: Tính năng chia sản lượng theo số thực tế nhập vào (VD: 160/150)
- **Nút quay lại trang chính**: Ở tất cả các bước, không cần reload trang
- **Phím tắt Alt+L**: Tải danh sách Package nhanh
- **Date picker**: Chọn ngày xong cần bấm nút mới tải, tránh gọi API tự động
- **Chống scroll tràn**: `overscroll-behavior: contain` ngăn cuộn danh sách làm trôi trang

## Tính năng chính

- Đăng nhập bảo mật với Cloudflare Turnstile + Auth Password Gate
- Xem danh sách gói hàng theo ngày, nhà máy
- Lọc theo Buyer, Line, OT, Status (Đủ/Vượt/Thiếu)
- Nhập liệu sản lượng theo operation
- Tự động tính toán Target vs Actual
- Hỗ trợ OT (tăng ca)
- Gửi lệnh FA tới máy (tự động chọn máy 1)
- Preview ảnh sản phẩm khi di chuột
- Responsive trên cả mobile và desktop

## Kiến trúc

```
Client (index.html)
  → apiFetch() wrapper (gắn Bearer token, xóa apikey)
  → MES Proxy Worker (mes-proxy.chiscoong-cloudflare-com.workers.dev)
    → Xác thực session qua Auth Password Gate
    → Inject API Key từ biến môi trường
    → Forward tới backend Worker tương ứng
```

## Yêu cầu hệ thống

- Cloudflare Workers cho proxy, backend, và auth
- Turnstile Site Key và Secret Key
- Biến môi trường `API_KEY` trên proxy Worker

## Triển khai

1. Deploy proxy Worker lên Cloudflare Workers
2. Cập nhật `PROXY_BASE` trong `index.html` nếu cần
3. Deploy `index.html` lên Cloudflare Pages hoặc static hosting
4. Cấu hình Turnstile Site Key trong HTML

## Tác giả

- **Chí Công** - Nhân viên văn phòng
- **AI Support**

---

© 2026 MES System
