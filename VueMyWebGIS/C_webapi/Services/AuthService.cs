
using Dapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebapiDemo.DBHelper;
using WebapiDemo.Models;
using WebApplication1.Models;

namespace WebapiDemo.Services
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request, HttpRequest request1);
    }

    public class RegisterRequest
    {
        [Required(ErrorMessage = "用户名不能为空")]
        [MinLength(3, ErrorMessage = "用户名长度不能少于3个字符")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "邮箱不能为空")]
        [EmailAddress(ErrorMessage = "请输入有效的邮箱地址")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "密码不能为空")]
        [MinLength(6, ErrorMessage = "密码长度不能少于6个字符")]
        public string Password { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Birthdate { get; set; } = string.Empty;
        public string Sex { get; set; } = string.Empty;
        public string TellPhone { get; set; } = string.Empty;
        public string CrID { get; set; } = string.Empty;
    }

    public class LoginRequest
    {
        [Required(ErrorMessage = "邮箱不能为空")]
        [EmailAddress(ErrorMessage = "请输入有效的邮箱地址")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "名称不能为空")]
        //[EmailAddress(ErrorMessage = "请输入有效的名称")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "密码不能为空")]
        [MinLength(6, ErrorMessage = "密码长度不能少于6个字符")]
        public string Password { get; set; } = string.Empty;
    }

    public class AuthResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? Token { get; set; }
        public User? User { get; set; }
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        //public string Password { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class AuthService : IAuthService
    {
        private readonly string _dbConnectionString;
        private readonly DBHelper.DbConnection _dbConnection;
        private readonly IConfiguration _configuration;

        public AuthService(DBHelper.DbConnection dbConnection, IConfiguration configuration)
        {
            _dbConnection = dbConnection;
            _configuration = configuration;
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request, HttpRequest request1)
        {
            //throw new NotImplementedException();
            // 根据邮箱查询用户
            var user = await GetUserByUsernameAsync(request.Name);
            if (user == null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "邮箱或密码不正确"
                };
            }
            
            // 验证密码
            var isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isPasswordValid)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "邮箱或密码不正确"
                };
            }

            // 生成JWT令牌
            var token = GenerateJwtToken(user);

            var result = new AuthResponse
            {
                Success = true,
                Message = "登录成功",
                Token = token,
                User = user
            };

            Log log = new ClientInfoHelper(request1).GetClientInfo();
            log.Method = "LoginController." + "UserLogin";
            log.Module = "登录";
            log.Content = result.Message;
            log.ResponseContent = JsonConvert.SerializeObject(result);
            log.CreateBy = request.Name;

            LoggerService loggerService = new LoggerService(_dbConnection, _configuration);
            loggerService.AddLog(log);

            return result;
        }
        // 生成JWT令牌
        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]!));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            // 定义Claims（用户信息）
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Username)
        };

            // 创建令牌
            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(double.Parse(jwtSettings["ExpiresInMinutes"]!)),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        // 辅助方法：根据ID查询用户
        private async Task<User?> GetUserByIdAsync(int id)
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                connection.Open();
                return await connection.QueryFirstOrDefaultAsync<User>(
                    "SELECT * FROM users WHERE id = @Id",
                    new { Id = id }
                );
            }
        }

        // 辅助方法：根据用户名查询用户
        private async Task<User?> GetUserByUsernameAsync(string username)
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                connection.Open();
                return await connection.QueryFirstOrDefaultAsync<User>(
                    "SELECT * FROM users WHERE username = @Username",
                    new { Username = username }
                );
            }
        }
        private async Task<User?> GetUserByEmailAsync(string name)
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                connection.Open();
                return await connection.QueryFirstOrDefaultAsync<User>(
                    "SELECT * FROM users WHERE username = @Email",
                    new { Email = name }
                );
            }
        }

        private async Task<int?> CreateUserAsync(RegisterRequest request, string passwordHash)
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                connection.Open();
                var sql = @"
                    INSERT INTO users (username, email, passwordhash, password, updated_at, created_at)
                    VALUES (@Username, @Email, @PasswordHash, @Password, NOW(), NOW());
                    SELECT LAST_INSERT_ID();
                ";

                var userId = await connection.QuerySingleAsync<int>(sql, new
                {
                    request.Username,
                    request.Email,
                    PasswordHash = passwordHash,
                    Password = passwordHash
                });

                return userId;
            }
            }
        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            // 检查用户名是否已存在
            var existingUser = await GetUserByUsernameAsync(request.Username);
            if (existingUser != null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "用户名已被注册"
                };
            }
            // 检查邮箱是否已存在
            var existingEmail = await GetUserByEmailAsync(request.Username);
            if (existingEmail != null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "用户名已被注册"
                };
            }
            // 密码加密
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // 创建用户
            int existinguserId = (int)await CreateUserAsync(request, passwordHash);

            // 获取创建的用户
            var newUser = await GetUserByIdAsync(existinguserId);
            if (newUser == null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "注册失败，无法获取用户信息"
                };
            }
            // 生成JWT令牌
            var token = GenerateJwtToken(newUser);
            return new AuthResponse
            {
                Success = true,
                Message = "注册成功",
                Token = token,
                User = newUser
            };
        }
    }
}
