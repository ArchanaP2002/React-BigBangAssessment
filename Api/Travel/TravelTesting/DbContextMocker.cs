using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Travel.Data;
using Travel.Models;
using Travel.Repository.Interface;
using Travel.Repository.Services;

namespace TravelTesting
{
    public static class DbContextMocker
    {
        public static TravelDbContext GetTravelDbContext(List<Packages> packages)
        {
            var options = new DbContextOptionsBuilder<TravelDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            var dbContext = new TravelDbContext(options);

            var mockPackageRepository = new Mock<IPackage>();
            mockPackageRepository.Setup(repo => repo.DeletePackage(It.IsAny<int>()))
                .ReturnsAsync((int id) => packages.Where(p => p.PackageId != id).ToList());

            var service = new PackageService(dbContext, null); // Pass a mock IWebHostEnvironment

            // Inject the mock IPackage repository into the service
            var packageServiceField = typeof(PackageService).GetField("_context",
                BindingFlags.NonPublic | BindingFlags.Instance);
            packageServiceField.SetValue(service, mockPackageRepository.Object);

            return dbContext;
        }
    }

}
