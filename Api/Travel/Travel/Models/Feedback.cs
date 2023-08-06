using System.ComponentModel.DataAnnotations;

namespace Travel.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Message { get; set; }
        public string? Rating { get; set; }
        public DateTime DateSubmitted { get; set; }
        public virtual User? User { get; set; }

    }
}
