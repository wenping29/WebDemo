const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// 保护路由：验证用户是否登录
exports.protect = async (req, res, next) => {
  let token;

  // 从请求头获取token（格式：Bearer <token>）
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 检查token是否存在
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '未授权访问，请先登录'
    });
  }

  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 将用户信息添加到请求对象
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: '无效的令牌或令牌已过期'
    });
  }
};