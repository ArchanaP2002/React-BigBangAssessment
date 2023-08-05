using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : ControllerBase
    {
        private readonly IPackage _context;

        public PackageController(IPackage context)
        {
            _context = context;
        }

        // GET: api/Packages
        [HttpGet]
        public async Task<ActionResult<List<Packages>>> GetPackages()
        {
            var images = await _context.GetPackages();
            if (images == null)
            {
                return NotFound();
            }
            return new JsonResult(images);
        }

        // GET: api/Packages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Packages>> GetPackage(int id)
        {
            var images = await _context.GetPackage(id);
            if (images == null)
            {
                return NotFound();
            }
            return new JsonResult(images);
        }

        // PUT: api/Packages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Packages>>> PutPackage(int id, Packages package)
        {
            return await _context.PutPackage(id, package);
        }

        // POST: api/Packages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List<Packages>>> PostPackage([FromForm] PackageImage pi)
        {
            return await _context.PostPackage(pi);
        }

        // DELETE: api/Packages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Packages>>> DeletePackage(int id)
        {
            return await _context.DeletePackage(id);
        }
    }
}
