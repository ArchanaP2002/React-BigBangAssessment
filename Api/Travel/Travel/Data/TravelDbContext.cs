using Microsoft.EntityFrameworkCore;
using Travel.Models;

namespace Travel.Data
{
    public class TravelDbContext : DbContext
    {
        public TravelDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User>Users { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ImageGallary> ImageGallaries { get; set;}
        public DbSet<Hotel> Hotel { get; set; }
        public DbSet<Packages> Packages { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<ItineraryDetail> ItineraryDetail { get; set; }
     }
}
