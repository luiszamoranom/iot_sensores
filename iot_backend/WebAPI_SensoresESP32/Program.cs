using Microsoft.EntityFrameworkCore;
using WebAPI_SensoresESP32.Context;

var builder = WebApplication.CreateBuilder(args);

// conexion con mysql
var connectionString = builder.Configuration.GetConnectionString("Connection");
builder.Services.AddDbContext<MysqlContext>(options => options.UseMySQL(connectionString));

// configuracion cors para conectarse con la webapi
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("*")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();