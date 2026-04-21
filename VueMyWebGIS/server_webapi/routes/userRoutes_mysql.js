const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateUser
} = require('../controllers/userController_mysql');
const { protect } = require('../middleware/auth');

// 公共路由
/**
* @swagger
* /api/users/register/:
*   post:
*     summary: 获取某些内容
*     tags: [users_mysql]
*     description: 获取某些内容的示例请求
*/
router.post('/register', register);
/**
* @swagger
* /api/users/login/:
*   post:
*     summary: login
*     tags: [users_mysql]
*     description: login
*/
router.post('/login', login);

// 受保护路由（需要登录）
/**
* @swagger
* /api/users/me/:
*   get:
*     summary: me
*     tags: [users_mysql]
*     description: me
*/
router.get('/me', protect, getMe);
/**
* @swagger
* /api/users/update/:
*   put:
*     summary: update
*     tags: [users_mysql]
*     description: update
*/
router.put('/update', protect, updateUser);

module.exports = router;