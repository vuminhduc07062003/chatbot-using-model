# 🚀 Chatbot Facebook Messenger sử dụng Ollama (Llama3/Mistral) miễn phí

## 🏍️ Giới thiệu
Đây là dự án chatbot Facebook Messenger cho cửa hàng xe phân khối lớn, sử dụng mô hình AI mã nguồn mở (Ollama: Llama3, Mistral, v.v) để trả lời tự động bằng tiếng Việt, hoàn toàn **không tốn phí API** như OpenAI.

---

## 🛠️ Tính năng nổi bật
- **Trả lời tự động** mọi câu hỏi của khách hàng qua Facebook Messenger.
- **Tích hợp mô hình AI miễn phí** (Ollama) chạy trên máy cá nhân.
- **Trả lời tiếng Việt tự nhiên**, dựa trên thông tin cửa hàng.
- **Dễ dàng mở rộng**: có thể tích hợp thêm dữ liệu từ file Excel, gửi ảnh, v.v.

---

## 🚦 Hướng dẫn cài đặt

### 1. Clone dự án & cài đặt thư viện
```bash
git clone https://github.com/vuminhduc07062003/chatbot-using-model.git
cd chatbot-using-model/webhook-server
npm install
```

### 2. Cài đặt & chạy Ollama
- Tải Ollama: [https://ollama.com/download](https://ollama.com/download)
- Chạy model (ví dụ Llama3):
  ```bash
  ollama run llama3
  ```

### 3. Tạo file `.env`
```env
PAGE_ACCESS_TOKEN=your_facebook_page_token
VERIFY_TOKEN=your_verify_token
PORT=3000
```

### 4. Khởi động server Node.js
```bash
node server.js
```

### 5. Kết nối webhook với Facebook Developer
- Đăng ký endpoint: `https://<your-ngrok-domain>/api/webhook`
- Điền VERIFY_TOKEN trùng với `.env`
- Chọn các sự kiện: messages, messaging_postbacks, ...

---

## 📦 Cấu trúc thư mục

```
chatbot-using-model/
├── webhook-server/
│   ├── src/
│   │   └── routes/
│   │       └── router.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── README.md
```

---

## 💡 Mở rộng
- Đọc dữ liệu sản phẩm từ file Excel và tích hợp vào prompt AI.
- Gửi ảnh sản phẩm qua Messenger.
- Tùy chỉnh mô hình AI theo nhu cầu.

---

## 📞 Liên hệ & bản quyền
- Tác giả: [vuminhduc07062003](https://github.com/vuminhduc07062003)
- Dành cho mục đích học tập, phi thương mại.

---