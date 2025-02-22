using Computer_Seekho_DN.Models;

namespace Computer_Seekho_DN.Service;

public interface IAlbumService
{
    Task<Album> SaveAlbumAsync(Album album);
    Task<IEnumerable<Album>> GetAllAlbumsAsync();
    Task<Album> GetAlbumByIdAsync(int albumId);
    Task<bool> UpdateAlbumAsync(Album album);
    Task<bool> DeleteAlbumAsync(int albumId);
}
