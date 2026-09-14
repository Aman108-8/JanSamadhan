package in.AY.JS.Backend.Problem.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.AY.JS.Backend.Problem.Payload.ProblemDto;

public interface ProblemService {

	ProblemDto createProblem(ProblemDto problemDto, int userId);

    List<ProblemDto> getAllProblems();

    ProblemDto getProblem(int problemId);

    ProblemDto updateProblem(int problemId, ProblemDto problemDto);

    void deleteProblem(int problemId);

    String addImage(int problemId, MultipartFile file) throws IOException;
    
    List<ProblemDto> getProblemsByUser(int userId);
}
