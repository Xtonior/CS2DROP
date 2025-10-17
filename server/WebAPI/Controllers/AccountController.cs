using System.Threading.Tasks;
using CS2DROP.Domain.Entities;
using CS2DROP.Infrastructure.Identity;
using CS2DROP.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace CS2DROP.WebAPI.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [AllowAnonymous]
        public IActionResult Denied(string? returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        public IActionResult Register()
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");

            return View(new AccountModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(AccountModel model)
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");

            var user = new AppUser
            {
                UserName = model.Name,
                Email = model.Email
            };

            IdentityResult result;
            if (!(result = await userManager.CreateAsync(user)).Succeeded)
            {
                foreach (var err in result.Errors)
                {
                    ModelState.AddModelError("", err.Description);
                }
            }
            else
            {
                await userManager.AddToRoleAsync(user, "User");
            }

            return View();
        }

        public IActionResult Login()
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");

            return View(new AccountModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(AccountModel model)
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");

            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null && user.UserName != null)
            {
                SignInResult result;
                if (!(result = await signInManager.PasswordSignInAsync(user, model.Password, false, false)).Succeeded)
                {
                    ModelState.AddModelError("", "Invalid login or password");
                }

                return RedirectToAction("Index", "Home");
            }

            ModelState.AddModelError("", "Invalid login or password");

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}