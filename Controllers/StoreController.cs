using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private DataContext _context;

        public StoreController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Store>>> Get()
        {
            return Ok(await _context.Store.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Store>>> Get(int id)
        {
            var store = await _context.Store.FindAsync(id);
            if (store == null)
                return BadRequest("Store not found.");
            return Ok(store);
        }

        [HttpPost]
        public async Task<ActionResult<List<Store>>> CreateStore(Store store)
        {
            _context.Store.Add(store);
            await _context.SaveChangesAsync();

            return Ok(await _context.Store.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Store>>> UpdateStore(Store request)
        {
            var dbStore = await _context.Store.FindAsync(request.storeId);
            if (dbStore == null)
                return BadRequest("Store not found.");

            dbStore.storeName = request.storeName;
            dbStore.address = request.address; 

            await _context.SaveChangesAsync();

            return Ok(await _context.Store.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStore(int id)
        {
            var dbStore = await _context.Store.FindAsync(id); 
            if (dbStore == null)
                return BadRequest("Store not found.");

            _context.Store.Remove(dbStore);
            await _context.SaveChangesAsync();

            return Ok(await _context.Store.ToListAsync());
        }
    }
}

