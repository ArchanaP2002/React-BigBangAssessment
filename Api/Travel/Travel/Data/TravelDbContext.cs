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
     }
}
