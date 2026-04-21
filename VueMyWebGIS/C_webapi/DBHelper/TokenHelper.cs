using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebapiDemo.DBHelper
{
    public class TokenHelper
    {
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;

        // 构造函数注入 JWT 配置（从 appsettings.json 读取）
        public TokenHelper(string secretKey, string issuer, string audience)
        {
            _secretKey = secretKey;
            _issuer = issuer;
            _audience = audience;
        }

        /// <summary>
        /// 从 HTTP 请求头中提取 Token（默认格式：Bearer <token>）
        /// </summary>
        public string? ExtractTokenFromHeader(HttpRequest request)
        {
            // 获取 Authorization 头
            var authHeader = request.Headers.Authorization.FirstOrDefault();
            if (string.IsNullOrEmpty(authHeader))
                return null;

            // 验证格式是否为 Bearer <token>
            if (authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                return authHeader.Substring("Bearer ".Length).Trim();
            }

            return null;
        }

        /// <summary>
        /// 验证 Token 有效性并解析出 Claims（用户信息）
        /// </summary>
        public (bool IsValid, ClaimsPrincipal? Claims) ValidateAndParseToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_secretKey);

                // 配置 Token 验证参数
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _issuer,
                    ValidAudience = _audience,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero // 禁用默认的 5 分钟时钟偏差
                };

                // 验证并解析 Token
                var claimsPrincipal = tokenHandler.ValidateToken(
                    token,
                    validationParameters,
                    out var validatedToken
                );

                return (true, claimsPrincipal);
            }
            catch (SecurityTokenExpiredException)
            {
                // Token 已过期
                return (false, null);
            }
            catch (SecurityTokenInvalidSignatureException)
            {
                // 签名无效
                return (false, null);
            }
            catch (Exception)
            {
                // 其他验证错误（如发行者、受众无效等）
                return (false, null);
            }
        }

        /// <summary>
        /// 从 Claims 中提取用户 ID
        /// </summary>
        public int? GetUserId(ClaimsPrincipal claims)
        {
            var userIdStr = claims.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(userIdStr, out int userId))
                return userId;
            return null;
        }

        /// <summary>
        /// 从 Claims 中提取用户名
        /// </summary>
        public string? GetUsername(ClaimsPrincipal claims)
        {
            return claims.FindFirstValue(ClaimTypes.Name);
        }

        /// <summary>
        /// 从 Claims 中提取邮箱
        /// </summary>
        public string? GetEmail(ClaimsPrincipal claims)
        {
            return claims.FindFirstValue(ClaimTypes.Email);
        }
    }
}
