package in.AY.JS.Backend.Citizen.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.AY.JS.Backend.Citizen.Payload.ApiResponse;
import in.AY.JS.Backend.Citizen.Payload.UserDto;
import in.AY.JS.Backend.Citizen.Service.UserService;


@RestController
@RequestMapping("/api/users")
public class UserController 
{
	@Autowired
	private UserService us;
	
	@PutMapping("/{userPhone}")
	public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable("userPhone") String uPhone){
		
		UserDto updatedUser = this.us.updateUser(userDto, uPhone);
		return ResponseEntity.ok(updatedUser);
	}
	
	@GetMapping("/{userPhone}")
	public ResponseEntity<UserDto> getUser(@PathVariable("userPhone") String uPhone){
		
		UserDto getUser = this.us.getUser(uPhone);
		return ResponseEntity.ok(getUser);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getAllUser(){
		return ResponseEntity.ok(this.us.getAllUsers());
	}
	
	@DeleteMapping("/{userPhone}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable("userPhone") String uPhone){
		this.us.deleteUser(uPhone); 
		//return new ResponseEntity(Map.of("Message","User Deleted Successfully"), HttpStatus.OK );
		return new ResponseEntity<>(new ApiResponse("User Deleted Successfully", true), HttpStatus.OK );
	}
}
