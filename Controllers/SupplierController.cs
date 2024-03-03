using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private DataContext _context;

        public SupplierController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Supplier>>> Get()
        {
            return Ok(await _context.Supplier.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Supplier>>> Get(int id)
        {
            var supplier = await _context.Supplier.FindAsync(id);
            if (supplier == null)
                return BadRequest("Supplier not found.");
            return Ok(supplier);
        }

        [HttpPost]
        public async Task<ActionResult<List<Supplier>>> CreateSupplier(Supplier supplier)
        {
            _context.Supplier.Add(supplier);
            await _context.SaveChangesAsync();

            return Ok(await _context.Supplier.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Supplier>>> UpdateSupplier(Supplier request)
        {
            var dbSupplier = await _context.Supplier.FindAsync(request.supplierId);
            if (dbSupplier == null)
                return BadRequest("Supplier not found.");

            dbSupplier.supplierName = request.supplierName;
            dbSupplier.supplierAddress = request.supplierAddress;
            dbSupplier.phone = request.phone;




            await _context.SaveChangesAsync();

            return Ok(await _context.Supplier.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var dbSupplier = await _context.Supplier.FindAsync(id);
            if (dbSupplier == null)
                return BadRequest("Supplier not found.");

            _context.Supplier.Remove(dbSupplier);
            await _context.SaveChangesAsync();

            return Ok(await _context.Supplier.ToListAsync());
        }
    }
}


