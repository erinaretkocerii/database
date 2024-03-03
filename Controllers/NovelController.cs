
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookstoreAPI.Entities;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class NovelController : ControllerBase
    {
        private DataContext _context;
        public NovelController(DataContext context)
        {

            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Novel>>> Get()
        {
            return Ok(await _context.Novel.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Novel>>> Get(int id)
        {
            var novel = await _context.Novel.FindAsync(id);
            if (novel == null)
                return BadRequest("Novel not found.");
            return Ok(novel);
        }



        [HttpPost]
        public async Task<ActionResult<List<Novel>>> CreateNovel(Novel novel)
        {
            _context.Novel.Add(novel);
            await _context.SaveChangesAsync();

            return Ok(await _context.Novel.ToListAsync());


        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Novel>>> UpdateNovel(Novel request)
        {
            var dbNovel = await _context.Novel.FindAsync(request.novelId);
            if (dbNovel == null)
                return BadRequest("Novel not found.");

            dbNovel.novelName = request.novelName;
            dbNovel.novelist = request.novelist;
            dbNovel.price = request.price;

            await _context.SaveChangesAsync();

            return Ok(await _context.Novel.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNovel(int id)
        {
            var dbNovel = await _context.Novel.FindAsync(id);
            if (dbNovel == null)
                return BadRequest("Novel not found.");

            _context.Novel.Remove(dbNovel);
            await _context.SaveChangesAsync();

            return Ok(await _context.Novel.ToListAsync());
        }

    }
}