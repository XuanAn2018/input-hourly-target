# Production Management v8.3

![Version](https://img.shields.io/badge/version-8.3-blue.svg)
![Status](https://img.shields.io/badge/status-ready--to--deploy-success.svg)
![Architecture](https://img.shields.io/badge/architecture-proxy--based-green.svg)
![Location](https://img.shields.io/badge/location-Vietnam-red.svg)

Hệ thống quản lý sản xuất theo thời gian thực, hỗ trợ nhập liệu sản lượng, theo dõi tiến độ, quản lý OT, và điều khiển máy FA.

## Có gì mới trong v8.3?

- **Proxy Architecture**: Toàn bộ request đi qua proxy Worker, không còn API Key phía client
- **apiFetch Wrapper**: Tự động gắn Bearer token, loại bỏ apikey khỏi URL/header
- **Bảo mật cao hơn**: API Key được inject server-side, client chỉ cần token đăng nhập
- **Giảm cấu hình**: Không cần nhập API Key, chỉ cần đăng nhập là sử dụng được ngay

## Tính năng chính

- Đăng nhập bảo mật với Cloudflare Turnstile + Auth Password Gate
- Xem danh sách gói hàng theo ngày, nhà máy
- Lọc theo Buyer, Line, OT
- Nhập liệu sản lượng theo operation
- Tự động tính toán Target vs Actual
- Hỗ trợ OT (tăng ca)
- Gửi lệnh FA tới máy
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
