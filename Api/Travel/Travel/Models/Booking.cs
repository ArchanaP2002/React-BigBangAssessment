using System.ComponentModel.DataAnnotations;

namespace Travel.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        public int? UserId { get; set; }

        public int? PackageId { get; set; }

        public int? NumberOfPeople { get; set; }

        public DateTime? DateOfTheTrip { get; set; }

        public decimal? TotalAmount { get; set; }

        public DateTime? DateOfBooking { get; set; }

        public virtual Packages? Package { get; set; }

        public virtual User? User { get; set; }

    }
}
