namespace Travel.Models
{
    public class Hotel
    {
        public int HotelId { get; set; }

        public int? PackageId { get; set; }

        public string? HotelName { get; set; }

        public decimal? HotelRating { get; set; }

        public decimal? HotelPrice { get; set; }

        public string? HotelsImage { get; set; }

        public virtual Packages? Package { get; set; }
    }
}
