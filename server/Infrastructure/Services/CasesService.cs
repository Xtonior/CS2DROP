using AutoMapper;
using CS2DROP.Application.DTO;
using CS2DROP.Domain.Entities;
using CS2DROP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CS2DROP.Infrastructure.Services
{
    public class CasesService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;
        private readonly ILogger<CasesService> logger;

        public CasesService(AppDbContext dbContext, IMapper mapper, ILogger<CasesService> logger)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task AddCaseAsync(CaseDto dto)
        {
            var item = mapper.Map<CaseItem>(dto);

            dbContext.Cases.Add(item);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteCaseAsync(Guid id)
        {
            var item = await dbContext.Cases.FindAsync(id);
            if (item == null)
            {
                logger.Log(LogLevel.Warning, "Attempting to delete skin that doesn't appear in database!");
                return;
            }

            dbContext.Cases.Remove(item);
            await dbContext.SaveChangesAsync();
        }

        public async Task<CaseDto?> GetCaseAsync(Guid guid)
        {
            var caseEntity = await dbContext.Cases.FirstOrDefaultAsync(x => x.Id == guid);

            if (caseEntity == null)
                return null;

            return mapper.Map<CaseDto>(caseEntity);
        }

        public async Task<IEnumerable<CaseDto>> GetAllSkinsAsync()
        {
            var items = await dbContext.Cases.ToListAsync();
            return mapper.Map<IEnumerable<CaseDto>>(items);
        }
    }
}