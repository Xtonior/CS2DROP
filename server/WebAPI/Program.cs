using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CS2DROP.Infrastructure;
using CS2DROP.Infrastructure.Identity;
using CS2DROP.Infrastructure.Data;
using System.Threading.Tasks;
using CS2DROP.Application.Mapping;
using System;
using CS2DROP.WebAPI.Mapping;
using CS2DROP.Infrastructure.Services;

namespace CS2DROP.WebAPI;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddIdentity<AppUser, AppRole>(
            options =>
            {
                options.Password.RequiredLength = 8;
                options.User.RequireUniqueEmail = true;
            }
        )
        .AddRoles<AppRole>()
        .AddEntityFrameworkStores<AppDbContext>()
        .AddDefaultTokenProviders();

        builder.Services.ConfigureApplicationCookie(
            options =>
            {
                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = "/Account/Denied";
            });

        builder.Logging.ClearProviders();
        builder.Logging.AddConsole();

        var dbConnection = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<AppDbContext>(
            options =>
            {
                options.UseSqlite(dbConnection).EnableSensitiveDataLogging().EnableDetailedErrors();
            });

        // Add services to the container.
        builder.Services.AddControllersWithViews();

        var loggerFactory = builder.Services.BuildServiceProvider().GetRequiredService<ILoggerFactory>();
        var mapperConf = new MapperConfiguration(conf =>
        {
            conf.AddProfile<AppMappingProfile>();
            conf.AddProfile<WebMappingProfile>();
        }, loggerFactory);

        var mapper = mapperConf.CreateMapper();
        builder.Services.AddSingleton(mapper);
        builder.Services.AddScoped<SkinsService>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseRouting();

        app.UseStaticFiles();

        app.UseAuthentication();
        app.UseAuthorization();

        await using (var scope = app.Services.CreateAsyncScope())
        {
            await IdentitySeeder.SeedAsync(scope.ServiceProvider);
            await IdentitySeeder.SeedAdminRole(app.Services, app.Configuration);
        }

        app.MapStaticAssets();
        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}")
            .WithStaticAssets();

        app.Run();
    }
}
