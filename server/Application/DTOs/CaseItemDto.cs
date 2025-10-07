using CS2DROP.Domain.Enums;

namespace CS2DROP.Application.DTOs
{
    public class CaseItemDto
    {
        public Guid SkinItemId { get; set; }
        public string ItemName { get; set; } = default!;
        public string ImageUrl { get; set; } = default!;
        public double DropChance { get; set; }
        public ItemRarity Rarity { get; set; } = default!;
    }
}