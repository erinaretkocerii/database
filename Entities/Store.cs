using System.ComponentModel.DataAnnotations;

namespace BookstoreAPI.Entities
{
    public class Store
    {
        [Key]
        public int storeId { get; set; } 
        public string storeName { get; set; }
        public string address { get; set; }
    }
}


