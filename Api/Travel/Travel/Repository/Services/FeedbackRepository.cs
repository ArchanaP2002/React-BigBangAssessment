using Travel.Data;
using Microsoft.EntityFrameworkCore;
using Travel.Models;
using Travel.Repository.Interface;

namespace Travel.Repository.Services
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly TravelDbContext _context;

        public FeedbackRepository(TravelDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Feedback>> GetAllFeedbackAsync()
        {
            return await _context.Feedbacks.ToListAsync();
        }

        public async Task<Feedback> GetFeedbackByIdAsync(int id)
        {
            return await _context.Feedbacks.FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task AddFeedbackAsync(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync(); // SaveChangesAsync to persist the changes to the database
        }

        public async Task UpdateFeedbackAsync(Feedback feedback)
        {
            var existingFeedback = await GetFeedbackByIdAsync(feedback.Id);
            if (existingFeedback != null)
            {
                existingFeedback.Name = feedback.Name;
                existingFeedback.Email = feedback.Email;
                existingFeedback.Message = feedback.Message;
                existingFeedback.DateSubmitted = feedback.DateSubmitted;
                await _context.SaveChangesAsync(); // SaveChangesAsync to persist the changes to the database
            }
        }

        public async Task DeleteFeedbackAsync(int id)
        {
            var existingFeedback = await GetFeedbackByIdAsync(id);
            if (existingFeedback != null)
            {
                _context.Feedbacks.Remove(existingFeedback);
                await _context.SaveChangesAsync(); // SaveChangesAsync to persist the changes to the database
            }
        }
    }
}
