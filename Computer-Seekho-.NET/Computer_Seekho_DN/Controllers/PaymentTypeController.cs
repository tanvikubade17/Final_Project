using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Controllers;

[Route("paymentTypes")]
[ApiController]
public class PaymentTypeController : ControllerBase
{
    private readonly IpaymentTypeService _paymentTypeService;
    //private readonly ILogger _logger;
    public PaymentTypeController(IpaymentTypeService paymentTypeService)
    {
        _paymentTypeService = paymentTypeService;
    }

    [HttpGet("getAll")]
    public async Task<ActionResult<IEnumerable<PaymentType>>> GetAllPayments()
    {
        return Ok(await _paymentTypeService.GetPaymentTypes());
    }

    [HttpGet("get/{id}")]
    public async Task<ActionResult<PaymentType>> GetPaymentType(int id)
    {
        return await _paymentTypeService.GetById(id);
    }
    [HttpPost("add")]
    public async Task<ActionResult<PaymentType>> AddPayment([FromBody] PaymentType paymentType)
    {
        if (paymentType == null)
        {
            return BadRequest(new { message = "Invalid staff data" });
        }
        else
        {
            var paymentType1 = await _paymentTypeService.Add(paymentType);
            return Ok(paymentType1);
        }
    }
}
