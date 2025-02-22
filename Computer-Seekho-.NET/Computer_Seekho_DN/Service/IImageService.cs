using Computer_Seekho_DN.Models;

namespace Computer_Seekho_DN.Service;

public interface IImageService
{
    Task<IEnumerable<Image>> GetAllImagesAsync();

    Task<Image> AddImageAsync(Image image);
    Task<bool> DeleteImageAsync(int imageId);
}
