using AutoMapper;
using CS2DROP.Application.DTO;
using CS2DROP.Domain.Entities;
using CS2DROP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CS2DROP.Infrastructure.Services
{
    public class CaseOpeningService
    {
        private readonly IMapper mapper;
        private readonly AppDbContext dbContext;

        public CaseOpeningService(IMapper mapper, AppDbContext dbContext)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }

        public async Task<SkinDto?> OpenCaseAsync(Guid caseGuid)
        {
            var caseItem = dbContext.Cases.Include(c => c.Skins).FirstOrDefault(c => c.Id == caseGuid);

            if (caseItem == null)
            {
                return null;
            }

            List<double> weights = caseItem.Skins.Select(s => (double)(1 / (decimal)MathF.Pow((float)s.Price, 2))).ToList();

            double totalWeight = weights.Sum();
            Random rnd = new Random();
            double r = rnd.NextDouble() * totalWeight;

            double cumulative = 0;
            SkinItem result = null!;
            for (int i = 0; i < caseItem.Skins.Count; i++)
            {
                cumulative += weights[i];
                if (r <= cumulative)
                {
                    result = caseItem.Skins[i];
                    break;
                }
            }

            return mapper.Map<SkinDto>(result);
        }
    }
}