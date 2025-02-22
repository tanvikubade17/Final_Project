using Computer_Seekho_DN.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Computer_Seekho_DN.Service
{
    public interface IGetInTouchService
    {
        Task<GetInTouch> GetGetInTouch(int id);
        Task<GetInTouch> DeleteGetInTouch(int id);
        Task<IEnumerable<GetInTouch>> GetAllGetInTouch();
        Task<GetInTouch> Add(GetInTouch record);
        Task<GetInTouch> Update(GetInTouch record);
    }
}
