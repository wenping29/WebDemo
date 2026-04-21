namespace WebapiDemo.Models
{
    public class UploadResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<FileInfoDto>? Files { get; set; }
    }

    public class FileInfoDto
    {
        public string FileName { get; set; } = string.Empty;
        public string OriginalName { get; set; } = string.Empty;
        public long SizeBytes { get; set; }
        public string ContentType { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public string AccessUrl { get; set; } = string.Empty;
    }
}
