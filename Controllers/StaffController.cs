using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private DataContext _context;

        public StaffController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Staff>>> Get()
        {
            return Ok(await _context.Staff.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Staff>>> Get(int id)
        {
            var staff = await _context.Staff.FindAsync(id);
            if (staff == null)
                return BadRequest("Staff not found.");
            return Ok(staff);
        }

        [HttpPost]
        public async Task<ActionResult<List<Staff>>> CreateStaff(Staff staff)
        {
            _context.Staff.Add(staff);
            await _context.SaveChangesAsync();

            return Ok(await _context.Staff.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Staff>>> UpdateStaff(Staff request)
        {
            var dbStaff = await _context.Staff.FindAsync(request.staffId);
            if (dbStaff == null)
                return BadRequest("Staff not found.");

            dbStaff.staffPosition = request.staffPosition;
			dbStaff.salary = request.salary;

			
			

            await _context.SaveChangesAsync();

            return Ok(await _context.Staff.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            var dbStaff = await _context.Staff.FindAsync(id);
            if (dbStaff == null)
                return BadRequest("Staff not found.");

            _context.Staff.Remove(dbStaff);
            await _context.SaveChangesAsync();

            return Ok(await _context.Staff.ToListAsync());
        }
    }
}

