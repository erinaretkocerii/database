using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private DataContext _context;

        public BlogController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Blog>>> Get()
        {
            return Ok(await _context.Blog.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Blog>>> Get(int id)
        {
            var blog = await _context.Blog.FindAsync(id);
            if (blog == null)
                return BadRequest("Blog not found.");
            return Ok(blog);
        }

        [HttpPost]
        public async Task<ActionResult<List<Blog>>> CreateBlog(Blog blog)
        {
            _context.Blog.Add(blog);
            await _context.SaveChangesAsync();

            return Ok(await _context.Blog.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Blog>>> UpdateBlog(Blog request)
        {
            var dbBlog = await _context.Blog.FindAsync(request.blogId);
            if (dbBlog == null)
                return BadRequest("Blog not found.");

            dbBlog.blogTitle = request.blogTitle;
            dbBlog.blogContent = request.blogContent;
            dbBlog.published = request.published;

            await _context.SaveChangesAsync();

            return Ok(await _context.Blog.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var dbBlog = await _context.Blog.FindAsync(id);
            if (dbBlog == null)
                return BadRequest("Blog not found.");

            _context.Blog.Remove(dbBlog);
            await _context.SaveChangesAsync();

            return Ok(await _context.Blog.ToListAsync());
        }
    }
}

