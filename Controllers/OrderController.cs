using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private DataContext _context;

        public OrdersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Orders>>> Get()
        {
            return Ok(await _context.Orders.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Orders>>> Get(int id)
        {
            var orders = await _context.Orders.FindAsync(id);
            if (orders == null)
                return BadRequest("Orders not found.");
            return Ok(orders);
        }

        [HttpPost]
        public async Task<ActionResult<List<Orders>>> CreateOrder(Orders orders)
        {
            _context.Orders.Add(orders);
            await _context.SaveChangesAsync();

            return Ok(await _context.Orders.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Orders>>> UpdateOrder(Orders request)
        {
            var dbOrders = await _context.Orders.FindAsync(request.orderId);
            if (dbOrders == null)
                return BadRequest("Orders not found.");

            dbOrders.bookId = request.bookId;
            dbOrders.userId = request.userId;
           



            await _context.SaveChangesAsync();

            return Ok(await _context.Orders.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrders(int id)
        {
            var dbOrders = await _context.Orders.FindAsync(id);
            if (dbOrders == null)
                return BadRequest("Orders not found.");

            _context.Orders.Remove(dbOrders);
            await _context.SaveChangesAsync();

            return Ok(await _context.Orders.ToListAsync());
        }
    }
}