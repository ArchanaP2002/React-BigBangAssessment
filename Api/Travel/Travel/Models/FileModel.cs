namespace Travel.Models
{
    public class FileModel
    {
        public int Id { get; set; }

        //public int? UserId { get; set; }
        public string? ImageDetail { get; set; }
        public IFormFile? FormFile { get; set; }
    }
}
