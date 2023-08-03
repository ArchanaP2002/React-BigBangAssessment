using Microsoft.AspNetCore.Mvc;
using System.IO;
using Travel.Models;

namespace Travel.Repository.Interface
{
    public interface IImageGallary
    {
        public Task<List<ImageGallary>> Postall([FromForm] FileModel aiu);

        public Task<List<ImageGallary>> Getall();
        public Task<ImageGallary> Getadminid(int id);
    }
}
