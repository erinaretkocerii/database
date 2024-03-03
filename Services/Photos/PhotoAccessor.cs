using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace BookstoreAPI.Services.Photos
{
    public class PhotoAccessor
    {
        public static Cloudinary cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
               config.Value.CloudName,
               config.Value.APIKey,
               config.Value.APISecret
            );
            cloudinary = new Cloudinary(account);
        }
        public static void uploadImage(string imagePath)
        {
            try
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(imagePath)
                };

                var uploadResult = cloudinary.Upload(uploadParams);
                Console.WriteLine("[Image was uploaded successfully]");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
        /*
        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
        */
    }
}
