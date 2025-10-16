using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CS2DROP.Infrastructure.Data
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            var connectionString = "Data Source=cs2drop.db";

            optionsBuilder.UseSqlite(connectionString)
                          .EnableSensitiveDataLogging()
                          .EnableDetailedErrors();

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}