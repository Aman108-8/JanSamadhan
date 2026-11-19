package in.AY.JS.Backend.Problem.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import in.AY.JS.Backend.Problem.Entity.ProblemGroup;

public interface ProblemGroupRepo extends JpaRepository<ProblemGroup, Long> {

}
