using Computer_Seekho_DN.DTO;
using Computer_Seekho_DN.Models;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Service;

public interface IpaymentService
{
    Task<Payment> getPayment(int id);
    Task<IEnumerable<Payment>> getPaymentList();
    Task<Payment> Add(Payment payment);
    Task<PaymentDTO> getPaymentDTO(int id);
    Task UpdatePaymentDueAsync(int studentId, int amount);
}
