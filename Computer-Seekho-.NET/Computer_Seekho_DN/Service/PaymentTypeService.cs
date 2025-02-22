using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Service;

public class PaymentTypeService : IpaymentTypeService
{
    private readonly ComputerSeekhoDbContext _dbContext;
    public PaymentTypeService(ComputerSeekhoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PaymentType> Add(PaymentType paymentType)
    {
        _dbContext.Add(paymentType);
        await _dbContext.SaveChangesAsync();
        return paymentType;
    }

    public async Task<PaymentType> GetById(int id)
    {
        return await _dbContext.PaymentTypes.FindAsync(id);
    }

    public async Task<IEnumerable<PaymentType>> GetPaymentTypes()
    {
        return await _dbContext.PaymentTypes.ToListAsync();
    }
}
