using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Service;

public class BatchSevice :IBatchService
{
    private readonly ComputerSeekhoDbContext _dbContext;

    public BatchSevice(ComputerSeekhoDbContext computerSeekhoDbContext)
    {
        this._dbContext = computerSeekhoDbContext;
    }
    public async Task<Batch> Add(Batch batch)
    {
        _dbContext.Add(batch);
        await _dbContext.SaveChangesAsync();
        return batch;
    }

    public async Task<bool> DeleteBatch(int batchId)

    {

        Batch batch = _dbContext.Batches.Find(batchId);

        if (batch != null)

        {

            _dbContext.Batches.Remove(batch);

            await _dbContext.SaveChangesAsync();

            return true;

        }

        return false;



    }

    public async Task<IEnumerable<Batch>> GetAllBatches()
    {
        if (_dbContext.Batches == null)
        {
            return null;
        }

        return await _dbContext.Batches.Include(b => b.Course).ToListAsync();
    }

    public async Task<Batch?> GetBatchByBatchId(String name)
    {
        if (_dbContext.Batches == null)
        {
            return null;
        }

        var batch = await _dbContext.Batches.FirstOrDefaultAsync(x=> x.BatchName == name);
        if (batch == null)
        {
            return null;
        }
        return batch;
    }

    public async Task<bool> Update(Batch batch)
    {

        if (batch == null)
        {
            return false;
        }

        _dbContext.Entry(batch).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (ex.InnerException != null)
            {
                return false;
            }
            else
            {
                throw ex;
            }
        }

    }
}
