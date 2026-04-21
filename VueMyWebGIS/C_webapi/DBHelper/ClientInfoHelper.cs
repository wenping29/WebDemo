
using Microsoft.AspNetCore.Http;
using System.Net;

namespace WebapiDemo.DBHelper
{
    public class ClientInfoHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly HttpRequest _request;

        // 构造函数注入 IHttpContextAccessor
        public ClientInfoHelper(HttpRequest request)
        {
            _request =  request;
        }

        public WebapiDemo.Models.Log GetClientInfo()
        {
            // 1. 读取客户端核心信息
            string clientIp = this.GetClientIp();
            var (browser, browserVersion, os) = this.GetClientBrowserAndOs();
            string requestMethod = this.GetRequestMethod();
            string requestUri = this.GetRequestUri(isFullUri: true);
            string referer = this.GetRequestHeader("Referer");
            //string jsonBody = await this.GetJsonBodyAsync();

            // 2. 输出或存储信息（如写入日志表）
            WebapiDemo.Models.Log logInfo = new WebapiDemo.Models.Log
            {
                Ip = clientIp,
                Browser = browser,
                Os = os,
                BrowserVersion = browserVersion,
                RequestMethod = requestMethod,
                RequestUri = requestUri,
                Method = "",
                Module="",
                RequestParams = "",
                ResponseContent = "",
                Content = "",
                Province = "",
                City = "",
                ExecutionTime = 0,
                CreateBy = "",
                IsDeleted = 0,
            };
            /*
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
                CreateBy = 1001, // 操作用户ID
                CreateTime = new DateTime(2025, 10, 10, 09, 45, 30), // 日志记录时间
                IsDeleted = 0 // 未删除
             
             
             */
            return logInfo;

        }

        //# 1. 读取客户端真实 IP 地址（处理代理/反向代理）
        /// <summary>
        /// 获取客户端真实 IP（支持 Nginx、Apache 等反向代理）
        /// </summary>
        public string GetClientIp()
        {
            // 1. 优先读取反向代理传递的真实 IP（如 Nginx 配置的 X-Forwarded-For）
            string ip = _request.Headers["X-Forwarded-For"].FirstOrDefault();
            if (!string.IsNullOrEmpty(ip) && ip != "unknown")
            {
                // 多个 IP 时取第一个（格式：client_ip, proxy1_ip, proxy2_ip）
                if (ip.Contains(','))
                    ip = ip.Split(',')[0].Trim();
                return ip;
            }

            // 2. 读取 X-Real-IP（部分代理使用）
            ip = _request.Headers["X-Real-IP"].FirstOrDefault();
            if (!string.IsNullOrEmpty(ip) && ip != "unknown")
                return ip;

            // 3. 读取 RemoteIpAddress（直接连接的 IP，未经过代理时生效）
            if (_request.HttpContext.Connection.RemoteIpAddress != null)
            {
                // 处理 IPv6 格式（转换为 IPv4 或直接返回）
                if (_request.HttpContext.Connection.RemoteIpAddress.AddressFamily == System.Net.Sockets.AddressFamily.InterNetworkV6)
                {
                    var ipv4 = Dns.GetHostEntry(_request.HttpContext.Connection.RemoteIpAddress).AddressList
                        .FirstOrDefault(x => x.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork);
                    if (ipv4 != null)
                        return ipv4.ToString();
                }
                return _request.HttpContext.Connection.RemoteIpAddress.ToString();
            }

            return "未知 IP";
        }

        //# 2. 读取浏览器与操作系统信息（解析 User-Agent）
        /// <summary>
        /// 解析 User-Agent，获取浏览器名称、版本、操作系统
        /// </summary>
        public (string Browser, string BrowserVersion, string Os) GetClientBrowserAndOs()
        {
            string userAgent = _request.Headers["User-Agent"].FirstOrDefault() ?? "未知";
            string browser = "未知浏览器";
            string browserVersion = "未知版本";
            string os = "未知操作系统";

            // 解析操作系统（简化版，复杂场景可使用 UserAgentUtils 等库）
            if (userAgent.Contains("Windows NT 10.0")) os = "Windows 10";
            else if (userAgent.Contains("Windows NT 6.1")) os = "Windows 7";
            else if (userAgent.Contains("Mac OS X")) os = "macOS";
            else if (userAgent.Contains("iPhone")) os = "iOS";
            else if (userAgent.Contains("Android")) os = "Android";

            // 解析浏览器（简化版）
            if (userAgent.Contains("Chrome"))
            {
                browser = "Chrome";
                // 提取版本（如 Chrome/118.0.5993.118）
                var match = System.Text.RegularExpressions.Regex.Match(userAgent, @"Chrome/(\d+\.\d+\.\d+\.\d+)");
                if (match.Success) browserVersion = match.Groups[1].Value;
            }
            else if (userAgent.Contains("Firefox"))
            {
                browser = "Firefox";
                var match = System.Text.RegularExpressions.Regex.Match(userAgent, @"Firefox/(\d+\.\d+)");
                if (match.Success) browserVersion = match.Groups[1].Value;
            }
            else if (userAgent.Contains("Safari") && !userAgent.Contains("Chrome"))
            {
                browser = "Safari";
                var match = System.Text.RegularExpressions.Regex.Match(userAgent, @"Version/(\d+\.\d+) Safari");
                if (match.Success) browserVersion = match.Groups[1].Value;
            }

            return (browser, browserVersion, os);
        }

        //# 3. 读取请求头信息
        /// <summary>
        /// 获取指定请求头的值（如 Referer、Accept 等）
        /// </summary>
        public string GetRequestHeader(string headerName)
        {
            if (string.IsNullOrEmpty(headerName)) return null;
            return _request.Headers[headerName].FirstOrDefault();
        }

        //# 4. 读取请求参数（Query/Form/Body）
        /// <summary>
        /// 获取 URL Query 参数（如 ?username=zhangsan）
        /// </summary>
        public string GetQueryParam(string paramName)
        {
            if (string.IsNullOrEmpty(paramName)) return null;
            return _request.Query[paramName].FirstOrDefault();
        }

        /// <summary>
        /// 获取表单参数（POST 表单提交）
        /// </summary>
        public async Task<string> GetFormParamAsync(string paramName)
        {
            if (string.IsNullOrEmpty(paramName) || !_request.HasFormContentType) return null;
            var form = await _request.ReadFormAsync();
            return form[paramName].FirstOrDefault();
        }

        /// <summary>
        /// 获取 JSON 请求体（需手动反序列化）
        /// </summary>
        public async Task<string> GetJsonBodyAsync()
        {
            if (!_request.ContentType?.Contains("application/json") ?? true)
                return null;

            // 读取 body 流（需重置位置，避免后续读取失败）
            _request.EnableBuffering();
            using var reader = new StreamReader(_request.Body, leaveOpen: true);
            string body = await reader.ReadToEndAsync();
            _request.Body.Position = 0; // 重置流位置
            return body;
        }

        //# 5. 读取请求基本信息（方法、URI）
        /// <summary>
        /// 获取请求方法（GET/POST/PUT/DELETE）
        /// </summary>
        public string GetRequestMethod() => _request.Method;

        /// <summary>
        /// 获取请求 URI（完整地址或相对路径）
        /// </summary>
        public string GetRequestUri(bool isFullUri = false)
        {
            if (isFullUri)
            {
                // 完整 URI（如 https://www.example.com/api/auth/login）
                return $"{_request.Scheme}://{_request.Host}{_request.Path}{_request.QueryString}";
            }
            // 相对路径（如 /api/auth/login）
            return $"{_request.Path}{_request.QueryString}";
        }
    }
}
