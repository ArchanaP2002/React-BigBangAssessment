﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Travel.Data;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Repository.Services
{
    public class PackageService : IPackage
    {
        private readonly TravelDbContext _dbcontext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public PackageService(TravelDbContext dbcontext, IWebHostEnvironment hostEnvironment)
        {
            _dbcontext = dbcontext;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<List<Packages>> GetPackages()
        {
            var images = _dbcontext.Packages.ToList();
            var imageList = new List<Packages>();
            foreach (var image in images)
            {
                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "package");
                var filePath = Path.Combine(uploadsFolder, image.PlaceImage);

                var imageBytes = System.IO.File.ReadAllBytes(filePath);
                var tourData = new Packages
                {
                    PackageId = image.PackageId,
                    UserId = image.UserId,
                    Place = image.Place,
                    Duration = image.Duration,
                    PackagePrice = image.PackagePrice,
                    Description = image.Description,
                    PlaceImage = Convert.ToBase64String(imageBytes)
                };
                imageList.Add(tourData);
            }
            return imageList;

        }

        public async Task<Packages> GetPackage(int id)
        {
            var images = _dbcontext.Packages.ToList();
            Packages byid = images.SingleOrDefault(p => p.PackageId == id);

            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "Package");
            var filePath = Path.Combine(uploadsFolder, byid.PlaceImage);

            var imageBytes = System.IO.File.ReadAllBytes(filePath);
            var tourData = new Packages
            {
                PackageId = byid.PackageId,
                UserId = byid.UserId,
                Place = byid.Place,
                Duration = byid.Duration,
                PackagePrice = byid.PackagePrice,
                Description = byid.Description,
                PlaceImage = Convert.ToBase64String(imageBytes)
            };
            return tourData;

        }

        public async Task<List<Packages>> PutPackage(int id, Packages package)
        {
            var obj = await _dbcontext!.Packages.FindAsync(id);
            obj.Duration = package.Duration;
            obj.PackagePrice = package.PackagePrice;
            obj.Description = package.Description;
            obj.PlaceImage = package.PlaceImage;

            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Packages.ToListAsync();

        }
        public async Task<List<Packages>> PostPackage([FromForm] PackageImage pi)
        {
            string ImagePath = await SavepackageImage(pi.PackImg);
            var pack = new Packages();
            pack.UserId = pi.UserId;
            pack.Place = pi.Place;
            pack.Duration = pi.Duration;
            pack.PackagePrice = pi.PackagePrice;
            pack.Description = pi.Description;
            pack.PlaceImage = ImagePath;
            var obj = await _dbcontext.Packages.AddAsync(pack);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Packages.ToListAsync();
        }

        public async Task<List<Packages>> DeletePackage(int id)
        {

            var obj = await _dbcontext.Packages.FindAsync(id);
            _dbcontext.Packages.Remove(obj);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Packages.ToListAsync();
        }

        [NonAction]
        public async Task<string> SavepackageImage(IFormFile imageFile)
        {
            string imageName = $"{DateTime.Now.ToString("yymmssfff")}_{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
            var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "Package", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }

    }
}
