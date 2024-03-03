using BookstoreAPI.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using BookstoreAPI.Entities;
using BookstoreAPI.DTO;
using System.Text;
using WebAPI.Data;

namespace BookstoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static Users users = new Users();
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private DataContext _context;

        public AuthController(IConfiguration configuration, IUserService userService, DataContext context)
        {
            _configuration = configuration;
            _userService = userService;
            _context = context;
        }

        [HttpGet, Authorize]
        public ActionResult<string> GetMe()
        {
            var userName = _userService.GetMyName();
            return Ok(userName);
        }

        [HttpPost("register")]
        public async Task<ActionResult<Users>> Register(RegisterDto request)
        {
            request.password= hashPassword(request.password);
            users.username = request.username;
            users.name = request.name;
            users.surname = request.surname;
            users.email = request.email;
            users.password = request.password;
            users.roleName = "User";
            hashPassword(request.password);

            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return Ok(users);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDto request)
        {
            try
            {
                String password = hashPassword(request.password);
                var dbUsers = _context.Users.Where(s => s.username == request.username && s.password == password).FirstOrDefault();
                if (dbUsers == null)
                {
                    return BadRequest("Username or password is incorrect");
                }

                string token = CreateToken(dbUsers);
                var refreshToken = GenerateRefreshToken();
                SetRefreshToken(refreshToken);
                return Ok(token);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
      

        [HttpPost("refreshToken")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (!users.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if(users.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = CreateToken(users);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken);

            return Ok(token);
        }

        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            users.RefreshToken = newRefreshToken.Token;
            users.TokenCreated = newRefreshToken.Created;
            users.TokenExpires = newRefreshToken.Expires;
        }

        private string CreateToken(Users users)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("userId", users.userId.ToString()),
                new Claim(ClaimTypes.SerialNumber, users.userId.ToString()),
                new Claim("username", users.username),
                new Claim(ClaimTypes.GivenName, users.username),
                new Claim("name", users.name),
                new Claim(ClaimTypes.Name, users.name),
                new Claim("surname", users.surname),
                new Claim(ClaimTypes.Surname, users.surname),
                new Claim("role", users.roleName),
                new Claim(ClaimTypes.Role, users.roleName),
                new Claim("email", users.email),
                new Claim(ClaimTypes.Email, users.email)


            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        static string hashPassword(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashedPassword = sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashedPassword);
        }

    
    }
}
