using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageGallaryController : ControllerBase
    {
 
            private readonly IImageGallary _context;

            public ImageGallaryController(IImageGallary context)
            {
                _context = context;
            }
            // POST: api/AdminImageUploads
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            /*[HttpPost]
            public async Task<ActionResult<string>> PostAdminImageUpload( IFormFile files)
            {
                try
                {
                    return Ok(await _context.PostAdminImageUpload(files));
                }
                catch (Exception ex)
                {
                    return NotFound(ex.Message);
                }
            }*/

            [HttpPost("AllAdminColumn")]
            public async Task<ActionResult<List<ImageGallary>>> Postall([FromForm] FileModel aiu)
            {
                return await _context.Postall(aiu);
            }

            [HttpGet("GetAllDetailsFromAdminTable")]
            public async Task<ActionResult<List<ImageGallary>>> Getall()
            {
                var images = await _context.Getall();
                if (images == null)
                {
                    return NotFound();
                }
                return new JsonResult(images);

            }

            [HttpGet("GetById")]
            public async Task<ActionResult<ImageGallary>> Getadminid(int id)
            {

                var images = await _context.Getadminid(id);
                if (images == null)
                {
                    return NotFound();
                }
                return new JsonResult(images);
            }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var isDeleted = await _context.Delete(id);

            if (!isDeleted)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ImageGallary>> Put(int id, [FromForm] FileModel aiu)
        {
            var updatedImage = await _context.Update(id, aiu);

            if (updatedImage == null)
            {
                return NotFound();
            }

            return Ok(updatedImage);
        }


    }
}
 
