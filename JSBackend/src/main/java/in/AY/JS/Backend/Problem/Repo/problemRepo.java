package in.AY.JS.Backend.Problem.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import in.AY.JS.Backend.Problem.Entity.Problem;


public interface problemRepo extends JpaRepository<Problem, Integer>
{
	//List<Problem> findByCategoryIgnoreCase(String category);
	List<Problem> findByCategory_NameIgnoreCase(String categoryName);
	
	List<Problem> findByUser_Id(int userId);
	
	@Modifying
	@Query("UPDATE Problem p SET p.problemRank = (" +
			"SELECT COUNT(p2) FROM Problem p2 " +
			"WHERE p2.category = p.category " +
			"AND p2.district = p.district " +
			"AND p2.block = p.block " +
			"AND p2.village = p.village)")
	int recalculateProblemRanks();

}

