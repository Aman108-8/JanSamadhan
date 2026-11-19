package in.AY.JS.Backend.Problem.Implementaion;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.AY.JS.Backend.Citizen.Entity.User;
import in.AY.JS.Backend.Citizen.Repo.UserRepo;
import in.AY.JS.Backend.Exception.ResourceNotFoundException;
import in.AY.JS.Backend.Problem.Entity.Problem;
import in.AY.JS.Backend.Problem.Entity.ProblemCategory;
import in.AY.JS.Backend.Problem.Entity.ProblemReport;
import in.AY.JS.Backend.Problem.Payload.ProblemDto;
import in.AY.JS.Backend.Problem.Repo.ProblemCategoryRepo;
import in.AY.JS.Backend.Problem.Repo.problemRepo;
import in.AY.JS.Backend.Problem.Service.ProblemService;
import jakarta.transaction.Transactional;

@Service
public class ProblemImpl implements ProblemService {

    @Autowired
    private problemRepo problemRepo;

    @Autowired
    private ProblemCategoryRepo problemCategoryRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper mm;

    @Override
    public ProblemDto createProblem(ProblemDto problemDto, int userId) {

        // Find category
        ProblemCategory category = problemCategoryRepo
                .findById(problemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "ProblemCategory",
                        "id",
                        String.valueOf(problemDto.getCategoryId())
                ));

        // Find citizen
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User",
                        "id",
                        String.valueOf(userId)
                ));

        // Create master Problem
        Problem problem = mm.map(problemDto, Problem.class);

        problem.setCategory(category);

        // Create first citizen report
        ProblemReport report = new ProblemReport();

        report.setUser(user);
        report.setStatus("UNDER_REVIEW");
        report.setGrouped(false);

        // Connect report with problem
        problem.addReport(report);

        // Save problem + first report
        Problem savedProblem = problemRepo.save(problem);

        return mm.map(savedProblem, ProblemDto.class);
    }

    @Override
    public List<ProblemDto> getAllProblems() {

        return problemRepo.findAll()
                .stream()
                .map(problem -> mm.map(problem, ProblemDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProblemDto getProblem(int problemId) {

        Problem problem = findProblem(problemId);

        return mm.map(problem, ProblemDto.class);
    }

    @Override
    public ProblemDto updateProblem(
            int problemId,
            ProblemDto problemDto) {

        Problem problem = findProblem(problemId);

        // Find category
        ProblemCategory category = problemCategoryRepo
                .findById(problemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "ProblemCategory",
                        "id",
                        String.valueOf(problemDto.getCategoryId())
                ));

        problem.setTitle(problemDto.getTitle());
        problem.setDistrict(problemDto.getDistrict());
        problem.setBlock(problemDto.getBlock());
        problem.setVillage(problemDto.getVillage());
        problem.setDescription(problemDto.getDescription());
        problem.setAddress(problemDto.getAddress());
        problem.setLatitude(problemDto.getLatitude());
        problem.setLongitude(problemDto.getLongitude());
        problem.setCategory(category);

        Problem updatedProblem = problemRepo.save(problem);

        return mm.map(updatedProblem, ProblemDto.class);
    }

    @Override
    public void deleteProblem(int problemId) {

        Problem problem = findProblem(problemId);

        problemRepo.delete(problem);
    }

    @Override
    public List<ProblemDto> getProblemsByUser(int userId) {

        return problemRepo.findByReports_User_Id(userId)
                .stream()
                .map(problem -> mm.map(problem, ProblemDto.class))
                .collect(Collectors.toList());
    }

    private Problem findProblem(int problemId) {

        return problemRepo.findById(problemId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Problem",
                        "id",
                        String.valueOf(problemId)
                ));
    }

	@Override
	@Transactional
	public ProblemDto updateStatus(int problemId, String status) {

	    Problem problem = findProblem(problemId);

	    for (ProblemReport report : problem.getReports()) {
	        report.setStatus(status);
	    }

	    Problem updatedProblem = problemRepo.save(problem);

	    return mm.map(updatedProblem, ProblemDto.class);
	}
}