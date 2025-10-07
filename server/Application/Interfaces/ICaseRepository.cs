using CS2DROP.Domain.Entities;

namespace CS2DROP.Application.Interfaces
{
    public interface ICaseRepository
    {
        Task<IEnumerable<Case>> GetAllAsync();
        Task<Case?> GetByIdAsync(int id);

        Task AddAsync(Case caseEntity);
        Task UpdateAsync(Case caseEntity);
        Task RemoveAsync(Case caseEntity);
    }
}