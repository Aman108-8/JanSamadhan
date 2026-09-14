package in.AY.JS.Backend.Problem.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.AY.JS.Backend.Problem.Entity.ProblemImages;


public interface ProblemScrrenShotRepo extends JpaRepository<ProblemImages, Long>{
	List<ProblemImages> findByProblem_Id(int problemId);
}
