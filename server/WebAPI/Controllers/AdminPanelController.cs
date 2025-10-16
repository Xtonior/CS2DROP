using System.Threading.Tasks;
using AutoMapper;
using CS2DROP.Application.DTO;
using CS2DROP.Infrastructure.Services;
using CS2DROP.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        public IActionResult SkinPanel() => View(skinsService);

        [HttpPost]
        public async Task<IActionResult> AddSkin(SkinModel skinModel)
        {
            var dto = mapper.Map<CreateSkinDto>(skinModel);
            
            await skinsService.AddSkin(dto);
            return Redirect("Skins");
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