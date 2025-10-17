namespace CS2DROP.Domain.Entities
{
    public class Inventory
    {
        public Guid Id { get; set; }
        public User Owner { get; set; }
        public ICollection<SkinItem> SkinItems { get; set; } = new List<SkinItem>();
    }
}