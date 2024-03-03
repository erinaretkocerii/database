using System.ComponentModel.DataAnnotations;

namespace BookstoreAPI.Entities
{
    public class Category
    {
        [Key]
        public int categoryId { get; set; }
        
        public string categoryName { get; set; } 
        public string categoryDescription { get; set; }
    }
}
