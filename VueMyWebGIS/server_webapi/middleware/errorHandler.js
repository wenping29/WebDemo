const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // multer错误处理
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: `文件大小超过限制，最大支持 ${(parseInt(process.env.MAX_FILE_SIZE) / 1024 / 1024).toFixed(2)}MB`
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || '服务器内部错误'
  });
};

module.exports = errorHandler;