package in.AY.JS.Backend.Citizen.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.AY.JS.Backend.Citizen.Payload.UserDto;
import in.AY.JS.Backend.Citizen.Service.UserService;

@RestController
@RequestMapping("/auth/users")
public class UserAuthController {

	@Autowired
	private UserService us;
	
	@PostMapping("/register")
	public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto)
	{
		UserDto CreateUserDto = this.us.registerNewUser(userDto);
		return new ResponseEntity<>(CreateUserDto, HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserDto> CreateToken(@RequestBody UserDto userDto)
	{
		UserDto loginUserDto = this.us.loginUser(userDto);
		return new ResponseEntity<UserDto>(loginUserDto, HttpStatus.OK);
	}
}
