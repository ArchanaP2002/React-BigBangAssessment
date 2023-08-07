using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Travel.Controllers;
using Travel.Data;
using Travel.Models;
using Travel.Repository.Interface;
using Travel.Repository.Services;
using Xunit;

namespace Travel.Tests
{
    public class TravelAppTests
    {
        private readonly Mock<IUsers> _userRepositoryMock;
        private readonly UsersController _userController;

        public TravelAppTests()
        {
            _userRepositoryMock = new Mock<IUsers>();
            _userController = new UsersController(_userRepositoryMock.Object);
        }
 
        [Fact]
        public async Task GetPendingUsers_ReturnsPendingUsers()
        {
            // Arrange
            var pendingUsers = new List<User> { new User { IsActive = false } };
            _userRepositoryMock.Setup(repo => repo.GetPendingUsers()).ReturnsAsync(pendingUsers);

            // Act
            var result = await _userController.GetPendingUsers();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedPendingUsers = Assert.IsAssignableFrom<IEnumerable<User>>(okResult.Value);
            Assert.Equal(pendingUsers.Count, returnedPendingUsers.Count());
            foreach (var user in returnedPendingUsers)
            {
                Assert.False(user.IsActive);
            }
        }
        [Fact]
        public async Task ApproveAgent_ValidAgentId_ReturnsSuccessMessage()
        {
            // Arrange
            var userRepositoryMock = new Mock<IUsers>();
            var userController = new UsersController(userRepositoryMock.Object);
            var agentId = 1;
            var agentUser = new User { Role = "agent", UserId = agentId, IsActive = false };
            userRepositoryMock.Setup(repo => repo.GetUserById(It.IsAny<int>())).ReturnsAsync(agentUser);

            // Act
            var result = await userController.ApproveAgent(agentId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Agent approved successfully.", okResult.Value);
            Assert.True(agentUser.IsActive);
        }

        [Fact]
        public async Task RejectUser_ValidUserId_ReturnsSuccessMessage()
        {
            // Arrange
            var userRepositoryMock = new Mock<IUsers>();
            var userController = new UsersController(userRepositoryMock.Object);
            var userId = 1;
            var user = new User { UserId = userId };
            userRepositoryMock.Setup(repo => repo.GetUserById(It.IsAny<int>())).ReturnsAsync(user);

            // Act
            var result = await userController.RejectUser(userId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("User rejected successfully.", okResult.Value);
            userRepositoryMock.Verify(repo => repo.DeleteUser(user), Times.Once);
        }

        [Fact]
        public async Task Register_AgentUser_ReturnsWaitMessage()
        {
            // Arrange
            var userRepositoryMock = new Mock<IUsers>();
            var userController = new UsersController(userRepositoryMock.Object);
            var agentUser = new User { Role = "Agent" };
            userRepositoryMock.Setup(repo => repo.AddUser(It.IsAny<User>())).ReturnsAsync((User)null);

            // Act
            var result = await userController.Register(agentUser);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal("Wait untill Approval", okResult.Value);
        }

        //[Fact]
        //public async Task Register_NonAgentUser_ReturnsToken()
        //{
        //    // Arrange
        //    var userRepositoryMock = new Mock<IUsers>();
        //    var userController = new UsersController(userRepositoryMock.Object);
        //    var customerUser = new User { Role = "Customer" };
        //    userRepositoryMock.Setup(repo => repo.AddUser(It.IsAny<User>())).ReturnsAsync(customerUser);

        //    // Act
        //    var result = await userController.Register(customerUser);

        //    // Assert
        //    var okResult = Assert.IsType<OkObjectResult>(result.Result);
        //    var token = Assert.IsType<string>(okResult.Value);
        //    Assert.NotNull(token);
        //}


        //[Fact]
        //public async Task Login_ValidCredentials_ReturnsToken()
        //{
        //    // Arrange
        //    var userRepositoryMock = new Mock<IUsers>();
        //    var userController = new UsersController(userRepositoryMock.Object);
        //    var existingUser = new User { EmailId = "test@example.com", Password = "EncryptedPassword", IsActive = true };
        //    userRepositoryMock.Setup(repo => repo.GetUserByEmail(It.IsAny<string>())).ReturnsAsync(existingUser);
        //    var loginModel = new User { EmailId = "test@example.com", Password = "EncryptedPassword" };

        //    // Act
        //    var result = await userController.Login(loginModel);

        //    // Assert
        //    var okResult = Assert.IsType<OkObjectResult>(result.Result);
        //    var token = Assert.IsType<string>(okResult.Value);
        //    Assert.NotNull(token);
        //}


        //[Fact]
        //public async Task Login_InvalidCredentials_ReturnsUnauthorized()
        //{
        //    // Arrange
        //    var userRepositoryMock = new Mock<IUsers>();
        //    var userController = new UsersController(userRepositoryMock.Object);
        //    var existingUser = new User { EmailId = "test@example.com", Password = "EncryptedPassword", IsActive = true };
        //    userRepositoryMock.Setup(repo => repo.GetUserByEmail(It.IsAny<string>())).ReturnsAsync(existingUser);
        //    var loginModel = new User { EmailId = "test@example.com", Password = "InvalidPassword" };

        //    // Act
        //    var result = await userController.Login(loginModel);

        //    // Assert
        //    var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result.Result);
        //    Assert.Equal("Invalid credentials", unauthorizedResult.Value);
        //}



    }
}
