package in.AY.JS.Backend.Problem.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.AY.JS.Backend.Problem.Entity.ProblemReportImage;

public interface ProblemReportImageRepo
        extends JpaRepository<ProblemReportImage, Long> {

    List<ProblemReportImage> findByReport_Id(Long reportId);
}
