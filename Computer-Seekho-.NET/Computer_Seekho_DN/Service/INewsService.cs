using System.Collections.Generic;
using System.Threading.Tasks;
using Computer_Seekho_DN.Models;

namespace Computer_Seekho_DN.Service;
public interface INewsService
{
    Task<IEnumerable<News>> GetAllImages();
    Task<News> SaveImage(News image);
    Task<News?> GetImageById(int id);
    Task DeleteImage(int id);
}