using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Models;

[Table("payment_type")]
public partial class PaymentType
{
    [Key]
    [Column("payment_type_id")]
    public int PaymentTypeId { get; set; }

    [Column("payment_type_desc")]
    [StringLength(255)]
    public string? PaymentTypeDesc { get; set; }

    [JsonIgnore]
    [InverseProperty("PaymentType")]
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
