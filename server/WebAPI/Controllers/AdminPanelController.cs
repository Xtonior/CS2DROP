using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CS2DROP.Application.DTO;
using CS2DROP.Domain.Enums;
using CS2DROP.Infrastructure.Services;
using CS2DROP.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CS2DROP.WebAPI.Controllers
{
    public class AdminPanelController : Controller
    {
        private readonly SkinsService skinsService;
        private readonly IMapper mapper;

        public AdminPanelController(SkinsService skinsService, IMapper mapper)
        {
            this.skinsService = skinsService;
            this.mapper = mapper;
        }

        public IActionResult Index() => View();

        public async Task<IActionResult> SkinPanel()
        {
            var items = await skinsService.GetAllSkinsAsync();
            var skins = mapper.Map<IEnumerable<SkinModel>>(items);

            var vm = new SkinPanelViewModel
            {
                NewSkin = new SkinModel(),
                Skins = skins
            };

            ViewBag.RarityOptions =
            Enum.GetValues(typeof(ItemRarity))
                .Cast<ItemRarity>()
                .Select(r =>
                new SelectListItem
                {
                    Value = r.ToString(),
                    Text = r.ToString()
                });

            return View(vm);
        }

        public async Task<IActionResult> DeleteSkin(Guid id)
        {
            await skinsService.DeleteSkinAsync(id);
            return RedirectToAction("SkinPanel");
        }

        [HttpPost]
        public async Task<IActionResult> AddSkin(SkinPanelViewModel viewModel)
        {
            var dto = mapper.Map<SkinDto>(viewModel.NewSkin);

            await skinsService.AddSkinAsync(dto);
            return Redirect("SkinPanel");
        }

        public IActionResult CasePanel() => View(skinsService);

        // [HttpPost]
        // public async Task<IActionResult> AddCase(CaseModel caseModel)
        // {
        //     await skinsService.AddSkin(caseMode);
        //     return Redirect("Skins");
        // }
    }
}