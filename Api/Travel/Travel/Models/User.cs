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

     
        public virtual ICollection<Booking> BookingTrips { get; set; } = new List<Booking>();

        public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

        public virtual ICollection<Packages> Packages { get; set; } = new List<Packages>();
        public virtual ICollection<ImageGallary> ImageGallaries { get; set; } = new List<ImageGallary>();
        public virtual ICollection<Contact>  Contacts { get; set; } = new List<Contact>();



    }
}