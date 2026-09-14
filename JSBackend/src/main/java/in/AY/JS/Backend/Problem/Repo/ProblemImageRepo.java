package in.AY.JS.Backend.Problem.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import in.AY.JS.Backend.Problem.Entity.ProblemImages;

public interface ProblemImageRepo extends JpaRepository<ProblemImages, Long> {

}