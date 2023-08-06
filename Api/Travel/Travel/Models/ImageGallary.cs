namespace Travel.Models
{
    public class ImageGallary
    {
        public int Id { get; set; }

        public int? UserId { get; set; }

        public string? ImagePath { get; set; }

        public string? ImageDetails { get; set; }

        public virtual User? User { get; set; }
    }
}
