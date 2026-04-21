using Dapper;
using WebapiDemo.DBHelper;
using WebapiDemo.Models;

namespace WebapiDemo.Services
{
    public class LoggerService
    {
        private readonly string _dbConnectionString;
        private readonly DbConnection _dbConnection;
        private readonly IConfiguration _configuration;

        public LoggerService(DbConnection dbConnection, IConfiguration configuration)
        {
            _dbConnection = dbConnection;
            _configuration = configuration;
        }
        public async Task<int?> AddLog(Log log)
        {
            return await AddLogByUserCreaterAsync(log);
        }
         
        private async Task<int> AddLogByUserCreaterAsync(WebapiDemo.Models.Log log)
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                connection.Open();
                // 可以使用LogSqlTemplates进行统一管理sql模板
                string sql = @"INSERT INTO log (
                    module, requestMethod, requestParams, responseContent, content, requestUri,
                    method, ip, province,city, executionTime, browser, browserVersion, os, createBy, createTime,isDeleted) 
                    VALUES (
                    @Module, @RequestMethod, @RequestParams, @ResponseContent, @Content, @RequestUri, 
                    @Method,@Ip, @Province, @City, @ExecutionTime, @Browser, @BrowserVersion, @Os, @CreateBy, NOW(), @IsDeleted
                    );SELECT LAST_INSERT_ID();";
                return await connection.QuerySingleAsync<int>(sql,log);
                connection.Dispose();
            }
        }
        private async Task<User?> GetLogByUserCreaterAsync(int id)
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                connection.Open();
                return await connection.QueryFirstOrDefaultAsync<User>(
                    "SELECT * FROM log WHERE CreateBy = @Id",
                    new { Id = id }
                );
            }
        }
    }
}
