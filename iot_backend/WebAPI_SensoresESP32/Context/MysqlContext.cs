using Microsoft.EntityFrameworkCore;
using WebAPI_SensoresESP32.Entities;

namespace WebAPI_SensoresESP32.Context;

/* clase para conectarse con la base de dato, funciona como repositorio
 , es decir, conectarse mediante metodos para realizar consulta a las tablas */
public class MysqlContext: DbContext
{
    public MysqlContext(DbContextOptions<MysqlContext> options): base(options)
    {
    }
    
    public DbSet<Humedad> humedad { get; set; }
    public DbSet<Luminosidad> luminosidad { get; set; }
    public DbSet<Temperatura> temperatura { get; set; }
}