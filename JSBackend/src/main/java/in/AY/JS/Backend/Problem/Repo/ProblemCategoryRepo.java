package in.AY.JS.Backend.Problem.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.AY.JS.Backend.Problem.Entity.ProblemCategory;

public interface ProblemCategoryRepo extends JpaRepository<ProblemCategory, Integer> {

    Optional<ProblemCategory> findByNameIgnoreCase(String name);
}
