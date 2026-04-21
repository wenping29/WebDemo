const express = require('express');
const cors = require('cors');
const path = require('path');
const { swaggerUi, swaggerSpec } = require('./swagger');

require('dotenv').config();

// 导入路由和中间件
const uploadRoutes = require('./routes/uploadRoutes');
const errorHandler = require('./middleware/errorHandler');

// 导入配置和路由

const authRoutes_mongodb = require('./routes/authRoutes_mongodb');
// 导入路由
const userRoutes_mysql = require('./routes/userRoutes_mysql');


const app = express();
const PORT = process.env.PORT || 3000;

// 连接数据库mongodb
// const connectDB = require('./config/db_mongodb');
// connectDB();

// 中间件
app.use(cors());
app.use(express.json());

// 静态文件服务（让客户端可以访问上传的图片）
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR)));

// 路由// 路由配置
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes_mongodb);
app.use('/api/users', userRoutes_mysql);

// 错误处理中间件
app.use(errorHandler);

// 配置 Swagger UI 路由
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});