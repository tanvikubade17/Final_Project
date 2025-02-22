using Computer_Seekho_DN.DTO;
using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Service;

public class PaymentService : IpaymentService
{
    private readonly ComputerSeekhoDbContext _dbContext;

    public PaymentService(ComputerSeekhoDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<Payment> Add(Payment payment)
    {
        var student = _dbContext.Students.Find(payment.StudentId);
        if(student.PaymentDue - payment.Amount < 0)
        {
            throw new InvalidOperationException("Invalid Payment Amount");
        }
        _dbContext.Payments.Add(payment);
        await _dbContext.SaveChangesAsync();
        return payment;
    }

    public async Task<Payment> getPayment(int id)
    {
        return await _dbContext.Payments.FindAsync(id);
    }

    public async Task<IEnumerable<Payment>> getPaymentList()
    {
        return await _dbContext.Payments
            .Include(p=>p.PaymentType)
            .Include(p=>p.Student)
            .ToListAsync();
    }

    public async Task UpdatePaymentDueAsync(int studentId, int amount)
    {
        var student = await _dbContext.Students.FirstOrDefaultAsync(s => s.StudentId == studentId);
        if (student != null)
        {
            student.PaymentDue -= amount;
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task<PaymentDTO?> getPaymentDTO(int paymentId)
    {
        return await (from p in _dbContext.Payments
                      join s in _dbContext.Students on p.StudentId equals s.StudentId
                      join pt in _dbContext.PaymentTypes on p.PaymentTypeId equals pt.PaymentTypeId
                      where p.PaymentId == paymentId
                      select new PaymentDTO(
                          s.StudentName,
                          s.StudentEmail,
                          (int)p.Amount,
                          (DateOnly)p.PaymentDate,
                          pt.PaymentTypeDesc
                      )).FirstOrDefaultAsync();
    }
}
