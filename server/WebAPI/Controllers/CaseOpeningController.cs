using System;
using System.Threading.Tasks;
using CS2DROP.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace CS2DROP.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[action]")]
    public class CaseOpeningController : Controller
    {
        private readonly CaseOpeningService caseOpeningService;

        public CaseOpeningController(CaseOpeningService caseOpeningService)
        {
            this.caseOpeningService = caseOpeningService;
        }

        public async Task<IActionResult> OpenCase(Guid id)
        {
            var skin = await caseOpeningService.OpenCaseAsync(id);

            if (skin == null)
            {
                return BadRequest();
            }
            
            return Ok(skin.Id);
        }
    }
}