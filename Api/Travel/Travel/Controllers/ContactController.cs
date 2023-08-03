using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travel.Data;
using Travel.Models;

namespace Travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly TravelDbContext _context;  //inherits from DbContext and represents the database context

        public ContactController(TravelDbContext context)
        {
            _context = context; // to access the patient property
        }

        [HttpGet] // Read from Data base 
        public IActionResult Get()
        {
            try
            {
                var contacts = _context.Contacts.ToList();//property to get all list 
                if (contacts.Count == 0)
                {
                    return NotFound("Not available.");
                }
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost] // Creating
        public IActionResult Post(Contact model)
        {
            try
            {
                _context.Add(model); // insert into db
                _context.SaveChanges(); // commit 
                return Ok(" created successfully.");
            }
            catch (Exception ex)
            {
                string errorMessage = "An error occurred.";
                if (ex.InnerException != null)
                {
                    errorMessage += " Inner Exception: " + ex.InnerException.Message;
                }
                return BadRequest(errorMessage);
            }
        }
    }
}
