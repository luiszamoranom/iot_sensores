using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI_SensoresESP32.Entities;

/* clase que representa la tabla luminosidad en la base de datos */
public class Luminosidad
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    
    [Required]
    public double valor { get; set; }
    
    public DateTime createdAt { get; set; }
    
    public Luminosidad()
    {
        createdAt = TimeZoneInfo.ConvertTimeFromUtc(
            DateTime.UtcNow,
            TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time")
            );
    }
}