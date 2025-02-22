using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Service;

public class AlbumService :IAlbumService
{
    private readonly ComputerSeekhoDbContext _context;

    public AlbumService(ComputerSeekhoDbContext context)
    {
        _context = context;
    }

    public async Task<Album> SaveAlbumAsync(Album album)
    {
        await _context.Albums.AddAsync(album);
        await _context.SaveChangesAsync();
        return album;
    }

    public async Task<IEnumerable<Album>> GetAllAlbumsAsync()
    {
        return await _context.Albums.ToListAsync();
    }

    public async Task<Album> GetAlbumByIdAsync(int albumId)
    {
        return await _context.Albums.FirstOrDefaultAsync(a => a.AlbumId == albumId);
    }

    public async Task<bool> UpdateAlbumAsync(Album album)
    {
        var existingAlbum = await _context.Albums.FirstOrDefaultAsync(a => a.AlbumId == album.AlbumId);
        if (existingAlbum != null)
        {
            existingAlbum.AlbumDescription = album.AlbumDescription;
            existingAlbum.IsActive = album.IsActive;
            existingAlbum.AlbumName = album.AlbumName;
            existingAlbum.EndDate = album.EndDate;
            existingAlbum.StartDate = album.StartDate;
            existingAlbum.Images = album.Images;
            _context.Albums.Update(existingAlbum);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> DeleteAlbumAsync(int albumId)
    {
        var album = await _context.Albums.FirstOrDefaultAsync(a => a.AlbumId == albumId);
        if (album != null)
        {
            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
