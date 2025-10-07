namespace CS2DROP.Application.DTOs
{
    public class CaseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string ImageUrl { get; set; } = default!;
        public decimal Price { get; set; }

        public List<CaseItemDto> Items { get; set; } = new();
    }
}