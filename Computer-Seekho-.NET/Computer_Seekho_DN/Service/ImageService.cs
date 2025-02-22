using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Service;

public class ImageService : IImageService
{
    private readonly ComputerSeekhoDbContext _context;

    public ImageService(ComputerSeekhoDbContext context)
    {
        _context = context;
    }

    // Retrieve all images
    public async Task<IEnumerable<Image>> GetAllImagesAsync()
    {
        return await _context.Images.ToListAsync();
    }

    // Add a new image
    public async Task<Image> AddImageAsync(Image image)
    {
        _context.Images.Add(image);
        await _context.SaveChangesAsync();
        return image;
    }

    // Delete an image by ID
    public async Task<bool> DeleteImageAsync(int imageId)
    {
        var image = await _context.Images.FindAsync(imageId);
        if (image == null)
            return false;
        _context.Images.Remove(image);
        await _context.SaveChangesAsync();
        return true;
    }
}
