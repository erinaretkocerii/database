using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AudioBookController : ControllerBase
    {
        private DataContext _context;

        public AudioBookController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<AudioBook>>> Get()
        {
            return Ok(await _context.AudioBook.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<AudioBook>>> Get(int id)
        {
            var audioBook = await _context.AudioBook.FindAsync(id);
            if (audioBook == null)
                return BadRequest("AudioBook not found.");
            return Ok(audioBook);
        }

        [HttpPost]
        public async Task<ActionResult<List<AudioBook>>> CreateAudioBook(AudioBook audioBook)
        {
            _context.AudioBook.Add(audioBook);
            await _context.SaveChangesAsync();

            return Ok(await _context.AudioBook.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<AudioBook>>> UpdateAudioBook(AudioBook request)
        {
            var dbAudioBook = await _context.AudioBook.FindAsync(request.audioBookId);
            if (dbAudioBook == null)
                return BadRequest("AudioBook not found.");

            dbAudioBook.audioBookName = request.audioBookName;
            dbAudioBook.length = request.length;
            dbAudioBook.price = request.price;

            await _context.SaveChangesAsync();

            return Ok(await _context.AudioBook.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAudioBook(int id)
        {
            var dbAudioBook = await _context.AudioBook.FindAsync(id);
            if (dbAudioBook == null)
                return BadRequest("AudioBook not found.");

            _context.AudioBook.Remove(dbAudioBook);
            await _context.SaveChangesAsync();

            return Ok(await _context.AudioBook.ToListAsync());
        }
    }
}

