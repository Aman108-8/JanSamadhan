package in.AY.JS.Backend.Problem.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.AY.JS.Backend.Problem.Entity.ProblemGroupMember;

public interface ProblemGroupMemberRepo extends JpaRepository<ProblemGroupMember, Long> {

    List<ProblemGroupMember> findByGroup_Id(Long groupId);

    boolean existsByGroup_IdAndProblemReport_Id(Long groupId, Long problemReportId);
}