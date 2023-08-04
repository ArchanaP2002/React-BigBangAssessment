using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Travel.Data;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Repository.Services
{
    public class ImageGallaryServices : IImageGallary
    {
        private readonly TravelDbContext _dbcontext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ImageGallaryServices(TravelDbContext dbcontext, IWebHostEnvironment hostEnvironment)
        {
            _dbcontext = dbcontext;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<List<ImageGallary>> Postall([FromForm] FileModel aiu)
        {
            string imageFileName = await SaveImage(aiu.FormFile);

            var newAdminImageUpload = new ImageGallary
            {
                Id = aiu.Id,
                ImagePath = imageFileName,
                ImageDetails = aiu.ImageDetail
            };

            _dbcontext.ImageGallaries.Add(newAdminImageUpload);
            await _dbcontext.SaveChangesAsync();

            return await Getall();
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "AdminImage", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }

        public async Task<List<ImageGallary>> Getall()
        {
            var images = _dbcontext.ImageGallaries.ToList();
            var imageList = new List<ImageGallary>();
            foreach (var image in images)
            {
                var filePath = Path.Combine(_hostEnvironment.WebRootPath, "AdminImage", image.ImagePath);

                if (File.Exists(filePath))
                {
                    var imageBytes = File.ReadAllBytes(filePath);
                    var tourData = new ImageGallary
                    {
                        Id = image.Id,
                        ImageDetails = image.ImageDetails,
                        ImagePath = Convert.ToBase64String(imageBytes)
                    };
                    imageList.Add(tourData);
                }
            }
            return imageList;
        }


        public async Task<ImageGallary> Getadminid(int id)
        {
            var byid = _dbcontext.ImageGallaries.FirstOrDefault(p => p.Id == id);

            if (byid == null)
            {
                return null;
            }

            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "AdminImage");
            var filePath = Path.Combine(uploadsFolder, byid.ImagePath);

            var imageBytes = await File.ReadAllBytesAsync(filePath);
            var tourData = new ImageGallary
            {
                Id = byid.Id,
                ImageDetails = byid.ImageDetails,
                ImagePath = Convert.ToBase64String(imageBytes)
            };

            return tourData;
        }

        public async Task<ImageGallary> Update(int id, [FromForm] FileModel aiu)
        {
            var existingImage = await _dbcontext.ImageGallaries.FindAsync(id);

            if (existingImage == null)
            {
                return null;
            }

            if (aiu.FormFile != null)
            {
                string newImageFileName = await SaveImage(aiu.FormFile);
                DeleteImage(existingImage.ImagePath);
                existingImage.ImagePath = newImageFileName;
            }

            existingImage.ImageDetails = aiu.ImageDetail;
            await _dbcontext.SaveChangesAsync();

            return existingImage;
        }

        public async Task<bool> Delete(int id)
        {
            var existingImage = await _dbcontext.ImageGallaries.FindAsync(id);

            if (existingImage == null)
            {
                return false;
            }

            DeleteImage(existingImage.ImagePath);

            _dbcontext.ImageGallaries.Remove(existingImage);
            await _dbcontext.SaveChangesAsync();

            return true;
        }

        [NonAction]
        public void DeleteImage(string imagePath)
        {
            var filePath = Path.Combine(_hostEnvironment.WebRootPath, "AdminImage", imagePath);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }

    }
}
