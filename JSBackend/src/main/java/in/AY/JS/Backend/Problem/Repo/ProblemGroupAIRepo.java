package in.AY.JS.Backend.Problem.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.AY.JS.Backend.Problem.Entity.ProblemGroupAI;

public interface ProblemGroupAIRepo extends JpaRepository<ProblemGroupAI, Long> {

    List<ProblemGroupAI> findByGroup_Id(Long groupId);
}