using CS2DROP.Domain.Enums;

namespace CS2DROP.Application.DTO
{
    public class SkinDto
    {
        public string Name { get; set; }
        public ItemRarity Rarity { get; set; }
        public decimal Price { get; set; }
        public string Collection { get; set; }
    }
}