using Computer_Seekho_DN.DTO;
using Computer_Seekho_DN.Models;

namespace Computer_Seekho_DN.Service;

public interface IPlacementService
{
    Task<Placement> GetById(int id);
    Task<IEnumerable<Placement>> GetPlacement();
    Task<IEnumerable<PlacedStudent>> GetByBatch(int id);
    Task Add(Placement placement);
}