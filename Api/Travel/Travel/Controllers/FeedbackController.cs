using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackRepository _feedbackRepository;

        public FeedbackController(IFeedbackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedback()
        {
            var feedbacks = await _feedbackRepository.GetAllFeedbackAsync();
            return Ok(feedbacks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> GetFeedbackById(int id)
        {
            var feedback = await _feedbackRepository.GetFeedbackByIdAsync(id);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }

        [HttpPost]
        public async Task<IActionResult> AddFeedbackAsync([FromBody] Feedback feedback)
        {
            if (feedback == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return bad request with validation errors if the model state is not valid or the feedback is null
            }

            await _feedbackRepository.AddFeedbackAsync(feedback);

            return CreatedAtAction(nameof(GetFeedbackById), new { id = feedback.Id }, feedback);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFeedback(int id, Feedback feedback)
        {
            if (id != feedback.Id)
            {
                return BadRequest();
            }

            await _feedbackRepository.UpdateFeedbackAsync(feedback);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            await _feedbackRepository.DeleteFeedbackAsync(id);
            return NoContent();
        }
    }
}
