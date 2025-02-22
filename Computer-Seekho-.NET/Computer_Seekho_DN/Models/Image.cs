using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Computer_Seekho_DN.Models;

[Table("images")]
[Index("AlbumId", Name = "FK724cv7ds8vwsp7mpi6e5s7keq")]
public partial class Image
{
    [Key]
    [Column("image_id")]
    public int ImageId { get; set; }

    [Column("image_url")]
    [StringLength(255)]
    public string ImageUrl { get; set; } = null!;

    [Column("album_id")]
    public int? AlbumId { get; set; }

    [Column("image_description")]
    [StringLength(255)]
    public string ImageDescription { get; set; } = null!;

    [Column("image_title")]
    [StringLength(255)]
    public string ImageTitle { get; set; } = null!;

    [ForeignKey("AlbumId")]
    [InverseProperty("Images")]
    public virtual Album? Album { get; set; }
}
