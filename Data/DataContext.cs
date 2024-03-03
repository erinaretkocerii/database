using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options)
        {
        }

        public DbSet<Category> Category { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<Store> Store { get; set; }
        public DbSet<Supplier> Supplier { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Stock> Stock { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<BookImages> BookImages { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<Novel> Novel { get; set; }
        public DbSet<Blog> Blog { get; set; }
        public DbSet<AudioBook> AudioBook { get; set; }
        public DbSet<Report> Report { get; set; }
        public DbSet<Sale> Sale { get; set; }
        public DbSet<Staff> Staff { get; set; }






    }
}

