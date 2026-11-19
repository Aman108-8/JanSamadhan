package in.AY.JS.Backend.Problem.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.AY.JS.Backend.Problem.Entity.ProblemReport;

public interface ProblemReportRepo extends JpaRepository<ProblemReport, Long> {

    List<ProblemReport> findByProblem_Id(int problemId);

    List<ProblemReport> findByUser_Id(int userId);
    
    List<ProblemReport> findByStatusAndGroupedFalse(String status);
}
