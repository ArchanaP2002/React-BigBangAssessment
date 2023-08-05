using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Travel.Data;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Repository.Services
{
    public class HotelService : IHotel
    {
        private readonly TravelDbContext _dbcontext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public HotelService(TravelDbContext dbcontext, IWebHostEnvironment hostEnvironment)
        {
            _dbcontext = dbcontext;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<List<Hotel>> GetHotels()
        {
            var images = _dbcontext.Hotel.ToList();
            var imageList = new List<Hotel>();
            foreach (var image in images)
            {
                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "Hotel");
                var filePath = Path.Combine(uploadsFolder, image.HotelsImage);

                var imageBytes = System.IO.File.ReadAllBytes(filePath);
                var tourData = new Hotel
                {
                    HotelId = image.HotelId,
                    PackageId = image.PackageId,
                    HotelName = image.HotelName,
                    HotelRating = image.HotelRating,
                    HotelPrice = image.HotelPrice,
                    HotelsImage = Convert.ToBase64String(imageBytes)
                };
                imageList.Add(tourData);
            }
            return imageList;
        }

        public async Task<Hotel> GetHotel(int id)
        {
            var images = _dbcontext.Hotel.ToList();
            Hotel hotelget = images.SingleOrDefault(p => p.HotelId == id);
            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "Hotel");
            var filePath = Path.Combine(uploadsFolder, hotelget.HotelsImage);

            var imageBytes = System.IO.File.ReadAllBytes(filePath);
            var tourData = new Hotel
            {
                HotelId = hotelget.HotelId,
                PackageId = hotelget.PackageId,
                HotelName = hotelget.HotelName,
                HotelRating = hotelget.HotelRating,
                HotelPrice = hotelget.HotelPrice,
                HotelsImage = Convert.ToBase64String(imageBytes)
            };
            return tourData;
        }

        public async Task<List<Hotel>> PostHotel([FromForm] HotelImg hotel)
        {
            string ImagePath = await SaveHotelImage(hotel.HotelImage);
            var hot = new Hotel();
            hot.PackageId = hotel.PackageId;
            hot.HotelName = hotel.HotelName;
            hot.HotelRating = hotel.HotelRating;
            hot.HotelPrice = hotel.HotelPrice;
            hot.HotelsImage = ImagePath;
            var obj = await _dbcontext.Hotel.AddAsync(hot);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Hotel.ToListAsync();
        }

        public async Task<List<Hotel>> PutHotel(int id, Hotel hotel)
        {
            var obj = await _dbcontext!.Hotel.FindAsync(id);
            obj.HotelRating = hotel.HotelRating;
            obj.HotelPrice = hotel.HotelPrice;
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Hotel.ToListAsync();
        }
        public async Task<List<Hotel>> DeleteHotel(int id)
        {
            var obj = await _dbcontext.Hotel.FindAsync(id);
            _dbcontext.Hotel.Remove(obj);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Hotel.ToListAsync();
        }

        [NonAction]
        public async Task<string> SaveHotelImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot/Hotel", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
