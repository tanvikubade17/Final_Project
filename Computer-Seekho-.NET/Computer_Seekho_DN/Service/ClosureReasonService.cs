using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Service;

public class ClosureReasonService :IClosureReasonService
{
    private readonly ComputerSeekhoDbContext _context;

    public ClosureReasonService(ComputerSeekhoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ClosureReason>> GetAllClosureReasons()
    {
        return await _context.ClosureReasons.ToListAsync();
    }

    public async Task<ClosureReason> GetClosureReasonById(int id)
    {
        return await _context.ClosureReasons.FindAsync(id);
    }

    public async Task<ClosureReason> AddClosureReason(ClosureReason closureReason)
    {
        if (closureReason == null)
        {
            return null;
        }

        _context.ClosureReasons.Add(closureReason);
        await _context.SaveChangesAsync();
        return closureReason;
    }

    public async Task<bool> DeleteClosureReason(int id)
    {
        var closureReason = await _context.ClosureReasons.FindAsync(id);
        if (closureReason == null)
        {
            return false;
        }

        _context.ClosureReasons.Remove(closureReason);
        await _context.SaveChangesAsync();
        return true;
    }
}
