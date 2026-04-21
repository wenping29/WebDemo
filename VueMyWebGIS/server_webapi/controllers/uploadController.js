const path = require('path');
require('dotenv').config();

// 单文件上传处理
exports.uploadSingleImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: '未选择上传文件'
      });
    }

    // 构建文件访问URL
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: '文件上传成功',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

// 多文件上传处理
exports.uploadMultipleImages = (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: '未选择上传文件'
      });
    }

    // 处理多个文件
    const files = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    }));

    res.status(200).json({
      success: true,
      message: `成功上传 ${files.length} 个文件`,
      total: files.length,
      data: files
    });
  } catch (error) {
    next(error);
  }
};