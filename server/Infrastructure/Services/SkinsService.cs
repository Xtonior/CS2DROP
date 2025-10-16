using AutoMapper;
using CS2DROP.Application.DTO;
using CS2DROP.Domain.Entities;
using CS2DROP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CS2DROP.Infrastructure.Services
{
    public class SkinsService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;

        public SkinsService(AppDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task AddSkin(SkinDto dto)
        {
            var item = mapper.Map<SkinItem>(dto);

            dbContext.Skins.Add(item);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<SkinDto>> GetAllSkinsAsync()
        {
            var items = await dbContext.Skins.ToListAsync();
            return mapper.Map<IEnumerable<SkinDto>>(items);
        }
    }
}