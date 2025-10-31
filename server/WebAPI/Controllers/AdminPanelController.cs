using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;
using CS2DROP.Application.DTO;
using CS2DROP.Domain.Entities;
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
        private readonly CasesService casesService;

        private readonly IMapper mapper;
        private readonly IWebHostEnvironment env;

        public AdminPanelController(SkinsService skinsService, IMapper mapper, IWebHostEnvironment env, CasesService casesService)
        {
            this.skinsService = skinsService;
            this.mapper = mapper;
            this.env = env;
            this.casesService = casesService;
        }

        public async Task<IActionResult> GetSkins()
        {
            var items = await skinsService.GetAllSkinsAsync();
            var skins = mapper.Map<IEnumerable<SkinModel>>(items);

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

        public async Task<IActionResult> GetCases()
        {
            var items = await casesService.GetAllCasesAsync();
            var cases = mapper.Map<IEnumerable<CaseModel>>(items);

            return Ok(cases);
        }

        [HttpGet]
        public async Task<IActionResult> GetCaseById(Guid id)
        {
            var item = await casesService.GetCaseAsync(id);

            if (item != null)
            {
                return Ok(item);
            }

            return BadRequest();
        }

        public async Task<IActionResult> DeleteCase(Guid id)
        {
            await casesService.DeleteCaseAsync(id);
            return RedirectToAction("CasePanel");
        }

        [HttpPost]
        public async Task<IActionResult> AddCase(
            [FromForm] string name,
            [FromForm] string collection,
            [FromForm] decimal price,
            [FromForm] IFormFile file,
            [FromForm] string skins)
        {
            var skinIds = JsonSerializer.Deserialize<List<Guid>>(skins);
            var dto = new CaseDto
            {
                Id = Guid.NewGuid(),
                Name = name,
                Collection = collection,
                Price = price,
            };

            if (skinIds != null)
            {
                dto.SkinIds = skinIds;
            }

            if (file != null && file.Length > 0)
            {
                var filename = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var dir = Path.Combine(env.WebRootPath, "images/cases");

                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }

                using (var stream = new FileStream(Path.Combine(dir, filename), FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                dto.ImagePath = "/images/cases/" + filename;
            }

            await casesService.AddCaseAsync(dto);

            return Ok(dto);
        }

        [HttpGet]
        public IActionResult GetCaseImagesDir()
        {
            return Ok("images/cases");
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