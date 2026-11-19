package in.AY.JS.Backend.Citizen.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.AY.JS.Backend.Citizen.Entity.User;

public interface UserRepo extends JpaRepository<User, Integer>{
	Optional<User> findByPhoneNo(String phoneNo);
	
	Boolean existsByPhoneNo(String phoneNo);
}
