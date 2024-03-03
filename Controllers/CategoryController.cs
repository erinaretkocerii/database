using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private DataContext _context;

        public CategoryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> Get()
        {
            return Ok(await _context.Category.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Category>>> Get(int id)
        {
            var category = await _context.Category.FindAsync(id);
            if (category == null)
                return BadRequest("Category not found.");
            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<List<Category>>> CreateCategory(Category category)
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();

            return Ok(await _context.Category.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Category>>> UpdateCategory(Category request)
        {
            var dbCategory = await _context.Category.FindAsync(request.categoryId);
            if (dbCategory == null)
                return BadRequest("Category not found.");

            dbCategory.categoryName = request.categoryName;
            dbCategory.categoryDescription = request.categoryDescription;

            await _context.SaveChangesAsync();

            return Ok(await _context.Category.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var dbCategory = await _context.Category.FindAsync(id);
            if (dbCategory == null)
                return BadRequest("Category not found.");

            _context.Category.Remove(dbCategory);
            await _context.SaveChangesAsync();

            return Ok(await _context.Category.ToListAsync());
        }
    }
}

