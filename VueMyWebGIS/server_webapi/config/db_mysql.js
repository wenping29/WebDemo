const mysql = require('mysql2/promise');
require('dotenv').config();

// 创建数据库连接池（推荐使用连接池提高性能）
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,  // 最大连接数
  queueLimit: 0
});

// 测试数据库连接
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL 数据库连接成功');
    connection.release();
  } catch (error) {
    console.error('数据库连接失败__:', error.message);
    process.exit(1);  // 连接失败退出进程
  }
}

testConnection();

module.exports = pool;