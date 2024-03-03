using System.ComponentModel.DataAnnotations;

namespace BookstoreAPI.DTO
{
    public class UserDto
    {
        [Key]
        public int userId { get; set; }
        public string username { get; set; }
        public string name { get; set; } = string.Empty;
        public string surname { get; set; } = string.Empty;

        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string email { get; set; } = string.Empty;
        public string password { get; set; }
        public string roleName { get; set; } = "User";
        public string image { get; set; }
    }
}
