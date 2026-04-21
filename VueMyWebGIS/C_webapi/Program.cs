// Services/Program.cs
using WebapiDemo.DBHelper;
using WebapiDemo.Services;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 注册 TokenHelper（从配置文件读取 JWT 参数）
builder.Services.AddSingleton<TokenHelper>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    return new TokenHelper(
        secretKey: config["JwtSettings:SecretKey"] ?? "",
        issuer: config["JwtSettings:Issuer"] ?? "",
        audience: config["JwtSettings:Audience"] ?? ""
    );
});

// 注册文件上传服务
builder.Services.AddScoped<IFileUploadService, FileUploadService>();
// 注册数据库连接服务
builder.Services.AddScoped<DbConnection>();
// 注册认证服务
builder.Services.AddScoped<IAuthService, AuthService>();

string[] urls = new[] { "http://120.46.187.50:5000", "http://localhost:3001" };
//注册跨域请求CORS服务
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins(urls).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });

    //options.AddPolicy("AllowAllOrigins", policy =>
    //{
    //    policy.AllowAnyOrigin()
    //    .AllowAnyMethod()
    //    .AllowAnyHeader();
    //});
});

var app = builder.Build();
// Configure the HTTP request pipeline.
//开发环境才显示swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 配置静态文件中间件（允许访问上传的图片）
app.UseStaticFiles();
// 路由与端点配置
app.UseRouting();
//启用Cors中间件
app.UseCors("AllowSpecificOrigins");
//app.UseHttpsRedirection();
// app.UseAuthentication();  // 启用认证
app.UseAuthorization();

app.MapControllers();

app.Run();
