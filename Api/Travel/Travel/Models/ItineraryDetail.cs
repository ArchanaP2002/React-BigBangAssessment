using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Travel.Models
{
    public class ItineraryDetail
    {
        [Key]
        public int ItineraryId { get; set; }

        public int? PackageId { get; set; }

        public string? DayNumber { get; set; }

        public string? Activities { get; set; }

        public string? Time { get; set; }

        public string? ItineraryPlace { get; set; }

        public string? ItineraryImage { get; set; }

        [NotMapped]
        public IFormFile? ItineraryImg { get; set; } // Add this property
    }
}
