const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe
} = require('../controllers/authController_mongodb');
const { protect } = require('../middleware/auth');

// 公共路由
/**
* @swagger
* /api/auth/register/:
*   post:
*     summary: register
*     tags: [auth]
*     description: register
*/
router.post('/register', register);
/**
* @swagger
* /api/auth/login/:
*   post:
*     summary: login
*     tags: [auth]
*     description: login
*/
router.post('/login', login);

// 受保护路由（需要登录）
/**
* @swagger
* /api/auth/logout/:
*   post:
*     summary: logout
*     tags: [auth]
*     description: logout
*/
router.post('/logout', protect, logout);
/**
* @swagger
* /api/auth/me/:
*   get:
*     summary: me
*     tags: [auth]
*     description: me
*/
router.get('/me', protect, getMe);

module.exports = router;