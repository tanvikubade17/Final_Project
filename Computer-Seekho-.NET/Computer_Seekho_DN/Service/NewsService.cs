namespace Computer_Seekho_DN.Service;

using System.Collections.Generic;
using System.Threading.Tasks;
using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class NewsService : INewsService
{
    private readonly ComputerSeekhoDbContext _context;

    public NewsService(ComputerSeekhoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<News>> GetAllImages()
    {
        return await _context.News.ToListAsync();
    }

    public async Task<News> SaveImage(News image)
    {
        _context.News.Add(image);
        await _context.SaveChangesAsync();
        return image;
    }

    public async Task<News?> GetImageById(int id)
    {
        return await _context.News.FindAsync(id);
    }

    public async Task DeleteImage(int id)
    {
        var news = await _context.News.FindAsync(id);
        if (news != null)
        {
            _context.News.Remove(news);
            await _context.SaveChangesAsync();
        }
    }
}