using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private DataContext _context;

        public SaleController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Sale>>> Get()
        {
            return Ok(await _context.Sale.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Sale>>> Get(int id)
        {
            var sale = await _context.Sale.FindAsync(id);
            if (sale == null)
                return BadRequest("Sale not found.");
            return Ok(sale);
        }

        [HttpPost]
        public async Task<ActionResult<List<Sale>>> CreateSale(Sale sale)
        {
            _context.Sale.Add(sale);
            await _context.SaveChangesAsync();

            return Ok(await _context.Sale.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Sale>>> UpdateSale(Sale request)
        {
            var dbSale = await _context.Sale.FindAsync(request.saleId);
            if (dbSale == null)
                return BadRequest("Sale not found.");

            dbSale.staffId = request.staffId;
            dbSale.bookId = request.bookId;
            dbSale.saleNote = request.saleNote;

            await _context.SaveChangesAsync();

            return Ok(await _context.Sale.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            var dbSale = await _context.Sale.FindAsync(id);
            if (dbSale == null)
                return BadRequest("Sale not found.");

            _context.Sale.Remove(dbSale);
            await _context.SaveChangesAsync();

            return Ok(await _context.Sale.ToListAsync());
        }
    }
}

