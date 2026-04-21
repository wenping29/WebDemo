const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../config/upload');

// 单文件上传 (字段名: image)
/**
 * @swagger
 * /api/upload/single:
 *   post:
 *     summary: 单文件上传 (字段名image)
 *     tags: [upload]
 *     description: 单文件上传
 *     responses:
 *       200:
 *         description: 成功获取内容
 *       401:
 *         description: 未经授权
 *       500:
 *         description: 服务器错误
 */
router.post('/single', upload.single('image'), uploadController.uploadSingleImage);

// 多文件上传 (字段名: images，最多5个)
/**
 * @swagger
 * /api/upload/multiple:
 *   post:
 *     summary:  多文件上传 (字段名images，最多5个)
 *     tags: [upload]
 *     description:  多文件上传
 *     responses:
 *       200:
 *         description: 成功获取内容
 *       401:
 *         description: 未经授权
 *       500:
 *         description: 服务器错误
 */
router.post('/multiple', upload.array('images', 5), uploadController.uploadMultipleImages);

// 根路由
/**
* @swagger
* /api/upload/:
*   get:
 *     summary: 获取某些内容
 *     tags: [upload]
 *     description: 获取某些内容的示例请求
*/
router.get('/', (req, res) => {
  res.json({ message: '图片上传API服务运行中' });
});

module.exports = router;