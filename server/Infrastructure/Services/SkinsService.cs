using AutoMapper;
using CS2DROP.Application.DTO;
using CS2DROP.Domain.Entities;
using CS2DROP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CS2DROP.Infrastructure.Services
{
    public class SkinsService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;
        private readonly ILogger<SkinsService> logger;

        public SkinsService(AppDbContext dbContext, IMapper mapper, ILogger<SkinsService> logger)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task AddSkinAsync(SkinDto dto)
        {
            var item = mapper.Map<SkinItem>(dto);

            dbContext.Skins.Add(item);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteSkinAsync(Guid id)
        {
            var item = await dbContext.Skins.FindAsync(id);
            if (item == null)
            {
                logger.Log(LogLevel.Warning, "Attempting to delete skin that doesn't appear in database!");
                return;
            }

            dbContext.Skins.Remove(item);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<SkinDto>> GetAllSkinsAsync()
        {
            var items = await dbContext.Skins.ToListAsync();
            return mapper.Map<IEnumerable<SkinDto>>(items);
        }
    }
}