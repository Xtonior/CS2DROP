using CS2DROP.Domain.Entities;
using CS2DROP.Domain.Enums;

namespace CS2DROP.Application.DTO
{
    public class CaseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Collection { get; set; }
        public string ImagePath { get; set; }
        public IEnumerable<Guid> SkinIds { get; set; }
    }
}