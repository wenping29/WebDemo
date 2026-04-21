// Services/IFileUploadService.cs
using WebapiDemo.Models;
using Microsoft.AspNetCore.Http;
//using WebapiDemo.Models;
// Services/FileUploadService.cs
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
//using WebapiDemo.Models;
using System.IO;
using System.Linq;


namespace WebapiDemo.Services;

public interface IFileUploadService
{
    Task<UploadResult> UploadSingleFileAsync(IFormFile file, HttpRequest request);
    Task<UploadResult> UploadMultipleFilesAsync(List<IFormFile> files, HttpRequest request);
} 

public class FileUploadService : IFileUploadService
{
    private readonly string _uploadFolder;
    private readonly long _maxFileSizeBytes;
    private readonly List<string> _allowedContentTypes;

    public FileUploadService(IConfiguration config)
    {
        // 从配置读取参数
        _uploadFolder = config["AppSettings:UploadFolder"] ?? "wwwroot/uploads";
        _maxFileSizeBytes = long.Parse(config["AppSettings:MaxFileSizeMB"] ?? "5") * 1024 * 1024;
        _allowedContentTypes = config.GetSection("AppSettings:AllowedImageTypes")
            .Get<List<string>>() ?? new List<string>();

        // 确保上传目录存在
        if (!Directory.Exists(_uploadFolder))
        {
            Directory.CreateDirectory(_uploadFolder);
        }
    }

    /// <summary>
    /// 单文件上传
    /// </summary>
    public async Task<UploadResult> UploadSingleFileAsync(IFormFile file, HttpRequest request)
    {
        if (file == null || file.Length == 0)
        {
            return new UploadResult { Success = false, Message = "未选择文件或文件为空" };
        }

        // 验证文件
        var validation = ValidateFile(file);
        if (!validation.Success)
        {
            return validation;
        }

        // 处理文件并返回结果
        var fileInfo = await ProcessFileAsync(file, request);
        return new UploadResult
        {
            Success = true,
            Message = "文件上传成功",
            Files = new List<FileInfoDto> { fileInfo }
        };
    }

    /// <summary>
    /// 多文件上传
    /// </summary>
    public async Task<UploadResult> UploadMultipleFilesAsync(List<IFormFile> files, HttpRequest request)
    {
        if (files == null || !files.Any() || files.All(f => f.Length == 0))
        {
            return new UploadResult { Success = false, Message = "未选择有效文件" };
        }

        var resultFiles = new List<FileInfoDto>();
        var errorMessages = new List<string>();

        foreach (var file in files)
        {
            if (file.Length == 0)
            {
                errorMessages.Add($"文件 {file.FileName} 为空，已跳过");
                continue;
            }

            // 验证单个文件
            var validation = ValidateFile(file);
            if (!validation.Success)
            {
                errorMessages.Add($"{file.FileName}：{validation.Message}");
                continue;
            }

            // 处理文件
            var fileInfo = await ProcessFileAsync(file, request);
            resultFiles.Add(fileInfo);
        }

        // 构建返回结果
        var message = resultFiles.Any()
            ? $"成功上传 {resultFiles.Count} 个文件"
            : "所有文件上传失败";

        if (errorMessages.Any())
        {
            message += "，错误：" + string.Join("；", errorMessages);
        }

        return new UploadResult
        {
            Success = resultFiles.Any(),
            Message = message,
            Files = resultFiles
        };
    }

    /// <summary>
    /// 验证文件合法性
    /// </summary>
    private UploadResult ValidateFile(IFormFile file)
    {
        // 验证文件类型
        if (!_allowedContentTypes.Contains(file.ContentType))
        {
            return new UploadResult
            {
                Success = false,
                Message = $"不支持的文件类型：{file.ContentType}，允许类型：{string.Join(",", _allowedContentTypes)}"
            };
        }

        // 验证文件大小
        if (file.Length > _maxFileSizeBytes)
        {
            return new UploadResult
            {
                Success = false,
                Message = $"文件大小超过限制（最大 {_maxFileSizeBytes / 1024 / 1024}MB）"
            };
        }

        return new UploadResult { Success = true };
    }

    /// <summary>
    /// 处理文件（保存并生成信息）
    /// </summary>
    private async Task<FileInfoDto> ProcessFileAsync(IFormFile file, HttpRequest request)
    {
        // 生成唯一文件名（避免覆盖）
        var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
        var filePath = Path.Combine(_uploadFolder, uniqueFileName);

        // 保存文件
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // 生成访问URL
        var baseUrl = $"{request.Scheme}://{request.Host}";
        var relativePath = filePath.Replace("wwwroot", "").Replace(Path.DirectorySeparatorChar, '/');
        var accessUrl = $"{baseUrl}{relativePath}";

        return new FileInfoDto
        {
            FileName = uniqueFileName,
            OriginalName = file.FileName,
            SizeBytes = file.Length,
            ContentType = file.ContentType,
            FilePath = filePath,
            AccessUrl = accessUrl
        };
    }
}