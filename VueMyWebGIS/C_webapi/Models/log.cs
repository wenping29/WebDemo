using System;

namespace WebapiDemo.Models
{
    /// <summary>
    /// 系统操作日志实体类（对应数据库 log 表）
    /// </summary>
    public class Log
    {
        /// <summary>
        /// 主键ID（自增）
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 日志模块（如：用户管理、订单操作等）
        /// </summary>
        public string Module { get; set; }

        /// <summary>
        /// 请求方式（GET/POST/PUT/DELETE等）
        /// </summary>
        public string RequestMethod { get; set; }

        /// <summary>
        /// 请求参数（JSON格式或表单数据）
        /// </summary>
        public string RequestParams { get; set; }

        /// <summary>
        /// 返回参数（接口响应内容）
        /// </summary>
        public string ResponseContent { get; set; }

        /// <summary>
        /// 日志内容（操作描述）
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// 请求URI（接口地址）
        /// </summary>
        public string RequestUri { get; set; }

        /// <summary>
        /// 调用的方法名（如：UserController.Login）
        /// </summary>
        public string Method { get; set; }

        /// <summary>
        /// 客户端IP地址
        /// </summary>
        public string Ip { get; set; }

        /// <summary>
        /// IP所属省份
        /// </summary>
        public string Province { get; set; }

        /// <summary>
        /// IP所属城市
        /// </summary>
        public string City { get; set; }

        /// <summary>
        /// 执行时间（毫秒）
        /// </summary>
        public long? ExecutionTime { get; set; }

        /// <summary>
        /// 客户端浏览器（如：Chrome、Firefox）
        /// </summary>
        public string Browser { get; set; }

        /// <summary>
        /// 浏览器版本
        /// </summary>
        public string BrowserVersion { get; set; }

        /// <summary>
        /// 终端操作系统（如：Windows 10、iOS 16）
        /// </summary>
        public string Os { get; set; }

        /// <summary>
        /// 创建人ID（操作人ID）
        /// </summary>
        public string? CreateBy { get; set; }

        /// <summary>
        /// 创建时间（日志记录时间）
        /// </summary>
        public DateTime? CreateTime { get; set; }

        /// <summary>
        /// 逻辑删除标识（0-未删除，1-已删除）
        /// </summary>
        public int? IsDeleted { get; set; }
    }

    public class LogDemo
    {
        public static Log GetSampleLog()
        {
            return new Log
            {
                // Id 由数据库自增，此处无需赋值
                Module = "用户管理",
                RequestMethod = "POST",
                RequestParams = "{\"username\":\"zhangsan\",\"password\":\"******\",\"rememberMe\":true}", // 密码脱敏
                ResponseContent = "{\"code\":200,\"msg\":\"登录成功\",\"data\":{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\"userId\":1001}}",
                Content = "用户登录成功",
                RequestUri = "/api/auth/login",
                Method = "AuthController.Login",
                Ip = "113.124.78.215",
                Province = "江苏省",
                City = "南京市",
                ExecutionTime = 286, // 执行耗时286毫秒
                Browser = "Chrome",
                BrowserVersion = "118.0.5993.118",
                Os = "Windows 10",
                CreateBy = "", // 操作用户ID
                CreateTime = new DateTime(2025, 10, 10, 09, 45, 30), // 日志记录时间
                IsDeleted = 0 // 未删除
            };
        }

    }

}
