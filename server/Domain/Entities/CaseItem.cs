using CS2DROP.Domain.Enums;

namespace CS2DROP.Domain.Entities
{
    public class CaseItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Collection { get; set; }
        public string ImagePath { get; set; }
        public List<SkinItem> Skins { get; set; } = new();
    }
}