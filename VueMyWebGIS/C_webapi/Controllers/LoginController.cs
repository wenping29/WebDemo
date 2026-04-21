using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;
using VueTestWeb.Tool;
using WebapiDemo.Attributes;
using WebapiDemo.DBHelper;
using WebapiDemo.Models;
using WebapiDemo.Services;
using WebApplication1.Models;

namespace WebapiDemo.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    //[CrossDomainActionFilter]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly TokenHelper tokenHelper;
        public LoginController(IAuthService authSe, TokenHelper tokenH)
        {
            authService = authSe;
            tokenHelper = tokenH;
        }
        [HttpGet]
        public ActionResult<JObject> Details()
        {
            var data = new
            {
                id = 1,
                name = "Lucy",
                address = "珠穆朗玛峰",
                time = DateTime.Now
            };
            JObject str = JObject.FromObject(data);
            Console.WriteLine(str);
            return str;
        }

        [HttpGet("QueryString")]
        public string QueryStringTest([FromQuery] int id, [FromQuery] string wd)
        {
            return id.ToString() + ", " + wd;
        }

        [HttpPost("Form")]
        public string FormTest([FromForm] int id, [FromForm] string wd)
        {
            return id.ToString() + ", " + wd;
        }

        //返回json数据
        [HttpPost]
        public async Task<IActionResult> UserLogin([FromBody] LoginRequest req)
        {
            req.Name = "testuser";
            req.Email = "test@example.com";
            req.Password = "add";
            //允许跨域请求
            //HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var result =  await authService.LoginAsync(req, Request);
             
            //Ok方法将自动序列化result对象为JSON格式，并设置正确的Content-Type标头以指示响应的媒体类型为application/json
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> UserRegister([FromBody] RegisterRequest req)
        {
            req.Username = "testuser1";
            req.Email = "test1@example.com";
            req.Password = "add";
            //允许跨域请求
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var result = await authService.RegisterAsync(req);
            //Ok方法将自动序列化result对象为JSON格式，并设置正确的Content-Type标头以指示响应的媒体类型为application/json
            return Ok(result);
        }

        //成功
        /// <summary>
        /// 手动解析请求中的 Token（不依赖 [Authorize] 特性）
        /// </summary>
        [HttpGet("parse-token")]
        public ActionResult<string> GetToken()
        {
            var token = tokenHelper.ExtractTokenFromHeader(Request);

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "请求头中未包含有效的 Token（格式：Bearer <token>）" });
            }

            // 2. 验证并解析 Token
            var (isValid, claims) = tokenHelper.ValidateAndParseToken(token);
            if (!isValid || claims == null)
            {
                return Unauthorized(new { message = "Token 无效或已过期" });
            }

            // 3. 提取用户信息
            var userId = tokenHelper.GetUserId(claims);
            var username = tokenHelper.GetUsername(claims);
            var email = tokenHelper.GetEmail(claims);

            // 4. 返回解析结果
            return Ok(new
            {
                message = "Token 解析成功",
                token,
                userInfo = new
                {
                    userId,
                    username,
                    email,
                    // 可以提取所有 claims
                    allClaims = claims.Claims.Select(c => new { c.Type, c.Value })
                }
            });
        }
         
        /// <summary>
        /// 通过 [Authorize] 特性自动验证 Token，从 User 中获取信息
        /// </summary>
        [Authorize] // 自动验证 Token，无效则返回 401
        [HttpGet("authorized-data")]
        public ActionResult<string> Test()
        {
            //return "Test";
            // User 是 ControllerBase 的属性，已通过 [Authorize] 验证并填充
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var username = User.FindFirstValue(ClaimTypes.Name);
            var email = User.FindFirstValue(ClaimTypes.Email);

            return Ok(new
            {
                message = "通过 Authorize 特性验证",
                userInfo = new
                {
                    userId,
                    username,
                    email
                }
            });
        }
    }
}
