using System;
using System.ComponentModel.DataAnnotations;
using CS2DROP.Domain.Entities;
using CS2DROP.Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace CS2DROP.WebAPI.Models
{
    public class SkinModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ItemRarity Rarity { get; set; }
        public decimal Price { get; set; }
        public string Collection { get; set; }
        public string ImagePath { get; set; }

        [Required(ErrorMessage = "Select an image")]
        public IFormFile? ImageFile { get; set; }
    }
}