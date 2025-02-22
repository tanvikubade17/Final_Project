using Computer_Seekho_DN.DTO;
using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Service;

public class PlacementService : IPlacementService
{
    private readonly ComputerSeekhoDbContext _dbcontext;

    public PlacementService(ComputerSeekhoDbContext dbcontext)
    {
        _dbcontext = dbcontext;
    }

    public async Task<IEnumerable<PlacedStudent>> GetByBatch(int id)
    {
        return await _dbcontext.Placements
        .Where(p => p.Batch.BatchId == id)
        .OrderBy(p => p.Batch.BatchId)
        .Select(p => new PlacedStudent(p.Batch.BatchId,p.Batch.BatchName,p.Student.StudentName,p.Student.PhotoUrl,p.Recruiter.RecruiterName
        )).ToListAsync();
    }

    public async Task<Placement> GetById(int id)
    {
        return await _dbcontext.Placements.FindAsync(id);
    }

    public async Task<IEnumerable<Placement>> GetPlacement()
    {
        return await _dbcontext.Placements.ToListAsync();
    }

    public async Task Add(Placement placement)
    {
        await _dbcontext.AddAsync(placement);
    }
}
