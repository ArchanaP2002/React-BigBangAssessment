using Travel.Models;

namespace Travel.Repository.Interface
{
    public interface IUsers
    {
        Task<User> AddUser(User user);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserById(int userId); 
        Task UpdateUser(User user); 
    }
}