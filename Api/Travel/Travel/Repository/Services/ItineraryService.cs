using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Travel.Data;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Repository.Services
{
    public class ItineraryService : IItinerary
    {
        private readonly TravelDbContext _dbContext;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ItineraryService(TravelDbContext dbContext, IWebHostEnvironment webHostEnvironment)
        {
            _dbContext = dbContext;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<List<ItineraryDetail>> GetItineraryDetails()
        {
            var itineraryList = await _dbContext.ItineraryDetail.ToListAsync();
            foreach (var itinerary in itineraryList)
            {
                itinerary.ItineraryImage = GetBase64Image(itinerary.ItineraryImage);
            }
            return itineraryList;
        }

        
        public async Task<ItineraryDetail> GetItineraryDetail(int id)
        {
            var itinerary = await _dbContext.ItineraryDetail.FindAsync(id);

            if (itinerary == null)
            {
                throw new KeyNotFoundException($"Itinerary with ID {id} not found.");
            }

            if (itinerary.ItineraryImage != null)
            {
                itinerary.ItineraryImage = GetBase64Image(itinerary.ItineraryImage);
            }

            return itinerary;
        }

        public async Task<List<ItineraryDetail>> PutItineraryDetail(int id, ItineraryDetail itineraryDetail)
        {
            var existingItinerary = await _dbContext.ItineraryDetail.FindAsync(id);
            if (existingItinerary == null)
            {
                throw new KeyNotFoundException("Itinerary not found");
            }

            existingItinerary.DayNumber = itineraryDetail.DayNumber;
            existingItinerary.Activities = itineraryDetail.Activities;
            existingItinerary.Time = itineraryDetail.Time;
            existingItinerary.ItineraryPlace = itineraryDetail.ItineraryPlace;

            if (itineraryDetail.ItineraryImg != null)
            {
                existingItinerary.ItineraryImage = await SaveItineraryImage(itineraryDetail.ItineraryImg);
            }

            await _dbContext.SaveChangesAsync();
            return await _dbContext.ItineraryDetail.ToListAsync();
        }

        public async Task<List<ItineraryDetail>> PostItineraryDetail(ItineraryDetail itineraryDetail)
        {
            var imageName = await SaveItineraryImage(itineraryDetail.ItineraryImg);

            var newItinerary = new ItineraryDetail
            {
                PackageId = itineraryDetail.PackageId,
                DayNumber = itineraryDetail.DayNumber,
                Activities = itineraryDetail.Activities,
                Time = itineraryDetail.Time,
                ItineraryPlace = itineraryDetail.ItineraryPlace,
                ItineraryImage = imageName
            };

            _dbContext.ItineraryDetail.Add(newItinerary);
            await _dbContext.SaveChangesAsync();

            return await _dbContext.ItineraryDetail.ToListAsync();
        }

        public async Task<List<ItineraryDetail>> DeleteItineraryDetail(int id)
        {
            var itinerary = await _dbContext.ItineraryDetail.FindAsync(id);
            if (itinerary != null)
            {
                _dbContext.ItineraryDetail.Remove(itinerary);
                await _dbContext.SaveChangesAsync();
            }
            return await _dbContext.ItineraryDetail.ToListAsync();
        }

        public async Task<List<ItineraryDetail>> GetItineraryDetailsByPackage(int packageId)
        {
            return await _dbContext.ItineraryDetail
                .Where(itinerary => itinerary.PackageId == packageId)
                .ToListAsync();
        }



        private string GetBase64Image(string imageName)
        {
            if (string.IsNullOrWhiteSpace(imageName))
            {
                return null;
            }

            var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Itinerary", imageName);
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
                var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Itinerary", imageName);

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
