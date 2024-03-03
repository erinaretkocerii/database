using System.ComponentModel.DataAnnotations;

namespace BookstoreAPI.DTO
{
    public class RegisterDto
    {
        public string username { get; set; }
        public string name { get; set; }
        public string surname { get; set; }

        [EmailAddress]
        public string email { get; set; }
        public string password { get; set; }

    }
}
