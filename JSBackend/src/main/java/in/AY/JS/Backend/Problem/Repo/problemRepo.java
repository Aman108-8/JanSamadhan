package in.AY.JS.Backend.Problem.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.AY.JS.Backend.Problem.Entity.Problem;

public interface problemRepo extends JpaRepository<Problem, Integer> {

    List<Problem> findByCategory_NameIgnoreCase(String categoryName);

    /*
     * Get problems reported by a particular citizen.
     *
     * Problem
     *   -> ProblemReport
     *       -> User
     */
    List<Problem> findByReports_User_Id(int userId);

}