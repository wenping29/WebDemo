-- 创建数据库
CREATE DATABASE IF NOT EXISTS user_auth;
USE user_auth;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at DATETIME NOT NULL,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- 添加测试用户 (密码: 123456)
INSERT INTO users (username, password, email, role, created_at)
VALUES ('testuser', '$2b$10$VKYlQxJQ8h3K2vL2QZfXOO1UQK5QZJQZJQZJQZJQZJQZJQZJQZJ', 'test@example.com', 'user', NOW())
ON DUPLICATE KEY UPDATE username = username;
