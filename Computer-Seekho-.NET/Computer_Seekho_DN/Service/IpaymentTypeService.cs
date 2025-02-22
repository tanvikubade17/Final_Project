using Computer_Seekho_DN.Models;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Service;

public interface IpaymentTypeService
{
    Task<IEnumerable<PaymentType>> GetPaymentTypes();
    Task<PaymentType> Add(PaymentType paymentType);
    Task<PaymentType> GetById(int id);
}