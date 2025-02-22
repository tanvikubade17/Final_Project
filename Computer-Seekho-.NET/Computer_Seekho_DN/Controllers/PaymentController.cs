using System.Text.Json;
using System.Text;
using Computer_Seekho_DN.DTO;
using Computer_Seekho_DN.Models;
using Computer_Seekho_DN.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Controllers;

[Route("payment")]
[ApiController]
public class PaymentController : ControllerBase
{
    private readonly IpaymentService _paymentService;
    public PaymentController(IpaymentService paymentService)
    {
        _paymentService = paymentService;
    }
    [HttpGet("getAll")]
    public async Task<ActionResult<IEnumerable<Payment>>> GetAllPayments()
    {
        return Ok(await _paymentService.getPaymentList());
    }

    [HttpGet("get/{id}")]
    public async Task<ActionResult<Payment>> GetPayment(int id)
    {
        var payment = await _paymentService.getPayment(id);
        if (payment.Amount == null)
            return NotFound($"Payment with ID {id} not found.");

        return Ok(payment);
    }

    [HttpPost("add")]
    public async Task<ActionResult<Payment>> AddPayment([FromBody] Payment payment)
    {
        if (payment == null)
            return BadRequest("Invalid payment details.");
        var result = await _paymentService.Add(payment);
        PaymentDTO paymentDTO = (await _paymentService.getPaymentDTO(result.PaymentId));
        await _paymentService.UpdatePaymentDueAsync(payment.StudentId, (int)payment.Amount);

        Console.WriteLine(paymentDTO.StudentEmail);
        using (HttpClient client = new HttpClient())
        {
            String Url = "http://localhost:9003/emailpayment";
            var data = new Dictionary<string, object>
        {
            { "email", paymentDTO.StudentEmail },
            { "studentName", paymentDTO.StudentName },
            { "amount", paymentDTO.Amount },
            { "date", paymentDTO.PaymentDate },
            { "Type", paymentDTO.PaymentTypeDesc},
            {"paymentId", payment.PaymentId}
        };
            String jsonData = JsonSerializer.Serialize(data);
            StringContent emailrequest = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync(Url, emailrequest);
            if (response.IsSuccessStatusCode)
            {
                return Ok(new { message = "Payment added successfully." });
            }

            return Ok(new { message = "Payment added successfully." });
        }
    }
}