package in.AY.JS.Backend.Citizen.Implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.AY.JS.Backend.Citizen.Entity.User;
import in.AY.JS.Backend.Citizen.Payload.UserDto;
import in.AY.JS.Backend.Citizen.Repo.UserRepo;
import in.AY.JS.Backend.Citizen.Service.UserService;
import in.AY.JS.Backend.Exception.ApiException;
import in.AY.JS.Backend.Exception.ResourceNotFoundException;


@Service
public class UserImpl implements UserService{

	@Autowired
	UserRepo ur;

	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public UserDto registerNewUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);
		if(ur.existsByPhoneNo(user.getPhoneNo())) {
			throw new ApiException("Phone number already exist");
		}
		
		User newUser = ur.save(user);
		
		return this.modelMapper.map(newUser, UserDto.class);
	}
	
	@Override
	public UserDto loginUser(UserDto userDto) {

	    User u = this.ur.findByPhoneNo(userDto.getPhoneNo())
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "User",
	                            "Phone Number",
	                            userDto.getPhoneNo()
	                    )
	            );

	    if (!userDto.getPassword().equals(u.getPassword())) {
	    	throw new ApiException("Invalid phone number or password");
	    }

	    return this.modelMapper.map(u, UserDto.class);
	}
	
	@Override
	public UserDto updateUser(UserDto userDto, String uPhone) {
		User u = this.ur.findByPhoneNo(uPhone)
				.orElseThrow((()-> new ResourceNotFoundException("User", " Phone Number ",uPhone)));
		
		u.setName(userDto.getName());
	    u.setPassword(userDto.getPassword());
	    
		User updateUser = ur.save(u);
		
		return this.modelMapper.map(updateUser, UserDto.class);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> allUser = this.ur.findAll();
		
		List<UserDto> userDtos = allUser.stream()
	            .map(user -> this.modelMapper.map(user, UserDto.class))
	            .collect(Collectors.toList());
		
		return userDtos;
	}

	@Override
	public UserDto getUser(String uPhone) {
		User getUser = this.ur.findByPhoneNo(uPhone).orElseThrow((()-> new ResourceNotFoundException("User", " Phone Number ",uPhone)));
		
		return modelMapper.map(getUser, UserDto.class);
	}

	@Override
	public void deleteUser(String uPhone) {
		User user = this.ur.findByPhoneNo(uPhone).orElseThrow((()-> new ResourceNotFoundException("User", " Phone Number ",uPhone)));
		this.ur.delete(user);
	}

	

}
