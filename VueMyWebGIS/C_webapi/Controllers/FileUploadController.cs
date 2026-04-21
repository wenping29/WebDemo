// Controllers/FileUploadController.cs
using WebapiDemo.Models;
using WebapiDemo.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using WebapiDemo.Models;

namespace WebapiDemo.Controllers
{



    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly IFileUploadService _uploadService;

        public FileUploadController(IFileUploadService uploadService)
        {
            _uploadService = uploadService;
        }

        /// <summary>
        /// 单文件上传
        /// </summary>
        /// <param name="file">图片文件</param>
        /// <returns>上传结果</returns>
        [HttpPost("single")]
        public async Task<ActionResult<UploadResult>> UploadSingle(IFormFile file)
        {
            var result = await _uploadService.UploadSingleFileAsync(file, Request);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        /// <summary>
        /// 多文件上传
        /// </summary>
        /// <param name="files">图片文件集合</param>
        /// <returns>上传结果</returns>
        [HttpPost("multiple")]
        public async Task<ActionResult<UploadResult>> UploadMultiple(List<IFormFile> files)
        {
            var result = await _uploadService.UploadMultipleFilesAsync(files, Request);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        /// <summary>
        /// 带额外参数的文件上传
        /// </summary>
        /// <param name="description">文件描述（示例额外参数）</param>
        /// <param name="file">图片文件</param>
        /// <returns>上传结果</returns>
        [HttpPost("with-params")]
        public async Task<ActionResult<UploadResult>> UploadWithParams(
            [FromForm] string description,
            [FromForm] IFormFile file)
        {
            // 可以在这里处理额外参数（如保存描述到数据库等）
            var result = await _uploadService.UploadSingleFileAsync(file, Request);

            // 在结果中附加额外参数
            if (result.Success)
            {
                result.Message += $"，描述：{description}";
            }

            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}