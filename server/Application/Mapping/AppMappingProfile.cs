using AutoMapper;
using CS2DROP.Application.DTO;
using CS2DROP.Domain.Entities;

namespace CS2DROP.Application.Mapping
{
    public class AppMappingProfile : Profile
    {
        public AppMappingProfile()
        {
            CreateMap<CreateSkinDto, SkinItem>().ReverseMap();
        }
    }
}