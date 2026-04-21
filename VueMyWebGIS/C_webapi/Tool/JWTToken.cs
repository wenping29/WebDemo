using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web;

namespace VueTestWeb.Tool
{
    public static class JWTToken
    {
        public static string Get(string name,string email="",string sub="")
        {
            //创建声明Token数组
            var claim = new Claim[]
            {
                new Claim(ClaimTypes.Name, name),
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(JwtRegisteredClaimNames.Sub, sub)
            };
            //实例化一个token对象
            var token = new JwtSecurityToken(claims: claim);
            //生成token
            string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return  jwtToken;
        }
    }

}