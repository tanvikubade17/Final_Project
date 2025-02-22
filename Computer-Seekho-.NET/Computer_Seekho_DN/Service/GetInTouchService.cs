using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Computer_Seekho_DN.Service
{
    public class GetInTouchService : IGetInTouchService
    {
        private readonly ComputerSeekhoDbContext _context;

        public GetInTouchService(ComputerSeekhoDbContext context)
        {
            _context = context;
        }

        public async Task<GetInTouch> GetGetInTouch(int id)
        {
            var record = await _context.GetInTouches.FindAsync(id);
            return record;
        }

        public async Task<GetInTouch?> DeleteGetInTouch(int id)
        {
            var record = await _context.GetInTouches.FindAsync(id);
            if (record != null)
            {
                _context.GetInTouches.Remove(record);
                await _context.SaveChangesAsync();
            }
            return record;
        }

        public async Task<IEnumerable<GetInTouch>> GetAllGetInTouch()
        {
            var records = await _context.GetInTouches.ToListAsync();
            return (records);
        }

        public async Task<GetInTouch> Add(GetInTouch record)
        {
            _context.GetInTouches.Add(record);
            await _context.SaveChangesAsync();
            return record;
        }

        public async Task<GetInTouch?> Update(GetInTouch record)
        {
            var existingRecord = await _context.GetInTouches.FindAsync(record.GetInTouchId);
            if (existingRecord != null)
            {
                _context.Entry(existingRecord).CurrentValues.SetValues(record);
                await _context.SaveChangesAsync();
            }
            return existingRecord;
        }
    }
}
