using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private DataContext _context;

        public RoleController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Role>>> Get()
        {
            return Ok(await _context.Role.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Role>>> Get(int id)
        {
            var role = await _context.Role.FindAsync(id);
            if (role == null)
                return BadRequest("Role not found.");
            return Ok(role);
        }

        [HttpPost]
        public async Task<ActionResult<List<Role>>> CreateRole(Role role)
        {
            _context.Role.Add(role);
            await _context.SaveChangesAsync();

            return Ok(await _context.Role.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Role>>> UpdateRole(Role request)
        {
            var dbRole = await _context.Role.FindAsync(request.roleId);
            if (dbRole == null)
                return BadRequest("Role not found.");

            dbRole.roleName = request.roleName;
            dbRole.roleId = request.roleId;

            await _context.SaveChangesAsync();

            return Ok(await _context.Role.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var dbRole = await _context.Role.FindAsync(id);
            if (dbRole == null)
                return BadRequest("Role not found.");

            _context.Role.Remove(dbRole);
            await _context.SaveChangesAsync();

            return Ok(await _context.Role.ToListAsync());
        }
    }
}

