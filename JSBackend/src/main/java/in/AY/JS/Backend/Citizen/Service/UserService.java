package in.AY.JS.Backend.Citizen.Service;

import java.util.List;

import in.AY.JS.Backend.Citizen.Payload.UserDto;



public interface UserService 
{
	UserDto registerNewUser(UserDto user);

	UserDto loginUser(UserDto userDto);
	
	UserDto updateUser(UserDto user, String uPhone);
	
	UserDto getUser(String uPhone);
	
	List<UserDto> getAllUsers();
	
	void deleteUser(String uPhone);
}
