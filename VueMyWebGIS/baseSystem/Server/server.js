const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 创建数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST || '192.168.2.18',
  user: process.env.DB_USER || 'PyDataStudio',
  password: process.env.DB_PASSWORD || 'admin1234',
  database: process.env.DB_NAME || 'TestDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('数据库连接成功');
    connection.release();
  } catch (err) {
    console.error('数据库连接失败:', err);
    process.exit(1);
  }
}

//testDbConnection();

// 登录接口
app.post('/api/login', async (req, res) => {
  try {
     return res.json({
      success: true,
      message: '登录成功',
      token: "asasasas",
      user: "asasad"
    });
    const { username, password } = req.body;

    // 验证请求数据
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: '用户名和密码不能为空' 
      });
    }
   

    // 查询用户
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    // 检查用户是否存在
    if (rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: '用户名或密码错误' 
      });
    }

    const user = rows[0];

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: '用户名或密码错误' 
      });
    }

    // 生成JWT令牌
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // 返回用户信息和令牌（不含密码）
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      message: '登录成功',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ 
      success: false, 
      message: '服务器内部错误' 
    });
  }
});

// 注册接口（可选，用于创建测试用户）
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email, role = 'user' } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ 
        success: false, 
        message: '用户名、密码和邮箱不能为空' 
      });
    }

    // 检查用户是否已存在
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: '用户名或邮箱已被使用' 
      });
    }

    // 密码加密
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 创建新用户
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, email, role, created_at) VALUES (?, ?, ?, ?, NOW())',
      [username, hashedPassword, email, role]
    );

    res.status(201).json({
      success: true,
      message: '用户注册成功',
      userId: result.insertId
    });

  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ 
      success: false, 
      message: '服务器内部错误' 
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
