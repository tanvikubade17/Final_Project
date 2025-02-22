using Computer_Seekho_DN.Models;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Service;

public interface IBatchService
{
    Task<Batch?> GetBatchByBatchId(String name);
    Task<IEnumerable<Batch>> GetAllBatches();
    Task<Batch> Add(Batch batch);
    Task<bool> Update(Batch batch);
    Task<bool> DeleteBatch(int batchId);
}
