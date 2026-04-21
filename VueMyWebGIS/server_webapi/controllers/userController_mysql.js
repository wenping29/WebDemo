const db = require('../config/db_mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 生成 JWT 令牌
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    注册新用户
// @route   POST /api/users/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 验证输入
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: '请填写所有必填字段'
      });
    }

    // 检查邮箱是否已存在
    const [existingUsers] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: '该邮箱已被注册'
      });
    }

    // 密码加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建用户
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // 返回用户信息和令牌
    res.status(201).json({
      success: true,
      token: generateToken(result.insertId),
      user: {
        id: result.insertId,
        name,
        email
      }
    });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
};

// @desc    用户登录
// @route   POST /api/users/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;

    // 验证输入
    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: '请输入邮箱和密码'
      });
    }

    // 查找用户
    const [users] = await db.execute(
      'SELECT * FROM users WHERE name = ?',
      [name]
    );
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: '邮箱或密码不正确'
      });
    }
    const user = users[0];

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: '邮箱或密码不正确'
      });
    }

    // 返回令牌和用户信息
    res.status(200).json({
      success: true,
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
};

// @desc    获取当前登录用户信息
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }

    res.status(200).json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
};

// @desc    更新用户信息
// @route   PUT /api/users/update
// @access  Private
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    // 验证输入
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: '请填写姓名和邮箱'
      });
    }

    // 检查邮箱是否被其他用户使用
    const [existingUsers] = await db.execute(
      'SELECT * FROM users WHERE email = ? AND id != ?',
      [email, userId]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: '该邮箱已被使用'
      });
    }

    // 更新用户信息
    await db.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, userId]
    );

    // 返回更新后的用户信息
    const [updatedUsers] = await db.execute(
      'SELECT id, name, email FROM users WHERE id = ?',
      [userId]
    );

    res.status(200).json({
      success: true,
      data: updatedUsers[0]
    });
  } catch (error) {
    console.error('更新用户失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
};