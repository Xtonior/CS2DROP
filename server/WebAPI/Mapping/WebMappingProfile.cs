using System.Collections.Generic;
using AutoMapper;
using CS2DROP.Application.DTO;
using CS2DROP.WebAPI.Models;

namespace CS2DROP.WebAPI.Mapping
{
    public class WebMappingProfile : Profile
    {
        public WebMappingProfile()
        {
            CreateMap<SkinDto, SkinModel>().ReverseMap();
            // CreateMap<IEnumerable<SkinDto>, IEnumerable<SkinModel>>(); 
        }
    }
}