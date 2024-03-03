using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private DataContext _context;

        public ReviewsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Review>>> Get()
        {
            return Ok(await _context.Review.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Review>>> Get(int id)
        {
            var review = await _context.Review.FindAsync(id);
            if (review == null)
                return BadRequest("Review not found.");
            return Ok(review);
        }

        [HttpPost]
        public async Task<ActionResult<List<Review>>> CreateReview(Review review)
        {
            _context.Review.Add(review);
            await _context.SaveChangesAsync();

            return Ok(await _context.Review.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Review>>> UpdateReview(Review request)
        {
            var dbReview = await _context.Review.FindAsync(request.reviewId);
            if (dbReview == null)
                return BadRequest("Review not found.");

            dbReview.email = request.email;
            dbReview.reviewText = request.reviewText;

            await _context.SaveChangesAsync();

            return Ok(await _context.Review.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var dbReview = await _context.Review.FindAsync(id);
            if (dbReview == null)
                return BadRequest("Review not found.");

            _context.Review.Remove(dbReview);
            await _context.SaveChangesAsync();

            return Ok(await _context.Review.ToListAsync());
        }
    }
}

