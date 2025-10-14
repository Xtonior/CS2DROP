using CS2DROP.Domain.Enums;

namespace CS2DROP.Domain.Entities
{
    public class SkinItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ItemRarity Rarity { get; set; }
        public decimal Price { get; set; }
        public string Collection { get; set; }
    }

}