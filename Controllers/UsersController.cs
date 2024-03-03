using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Users>>> Get()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Users>>> Get(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
                return BadRequest("User not found.");
            return Ok(users);
        }


        [HttpPost]
        public async Task<ActionResult<List<Users>>> CreateUser(Users users)
        {
            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Users>>> UpdateUser(Users request)
        {
            var dbUsers = await _context.Users.FindAsync(request.userId);
            if (dbUsers == null)
                return BadRequest("User not found.");

            dbUsers.userId = request.userId;
            dbUsers.username = request.username;
            dbUsers.name = request.name;
            dbUsers.surname = request.surname;
            dbUsers.email = request.email;
            dbUsers.RefreshToken = request.RefreshToken;
            dbUsers.TokenCreated = request.TokenCreated;
            dbUsers.TokenExpires = request.TokenExpires;
           
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var dbUsers = await _context.Users.FindAsync(id);
            if (dbUsers == null)
                return BadRequest("Orders not found.");

            _context.Users.Remove(dbUsers);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }
    }
}