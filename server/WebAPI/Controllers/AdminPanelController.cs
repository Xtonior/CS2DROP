using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CS2DROP.Application.DTO;
using CS2DROP.Domain.Enums;
using CS2DROP.Infrastructure.Services;
using CS2DROP.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CS2DROP.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[action]")]
    public class AdminPanelController : Controller
    {
        private readonly SkinsService skinsService;
        private readonly IMapper mapper;
        private readonly IWebHostEnvironment env;

        public AdminPanelController(SkinsService skinsService, IMapper mapper, IWebHostEnvironment env)
        {
            this.skinsService = skinsService;
            this.mapper = mapper;
            this.env = env;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await skinsService.GetAllSkinsAsync());

        // public IActionResult Index() => View();

        public async Task<IActionResult> SkinPanel()
        {
            var items = await skinsService.GetAllSkinsAsync();
            var skins = mapper.Map<IEnumerable<SkinModel>>(items);

            // var vm = new SkinPanelViewModel
            // {
            //     NewSkin = new SkinModel(),
            //     Skins = skins
            // };

            // ViewBag.RarityOptions =
            // Enum.GetValues(typeof(ItemRarity))
            //     .Cast<ItemRarity>()
            //     .Select(r =>
            //     new SelectListItem
            //     {
            //         Value = r.ToString(),
            //         Text = r.ToString()
            //     });

            return Ok(skins);
        }

        public async Task<IActionResult> DeleteSkin(Guid id)
        {
            await skinsService.DeleteSkinAsync(id);
            return RedirectToAction("SkinPanel");
        }

        [HttpPost]
        public async Task<IActionResult> AddSkin(
            [FromForm] string name,
            [FromForm] string rarity,
            [FromForm] string collection,
            [FromForm] decimal price,
            [FromForm] IFormFile file)
        {
            var dto = new SkinDto
            {
                Id = Guid.NewGuid(),
                Name = name,
                Collection = collection,
                Price = price,
                Rarity = Enum.Parse<ItemRarity>(rarity),
            };

            if (file != null && file.Length > 0)
            {
                var filename = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var dir = Path.Combine(env.WebRootPath, "images/skins");

                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }

                using (var stream = new FileStream(Path.Combine(dir, filename), FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                dto.ImagePath = "/images/skins/" + filename;
            }

            await skinsService.AddSkinAsync(dto);

            return Ok(dto);
        }

        [HttpGet]
        public IActionResult GetSkinImagesDir()
        {
            return Ok("images/skins");
        }

        // public IActionResult CasePanel() => View(skinsService);

        // [HttpPost]
        // public async Task<IActionResult> AddCase(CaseModel caseModel)
        // {
        //     await skinsService.AddSkin(caseMode);
        //     return Redirect("Skins");
        // }
    }
}