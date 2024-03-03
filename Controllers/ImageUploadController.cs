using BookstoreAPI.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        public static IWebHostEnvironment _environment;
        private DataContext _context;
        public ImageUploadController(IWebHostEnvironment environment, DataContext context)
        {
            _environment = environment;
            _context = context;
        }

      
        [HttpPost]
        public async Task<string> Post()
        {
           
            try
            {
                var files = HttpContext.Request.Form.Files;
                if (files != null && files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        var path = Path.Combine("", _environment.ContentRootPath+"\\Images\\"+ file.FileName);
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                            
                            
                        }
                        var url = "/images/books/" + file.FileName;
                        BookImages bookImage = new BookImages();
                        bookImage.imageName = file.FileName;
                        bookImage.imageUrl = url;
                        bookImage.bookId = null;
                        _context.BookImages.Add(bookImage);
                        _context.SaveChanges();

                    }
                    return "Saved Succesfully";
                }
                else
                {
                    return "Failed!";
                }
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }


        }

        [HttpPut]
        public async Task<string> Put()
        {

            try
            {
                var files = HttpContext.Request.Form.Files;
                if (files != null && files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        var path = Path.Combine("", _environment.ContentRootPath + "\\Images\\" + file.FileName);
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);


                        }
                        var url = "/images/books/" + file.FileName;
                        BookImages bookImage = new BookImages();
                        bookImage.imageName = file.FileName;
                        bookImage.imageUrl = url;
                        bookImage.bookId = null;
                        _context.BookImages.Add(bookImage);
                        _context.SaveChanges();

                    }
                    return "Saved Succesfully";
                }
                else
                {
                    return "Failed!";
                }
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }


        }
    }
}
