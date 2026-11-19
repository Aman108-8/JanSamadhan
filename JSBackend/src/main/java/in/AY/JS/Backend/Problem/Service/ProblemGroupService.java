package in.AY.JS.Backend.Problem.Service;

import java.util.List;

import in.AY.JS.Backend.Problem.Payload.ProblemGroupAIDto;
import in.AY.JS.Backend.Problem.Payload.ProblemGroupDto;

public interface ProblemGroupService 
{
	//ProblemGroupDto createGroup(List<Long> reportIds);

    List<ProblemGroupDto> getAllGroups();

    ProblemGroupDto getGroup(Long groupId);
    
    List<ProblemGroupAIDto> getGroupSummaries(Long groupId);

    //ProblemGroupDto addMember(Long groupId, Long reportId);

    //void deleteGroup(Long groupId);
}