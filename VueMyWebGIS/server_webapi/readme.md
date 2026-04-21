1. 依赖说明：
express：Web 框架
multer：处理文件上传的中间件
cors：处理跨域请求
dotenv：环境变量管理
uuid：生成唯一文件名
2. 项目结构
plaintext
image-upload-api/
├── config/
│   └── upload.js        # 上传配置
├── controllers/
│   └── uploadController.js  # 上传控制器
├── middleware/
│   └── errorHandler.js  # 错误处理中间件
├── routes/
│   └── uploadRoutes.js  # 路由配置
├── uploads/             # 上传文件存储目录
├── .env                 # 环境变量
└── app.js               # 入口文件
3. 配置文件
.env 环境变量
env
# 服务器配置
PORT=3000
NODE_ENV=development

# 上传配置
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880  # 5MB (5*1024*1024)
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/bmp