package in.AY.JS.Backend.Problem.Implementaion;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import in.AY.JS.Backend.Citizen.Entity.User;
import in.AY.JS.Backend.Citizen.Repo.UserRepo;
import in.AY.JS.Backend.Exception.ResourceNotFoundException;
import in.AY.JS.Backend.Problem.Entity.Problem;
import in.AY.JS.Backend.Problem.Entity.ProblemCategory;
import in.AY.JS.Backend.Problem.Entity.ProblemImages;
import in.AY.JS.Backend.Problem.Payload.ProblemDto;
import in.AY.JS.Backend.Problem.Repo.ProblemCategoryRepo;
import in.AY.JS.Backend.Problem.Repo.problemRepo;
import in.AY.JS.Backend.Problem.Service.ProblemService;

@Service
public class ProblemImpl implements ProblemService 
{
	@Autowired
    private problemRepo problemRepo;
	
	@Autowired
    private FileImageImpl fileImageService;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private ProblemCategoryRepo problemCategoryRepo;
	
	@Autowired
	ModelMapper mm;
	
	
    @Value("${app.uploads.problem-images:uploads/problem-images}")
    private String imagePath;

    @Override
    public ProblemDto createProblem(ProblemDto problemDto, int userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", String.valueOf(userId)));

        ProblemCategory category = problemCategoryRepo.findById(problemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("ProblemCategory", "id", String.valueOf(problemDto.getCategoryId())));

        Problem problem = mm.map(problemDto, Problem.class);
        problem.setCategory(category);
        problem.setUser(user);
        problem.setStatus("SUBMITTED");

        return toDto(problemRepo.save(problem));
    }

    @Override
    public List<ProblemDto> getAllProblems() {
        return problemRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public ProblemDto getProblem(int problemId) {
        return toDto(findProblem(problemId));
    }

    @Override
    public ProblemDto updateProblem(int problemId, ProblemDto problemDto) {
        Problem problem = findProblem(problemId);

        ProblemCategory category = problemCategoryRepo.findById(problemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("ProblemCategory", "id", String.valueOf(problemDto.getCategoryId())));

        mm.map(problemDto, problem);
        problem.setCategory(category);

        return toDto(problemRepo.save(problem));
    }

    @Override
    public void deleteProblem(int problemId) {
        problemRepo.delete(findProblem(problemId));
    }

    @Override
    public String addImage(int problemId, MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Image file must not be empty");
        }
        Problem problem = findProblem(problemId);
        String fileName = fileImageService.UploadImage(imagePath, file);
        ProblemImages image = new ProblemImages();
        image.setImagePath(fileName);
        problem.addImage(image);
        problemRepo.save(problem);
        return fileName;
    }

    @Override
    public List<ProblemDto> getProblemsByUser(int userId) {
        return problemRepo.findByUser_Id(userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private Problem findProblem(int problemId) {
        return problemRepo.findById(problemId)
                .orElseThrow(() -> new ResourceNotFoundException("Problem", "id", String.valueOf(problemId)));
    }

    // Manual mapping for the category-related fields ModelMapper can't infer;
    // everything else still comes from ModelMapper.
    private ProblemDto toDto(Problem problem) {
        ProblemDto dto = mm.map(problem, ProblemDto.class);
        if (problem.getCategory() != null) {
            dto.setCategoryId(problem.getCategory().getId());
            dto.setCategoryName(problem.getCategory().getName());
            dto.setLevel(problem.getCategory().getLevel().name());
        }

        if (problem.getScreenShot() != null) {
            List<String> imageNames = problem.getScreenShot().stream()
                    .map(ProblemImages::getImagePath)
                    .filter(path -> path != null && !path.isBlank())
                    .collect(Collectors.toList());
            dto.setImages(imageNames);
        }

        return dto;
    }
}