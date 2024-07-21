var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(opt =>
    opt.AddPolicy(name: "AllowLocalhost", builder =>
    {
        builder.WithOrigins("http://localhost:44457")
               .AllowAnyMethod()
               .AllowAnyHeader();
    })
);

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowLocalhost");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
