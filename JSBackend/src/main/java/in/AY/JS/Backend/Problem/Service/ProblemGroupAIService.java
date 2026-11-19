package in.AY.JS.Backend.Problem.Service;

import java.util.List;

import in.AY.JS.Backend.Problem.Payload.ProblemGroupAIDto;

public interface ProblemGroupAIService {

    ProblemGroupAIDto addSummary(Long groupId, String summary);

    List<ProblemGroupAIDto> getSummaries(Long groupId);
}