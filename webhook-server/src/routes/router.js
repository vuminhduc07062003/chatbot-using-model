require('dotenv').config(); // Load biến môi trường
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Lấy token từ biến môi trường
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const STORE_INFO = `
🏍️ CỬA HÀNG XE PHÂN KHỐI LỚN ABC 🏁

📍 Địa chỉ: 123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP.Hồ Chí Minh  
🕒 Giờ hoạt động: 8h00 - 21h00 (mỗi ngày, kể cả Chủ nhật & ngày lễ)  
📞 Hotline: 0909 123 456  
🌐 Website: https://abc-motor.vn  
📩 Email: lienhe@abc-motor.vn  
📱 Facebook: fb.com/abcmotor.vn  
📦 Giao hàng: Toàn quốc, hỗ trợ trả góp 0%

🚗 SẢN PHẨM CUNG CẤP:
- Xe phân khối lớn cũ và mới: Honda, Yamaha, Kawasaki, Suzuki, BMW, Ducati,...
- Xe tay ga cao cấp: SH, Vespa, NVX, Janus,...
- Phụ tùng & phụ kiện chính hãng: nhớt, mũ bảo hiểm, găng tay, pô độ,...
- Dịch vụ bảo trì, bảo dưỡng & độ xe theo yêu cầu

💵 CHÍNH SÁCH BÁN HÀNG:
- Bảo hành 6–12 tháng tùy xe
- Hỗ trợ trả góp qua ngân hàng hoặc app tài chính (FE Credit, Home Credit, Momo,...)
- Hỗ trợ sang tên chính chủ toàn quốc
- Bao test máy, kiểm tra kỹ thuật trước khi giao

📸 HỖ TRỢ TRỰC TUYẾN:
- Xem xe qua video call (Zalo/FB)
- Cập nhật xe mới hàng ngày trên website và fanpage

CẢM ƠN BẠN ĐÃ GHÉ THĂM ABC MOTOR - NƠI HỘI TỤ TỐC ĐỘ & PHONG CÁCH!
`;
// GET /api/webhook - Dùng để Facebook gọi khi xác minh Webhook
router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// POST /api/webhook - Nhận tin nhắn từ Facebook gửi tới
router.post('/webhook', async (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    for (const entry of body.entry) {
      const event = entry.messaging[0];
      const senderId = event.sender.id;

      if (event.message && event.message.text) {
        const text = event.message.text;

        // Gọi Ollama để lấy câu trả lời
        const reply = await askOllama(text);

        sendMessage(senderId, reply);
      } else if (event.postback) {
        const payload = event.postback.payload;
        sendMessage(senderId, `👉 Bạn đã click: ${payload}`);
      }
    }
    return res.status(200).send('EVENT_RECEIVED');
  } else {
    return res.sendStatus(404);
  }
});

// Hàm gửi tin nhắn về cho người dùng thông qua Facebook Graph API
async function sendMessage(recipientId, messageText) {
  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        recipient: { id: recipientId },
        message: { text: messageText }
      }
    );
  } catch (error) {
    console.error('❌ Lỗi khi gửi tin nhắn:', error.response ? error.response.data : error.message);
  }
}

// Hàm hỏi Ollama
async function askOllama(message) {
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3',
      prompt: `Thông tin cửa hàng:\n${STORE_INFO}\n\nKhách hỏi: "${message}"\nHãy trả lời bằng tiếng Việt, chỉ dựa trên thông tin cửa hàng ở trên.`,
      stream: false
    });
    return response.data.response.trim();
  } catch (error) {
    console.error('❌ Lỗi Ollama:', error.response ? error.response.data : error.message);
    return "Xin lỗi, tôi không thể trả lời lúc này.";
  }
}

module.exports = router;
