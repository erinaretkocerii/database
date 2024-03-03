using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private DataContext _context;

        public StockController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Stock>>> Get()
        {
            return Ok(await _context.Stock.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Stock>>> Get(int id)
        {
            var stock = await _context.Stock.FindAsync(id);
            if (stock == null)
                return BadRequest("Stock not found.");
            return Ok(stock);
        }

        [HttpPost]
        public async Task<ActionResult<List<Stock>>> CreateStock(Stock stock)
        {
            _context.Stock.Add(stock);
            await _context.SaveChangesAsync();

            return Ok(await _context.Stock.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Stock>>> UpdateStock(Stock request)
        {
            var dbStock = await _context.Stock.FindAsync(request.stockId);
            if (dbStock == null)
                return BadRequest("Stock not found.");

            dbStock.amount = request.amount;
            dbStock.bookId = request.bookId;



            await _context.SaveChangesAsync();

            return Ok(await _context.Stock.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStock(int id)
        {
            var dbStock = await _context.Stock.FindAsync(id);
            if (dbStock == null)
                return BadRequest("Stock not found.");

            _context.Stock.Remove(dbStock);
            await _context.SaveChangesAsync();

            return Ok(await _context.Stock.ToListAsync());
        }
    }
}