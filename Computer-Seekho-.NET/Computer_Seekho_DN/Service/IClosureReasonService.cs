using Computer_Seekho_DN.Models;

namespace Computer_Seekho_DN.Service;

public interface IClosureReasonService
{
    Task<IEnumerable<ClosureReason>> GetAllClosureReasons();
    Task<ClosureReason> GetClosureReasonById(int id);
    Task<ClosureReason> AddClosureReason(ClosureReason closureReason);
    Task<bool> DeleteClosureReason(int id);
}
