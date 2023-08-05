using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Travel.Data;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Repository.Services
{
    public class ItineraryService : IItinerary
    {
        private readonly TravelDbContext _dbcontext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ItineraryService(TravelDbContext dbcontext, IWebHostEnvironment hostEnvironment)
        {
            _dbcontext = dbcontext;
            _hostEnvironment = hostEnvironment;
        }

        [NotMapped]
        public IFormFile ItineraryImg { get; set; }
        public async Task<List<ItineraryDetail>> GetItineraryDetails()
        {
            var itineraryList = await _dbcontext.ItineraryDetail.ToListAsync();
            foreach (var itinerary in itineraryList)
            {
                itinerary.ItineraryImage = GetBase64Image(itinerary.ItineraryImage);
            }
            return itineraryList;
        }

        public async Task<ItineraryDetail> GetItineraryDetail(int id)
        {
            var itinerary = await _dbcontext.ItineraryDetail.FindAsync(id);
            itinerary.ItineraryImage = GetBase64Image(itinerary.ItineraryImage);
            return itinerary;
        }
        public async Task<List<ItineraryDetail>> PutItineraryDetail(int id, ItineraryDetail itineraryDetail)
        {
            var obj = await _dbcontext.ItineraryDetail.FindAsync(id);
            obj.DayNumber = itineraryDetail.DayNumber;
            obj.Activities = itineraryDetail.Activities;
            obj.Time = itineraryDetail.Time;
            obj.ItineraryPlace = itineraryDetail.ItineraryPlace;

            if (itineraryDetail.ItineraryImg != null)
            {
                obj.ItineraryImage = await SaveItineraryImage(itineraryDetail.ItineraryImg);
            }

            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.ItineraryDetail.ToListAsync();
        }

        public async Task<List<ItineraryDetail>> PostItineraryDetail([FromForm] ItineraryDetail itineraryDetail)
        {
            
            string imageName = await SaveItineraryImage(itineraryDetail.ItineraryImg);

            var newItinerary = new ItineraryDetail
            {
                PackageId = itineraryDetail.PackageId,
                DayNumber = itineraryDetail.DayNumber,
                Activities = itineraryDetail.Activities,
                Time = itineraryDetail.Time,
                ItineraryPlace = itineraryDetail.ItineraryPlace,
                ItineraryImage = imageName
            };

            await _dbcontext.ItineraryDetail.AddAsync(newItinerary);
            await _dbcontext.SaveChangesAsync();

            return await _dbcontext.ItineraryDetail.ToListAsync();
        }

        public async Task<List<ItineraryDetail>> DeleteItineraryDetail(int id)
        {
            var obj = await _dbcontext.ItineraryDetail.FindAsync(id);
            if (obj != null)
            {
                _dbcontext.ItineraryDetail.Remove(obj);
                await _dbcontext.SaveChangesAsync();
            }
            return await _dbcontext.ItineraryDetail.ToListAsync();
        }

        private string GetBase64Image(string imageName)
        {
            if (string.IsNullOrWhiteSpace(imageName))
            {
                return null;
            }

            var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "Itinerary", imageName);
            var imageBytes = System.IO.File.ReadAllBytes(imagePath);
            return Convert.ToBase64String(imageBytes);
        }

        private async Task<string> SaveItineraryImage(IFormFile imageFile)
        {
            if (imageFile == null)
            {
                return null;
            }

            try
            {
                string imageName = $"{DateTime.Now.ToString("yymmssfff")}_{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
                var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "Itinerary", imageName);

                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }

                return imageName;
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"Error saving itinerary image: {ex}");
                return null;
            }
        }

    }
}
