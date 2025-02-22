using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Models;

[Table("news")]
public partial class News
{
    [Key]
    [Column("news_id")]
    public int NewsId { get; set; }

    [Column("news_description")]
    [StringLength(255)]
    public string NewsDescription { get; set; } = null!;

    [Column("news_title")]
    [StringLength(255)]
    public string NewsTitle { get; set; } = null!;

    [Column("news_url")]
    [StringLength(255)]
    public string NewsUrl { get; set; } = null!;
}
