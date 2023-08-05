using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotel _context;

        public HotelController(IHotel context)
        {
            _context = context;
        }

        // GET: api/Hotels
        [HttpGet]
        public async Task<ActionResult<List<Hotel>>> GetHotels()
        {
            var images = await _context.GetHotels();
            if (images == null)
            {
                return NotFound();
            }
            return new JsonResult(images);
        }

        // GET: api/Hotels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(int id)
        {
            var image = await _context.GetHotel(id);
            if (image == null)
            {
                return NotFound();
            }
            return new JsonResult(image);
        }

        // PUT: api/Hotels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Hotel>>> PutHotel(int id, Hotel hotel)
        {
            return await _context.PutHotel(id, hotel);

        }

        // POST: api/Hotels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List<Hotel>>> PostHotel([FromForm] HotelImg hotel)
        {
            return await _context.PostHotel(hotel);
        }

        // DELETE: api/Hotels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Hotel>>> DeleteHotel(int id)
        {
            return await _context.DeleteHotel(id);

        }
    }
}
