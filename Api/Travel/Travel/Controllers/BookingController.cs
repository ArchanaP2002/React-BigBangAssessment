using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Travel.Data;
using Travel.Models;

namespace Travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly TravelDbContext _context;

        public BookingController(TravelDbContext context)
        {
            _context = context;
        }

        // GET: api/BookingTrips
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingTrips()
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            return await _context.Bookings.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBookingTrip(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            var bookingTrip = await _context.Bookings.FindAsync(id);

            if (bookingTrip == null)
            {
                return NotFound();
            }

            return bookingTrip;
        }

        // PUT: api/BookingTrips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookingTrip(int id, Booking bookingTrip)
        {
            if (id != bookingTrip.BookingId)
            {
                return BadRequest();
            }

            _context.Entry(bookingTrip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            throw new NotImplementedException();
        }

        // POST: api/BookingTrips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBookingTrip(Booking bookingTrip)
        {
            if (_context.Bookings == null)
            {
                return Problem("Entity set 'MakeYourTripContext.BookingTrips'  is null.");
            }
            _context.Bookings.Add(bookingTrip);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookingTrip", new { id = bookingTrip.BookingId }, bookingTrip);
        }

        // DELETE: api/BookingTrips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookingTrip(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            var bookingTrip = await _context.Bookings.FindAsync(id);
            if (bookingTrip == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(bookingTrip);
            await _context.SaveChangesAsync();

            return NoContent();
        }

 

    }

}
