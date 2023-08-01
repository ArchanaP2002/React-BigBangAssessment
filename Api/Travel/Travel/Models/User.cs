using System.ComponentModel.DataAnnotations;

namespace Travel.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string? UserName { get; set; }

        public string EmailId { get; set; }

        public string Password { get; set; }

        public string? Role { get; set; }

        public DateTime? Date { get; set; }

        public String? Address { get; set; }

        public string? PhoneNumber { get; set; }
        public string? Id_Proof { get; set; }

        public bool IsActive { get; set; }

    }
}