using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItineraryController : ControllerBase
    {
        private readonly IItinerary _itineraryService;

        public ItineraryController(IItinerary itineraryService)
        {
            _itineraryService = itineraryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ItineraryDetail>>> GetItineraryDetails()
        {
            return await _itineraryService.GetItineraryDetails();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItineraryDetail>> GetItineraryDetail(int id)
        {
            return await _itineraryService.GetItineraryDetail(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<ItineraryDetail>>> PutItineraryDetail(int id, [FromForm] ItineraryDetail itineraryDetail)
        {
            return await _itineraryService.PutItineraryDetail(id, itineraryDetail);
        }

        [HttpPost]
        public async Task<ActionResult<List<ItineraryDetail>>> PostItineraryDetail([FromForm] ItineraryDetail itineraryDetail)
        {
            return await _itineraryService.PostItineraryDetail(itineraryDetail);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<List<ItineraryDetail>>> DeleteItineraryDetail(int id)
        {
            return await _itineraryService.DeleteItineraryDetail(id);
        }
    }
}
