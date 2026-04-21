using Microsoft.AspNetCore.Mvc.Filters;

namespace WebapiDemo.Attributes
{
    public class CrossDomainActionFilterAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            //允许跨域请求
            context.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}
