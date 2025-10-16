using System.Collections.Generic;

namespace CS2DROP.WebAPI.Models
{
    public class SkinPanelViewModel
    {
        public SkinModel NewSkin { get; set; }
        public IEnumerable<SkinModel> Skins { get; set; }
    }
}