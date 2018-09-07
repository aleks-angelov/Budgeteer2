using AutoMapper;

namespace Budgeteer.Modules.Users
{
	public class UserProfile : Profile
	{
		public UserProfile()
		{
			CreateMap<UserModel, UserDtoModel>();
		}
	}
}
