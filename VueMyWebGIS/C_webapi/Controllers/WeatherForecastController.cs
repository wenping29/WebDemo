using Microsoft.AspNetCore.Mvc;
using WebapiDemo.DBHelper;
using WebapiDemo.Models;

namespace WebapiDemo.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        /// <summary>
        /// 获取文本
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<string> GetText()
        {
            //MySQLHelperTest mySQLHelperTest = new MySQLHelperTest();
            //mySQLHelperTest.CreateDataBase();
            return "Hello World!";
        }
        /// <summary>
        /// 两数相加
        /// </summary>
        /// <param name="num1">第一个数</param>
        /// <param name="num2">第二个数</param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<int> SumAdd(int num1, int num2)
        {
            return num1 + num2;
        }

        /// <summary>
        /// 两数相减
        /// </summary>
        /// <param name="param">参数</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<int> Subtract(Param param)
        {
            int result = param.num1 - param.num2;
            return result;
        }

        [HttpPost]
        public async Task<JsonResult> AAA(int? a, int? b)
        {
            if (a == null || b == null)
                return new JsonResult(new { code = 0, result = "aaaaaaaa" });
            return new JsonResult(new { code = 200, result = a + "|" + b });
        }

        // 增加一个类型
        public class AppJson    {        
            public int? a { get; set; }        
            public int? b { get; set; }    
        }    
        [HttpPost("bbb")]   
        public async Task<JsonResult> BBB([FromBody]AppJson ss)    
        {       
            if (ss.a == null || ss.b == null)             
                return new JsonResult(new { code = 0, result = "aaaaaaaa" });        
            return new JsonResult(new { code = 2000, result = ss.a + "|" + ss.b });   
        }

    }
}