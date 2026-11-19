package in.AY.JS.Backend.Problem.Service;

import java.util.List;

import in.AY.JS.Backend.Problem.Payload.ProblemDto;

public interface ProblemService {

    ProblemDto createProblem(ProblemDto problemDto, int userId);

    List<ProblemDto> getAllProblems();

    ProblemDto getProblem(int problemId);

    ProblemDto updateProblem(int problemId, ProblemDto problemDto);

    void deleteProblem(int problemId);

    List<ProblemDto> getProblemsByUser(int userId);
    
    ProblemDto updateStatus(int problemId, String status);
}
