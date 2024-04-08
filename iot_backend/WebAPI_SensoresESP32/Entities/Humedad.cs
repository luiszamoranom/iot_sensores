using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI_SensoresESP32.Entities;

/* clase que representa la tabla humedad en la base de datos */
public class Humedad
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    
    [Required]
    public  double valor { get; set; }
    
    public DateTime createdAt { get; set; }
    
    public Humedad()
    {
        createdAt = TimeZoneInfo.ConvertTimeFromUtc(
            DateTime.UtcNow,
            TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time")
        );
    }
}