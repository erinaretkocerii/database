using System.ComponentModel.DataAnnotations;

namespace BookstoreAPI.Entities
{
    public class Review
    {
        public int reviewId { get; set; }

        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string email { get; set; } = string.Empty;
        public string reviewText { get; set; } = string.Empty;
    }
}
