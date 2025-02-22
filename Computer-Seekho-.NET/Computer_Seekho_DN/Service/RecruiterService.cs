using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Service;

public class RecruiterService : IRecruiterService
{
    private readonly ComputerSeekhoDbContext _context;

    public RecruiterService(ComputerSeekhoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Recruiter>> GetAllRecruiters()
    {
        return await _context.Recruiters.ToListAsync();
    }

    public async Task<Recruiter> Add(Recruiter recruiter)
    {
        try
        {
            _context.Recruiters.Add(recruiter);
            await _context.SaveChangesAsync();
            return recruiter;
        }
        catch (Exception ex)
        {
            throw new Exception("Error adding recruiter: " + ex.Message);
        }
    }

    public async Task<bool> DeleteRecruiter(int id)
    {
        var recruiter = await _context.Recruiters.FindAsync(id);
        if (recruiter == null) return false;

        _context.Recruiters.Remove(recruiter);
        await _context.SaveChangesAsync();
        return true;
    }
}
