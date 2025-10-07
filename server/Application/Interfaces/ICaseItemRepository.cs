using System.Collections;
using CS2DROP.Domain.Entities;

namespace CS2DROP.Application.Interfaces
{
    public interface ICaseItemRepository
    {
        Task<IEnumerable<CaseItem>> GetByCaseIdAsync(int id);
    }
}