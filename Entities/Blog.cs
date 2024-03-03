using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Entities
{
    public class Blog
    {
        [Key]
        public int blogId { get; set; }
        public string blogTitle { get; set; }
        public string blogContent { get; set; }
        public string published { get; set; } 

    }
}
