using CS2DROP.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CS2DROP.Infrastructure.Identity
{
    public static class IdentitySeeder
    {
        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();

            var roles = new[]
            {
                "User",
                "Moderator",
                "Admin"
            };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new AppRole()
                    {
                        Name = role,
                        NormalizedName = role.ToUpperInvariant(),
                        ConcurrencyStamp = Guid.NewGuid().ToString()
                    });
                }
            }
        }

        public static async Task SeedAdminRole(IServiceProvider services, IConfiguration config)
        {
            using var scope = services.CreateScope();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

            var email = config["AdminUser:Email"];
            var password = config["AdminUser:Password"];
            var name = config["AdminUser:Name"];

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            {
                throw new Exception("Invalid Admin credentials");
            }

            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                throw new Exception("Missing Admin role");
            }

            await userManager.CreateAsync(new AppUser() { UserName = name, Email = email }, password);
        }
    }
}