using Microsoft.AspNetCore.Mvc;
using Travel.Models;

namespace Travel.Repository.Interface
{
    public interface IHotel
    {
        public Task<List<Hotel>> PostHotel([FromForm] HotelImg hotel);
        public Task<List<Hotel>> GetHotels();
        public Task<Hotel> GetHotel(int id);
        public Task<List<Hotel>> DeleteHotel(int id);
        public Task<List<Hotel>> PutHotel(int id, Hotel hotel);
    }
}
