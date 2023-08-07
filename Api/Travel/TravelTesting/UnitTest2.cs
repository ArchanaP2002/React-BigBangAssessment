using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Travel.Controllers;
using Travel.Models;
using Travel.Repository.Interface;
using Travel.Repository.Services;
using Xunit;
 
namespace TravelTesting
{
    public class PackageControllerTests
    {
        [Fact]
        public async Task GetPackages_ReturnsListOfPackages()
        {
            // Arrange
            var packageList = new List<Packages>
            {
                 
            };
            var packageServiceMock = new Mock<IPackage>();
            packageServiceMock.Setup(service => service.GetPackages()).ReturnsAsync(packageList);

            var controller = new PackageController(packageServiceMock.Object);

            // Act
            var result = await controller.GetPackages();

            // Assert
            var okResult = Assert.IsType<JsonResult>(result.Result);
            var model = Assert.IsType<List<Packages>>(okResult.Value);
            Assert.Equal(packageList.Count, model.Count);
        }

        [Fact]
        public async Task GetPackage_ReturnsPackageById()
        {
            // Arrange
            int packageId = 1;
            var expectedPackage = new Packages { PackageId = packageId, /* Initialize other properties with test data */ };

            var mockPackageRepository = new Mock<IPackage>();
            mockPackageRepository.Setup(repo => repo.GetPackage(packageId)).ReturnsAsync(expectedPackage);

            var controller = new PackageController(mockPackageRepository.Object);

            // Act
            var result = await controller.GetPackage(packageId);

            // Assert
            var actionResult = Assert.IsType<JsonResult>(result.Result);
            var model = Assert.IsType<Packages>(actionResult.Value);
            Assert.Equal(expectedPackage.PackageId, model.PackageId);
        }


        //[Fact]
        //public async Task PostPackage_ReturnsUpdatedListAfterAddingPackage()
        //{
        //    // Arrange
        //    var mockPackageService = new Mock<IPackage>();
        //    var expectedPackagesList = new List<Packages>
        //    {
        //        new Packages { PackageId = 1, /* other properties */ },
        //        new Packages { PackageId = 2, /* other properties */ },
        //        // ... add more mock packages as needed
        //    };

        //    mockPackageService.Setup(service => service.PostPackage(It.IsAny<PackageImage>()))
        //                     .ReturnsAsync(expectedPackagesList);

        //    var controller = new PackageController(mockPackageService.Object);

        //    var packageImage = new PackageImage
        //    {
        //        UserId = 1,
        //        Place = "Test Place",
        //        Duration = "1 week",
        //        PackagePrice = 100,
        //        Description = "Test Description",
        //        // Mock FormFile or adjust this based on your actual code
        //        PackImg = null
        //    };

        //    // Act
        //    var result = await controller.PostPackage(packageImage);

        //    // Assert
        //    var actionResult = Assert.IsType<ActionResult<List<Packages>>>(result);
        //    var okResult = Assert.IsType<JsonResult>(actionResult.Result);
        //    var model = Assert.IsType<List<Packages>>(okResult.Value);

        //    // Add more assertions as needed to verify the behavior
        //    Assert.Equal(expectedPackagesList.Count, model.Count);
        //}

        //[Fact]
        //public async Task DeletePackage_RemovesPackageAndReturnsUpdatedList()
        //{
        //    // Arrange
        //    var packageServiceMock = new Mock<IPackage>();
        //    var controller = new PackageController(packageServiceMock.Object);

        //    int packageIdToDelete = 1;
        //    var updatedPackages = new List<Packages>(); // Mock updated packages after deleting a package

        //    packageServiceMock.Setup(service => service.DeletePackage(packageIdToDelete)).ReturnsAsync(updatedPackages);

        //    // Act
        //    var result = await controller.DeletePackage(packageIdToDelete);

        //    // Assert
        //    var okResult = Assert.IsType<OkObjectResult>(result.Result);
        //    var model = Assert.IsType<List<Packages>>(okResult.Value);

        //    Assert.Same(updatedPackages, model); // Verify that the updated packages are returned
        //}


    }
}
