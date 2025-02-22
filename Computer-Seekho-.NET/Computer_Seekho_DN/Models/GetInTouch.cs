using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Models;

[Table("get_in_touch")]
public partial class GetInTouch
{
    [Key]
    [Column("get_in_touch_id")]
    public int GetInTouchId { get; set; }

    [Column("course_name")]
    [StringLength(255)]
    public string? CourseName { get; set; }

    [Column("enquirer_email")]
    [StringLength(255)]
    public string EnquirerEmail { get; set; } = null!;

    [Column("enquirer_name")]
    [StringLength(255)]
    public string? EnquirerName { get; set; }

    [Column("enquirer_message")]
    [StringLength(255)]
    public string? EnquirerMessage { get; set; }

    [Column("enquirer_mobile")]
    [StringLength(255)]
    public string EnquirerMobile { get; set; } = null!;
}
