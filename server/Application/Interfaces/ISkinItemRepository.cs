using CS2DROP.Domain.Entities;

namespace CS2DROP.Application.Interfaces
{
    public interface ISkinItemRepository
    {
        Task<IEnumerable<SkinItem>> GetAllAsync();
        Task<SkinItem?> GetByIdAsync(int id);

        Task AddAsync(SkinItem skinItemEntity);
        Task UpdateAsync(SkinItem skinItemEntity);
        Task RemoveAsync(SkinItem skinItemEntity);
    }
}