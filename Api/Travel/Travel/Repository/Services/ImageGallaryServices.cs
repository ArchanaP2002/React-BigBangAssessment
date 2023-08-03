using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Travel.Data;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Repository.Services
{
    public class ImageGallaryServices :IImageGallary
    {

            private readonly TravelDbContext? _dbcontext;
            private readonly IWebHostEnvironment _hostEnvironment;

            public ImageGallaryServices(TravelDbContext dbcontext, IWebHostEnvironment hostEnvironment)
            {
                _dbcontext = dbcontext;
                _hostEnvironment = hostEnvironment;
            }

        /*public async Task<string> PostAdminImageUpload(IFormFile file)
        {
            string originalFileName = Path.GetFileNameWithoutExtension(file.FileName);
            string uniqueFileName = $"{originalFileName}_{DateTime.Now.ToString("yyyyMMddHHmmss")}{Path.GetExtension(file.FileName)}";
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/AdminImage", uniqueFileName);

            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            string imagePath = "~/AdminImage/" + uniqueFileName;
            return imagePath;
        }*/
        public async Task<List<ImageGallary>> Postall([FromForm] FileModel aiu)
        {
            string ImagePath = await SaveImage(aiu.FormFile);
            var newAdminImageUpload = new ImageGallary();
            newAdminImageUpload.Id = aiu.Id;
            newAdminImageUpload.ImagePath = ImagePath;
            newAdminImageUpload.ImageDetails = aiu.ImageDetail;
            var obj = await _dbcontext.ImageGallaries.AddAsync(newAdminImageUpload);
            await _dbcontext.SaveChangesAsync();
            return await Getall(); // Return the list of images after adding the new image
        }

        [NonAction]
            public async Task<string> SaveImage(IFormFile imageFile)
            {
                string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
                var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot/AdminImage", imageName);
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
                    var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "AdminImage");
                    var filePath = Path.Combine(uploadsFolder, image.ImagePath);

                    var imageBytes = System.IO.File.ReadAllBytes(filePath);
                    var tourData = new ImageGallary
                    {
                        Id = image.Id,
                        //UserId = image.UserId,
                        ImageDetails = image.ImageDetails,
                        ImagePath = Convert.ToBase64String(imageBytes)
                    };
                    imageList.Add(tourData);
                }
                return imageList;
            }

            public async Task<ImageGallary> Getadminid(int id)
            {
                var images = _dbcontext.ImageGallaries.ToList();
            ImageGallary byid = images.SingleOrDefault(p => p.Id == id);

                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "AdminImage");
                var filePath = Path.Combine(uploadsFolder, byid.ImagePath);

                var imageBytes = System.IO.File.ReadAllBytes(filePath);
                var tourData = new ImageGallary
                {
                    Id = byid.Id,
                    //UserId = byid.UserId,
                    ImageDetails = byid.ImageDetails,
                    ImagePath = Convert.ToBase64String(imageBytes)
                };

                return tourData;

            }

        Task<List<ImageGallary>> IImageGallary.Postall(FileModel aiu)
        {
            throw new NotImplementedException();
        }
    }

    }
 