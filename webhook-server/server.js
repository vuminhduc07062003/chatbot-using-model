require('dotenv').config(); // Tải các biến môi trường từ .env
const express = require('express');
const { json } = require('body-parser');
const router = require('../webhook-server/src/routes/router'); // Đảm bảo đường dẫn đúng đến file router của bạn

const app = express();

// Sử dụng middleware để phân tích dữ liệu body JSON
app.use(json());

// Dùng router đã định nghĩa ở trên cho các yêu cầu API
app.use('/api', router);

// Lắng nghe cổng từ biến môi trường hoặc mặc định là 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
  console.log('VERIFY_TOKEN:', process.env.VERIFY_TOKEN); // Thêm dòng này để kiểm tra
});
