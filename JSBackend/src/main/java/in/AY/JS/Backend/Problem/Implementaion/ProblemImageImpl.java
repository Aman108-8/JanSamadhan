package in.AY.JS.Backend.Problem.Implementaion;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import in.AY.JS.Backend.Exception.ResourceNotFoundException;
import in.AY.JS.Backend.Problem.Entity.Problem;
import in.AY.JS.Backend.Problem.Entity.ProblemImages;
import in.AY.JS.Backend.Problem.Payload.ProblemImagesDto;
import in.AY.JS.Backend.Problem.Repo.ProblemImageRepo;
import in.AY.JS.Backend.Problem.Repo.problemRepo;
import in.AY.JS.Backend.Problem.Service.FileImageService;
import in.AY.JS.Backend.Problem.Service.ProblemImageService;

@Service
public class ProblemImageImpl implements ProblemImageService {

    @Autowired
    private ProblemImageRepo problemImageRepo;

    @Autowired
    private problemRepo problemRepo;

    @Autowired
    private FileImageService fileImageService;

    @Autowired
    private ModelMapper mm;

    @Value("${project.uploads}")
    private String imagesPath;

    @Override
    public String addProblemImage(int problemId, MultipartFile image) throws IOException {
        Problem problem = problemRepo.findById(problemId)
                .orElseThrow(() -> new ResourceNotFoundException("Problem", "id", String.valueOf(problemId)));

        String fileName = fileImageService.UploadImage(imagesPath, image);

        ProblemImages problemImage = new ProblemImages();
        problemImage.setImagePath(fileName);
        problem.addImage(problemImage);

        problemRepo.save(problem);
        return fileName;
    }

    @Override
    public String updateProblemImage(int problemId, Long imageId, MultipartFile image) throws IOException {
        ProblemImages problemImage = findProblemImage(problemId, imageId);

        deleteFileIfExists(problemImage.getImagePath());

        String fileName = fileImageService.UploadImage(imagesPath, image);
        problemImage.setImagePath(fileName);
        problemImageRepo.save(problemImage);

        return fileName;
    }

    @Override
    public void deleteProblemImage(int problemId, Long imageId) throws IOException {
        ProblemImages problemImage = findProblemImage(problemId, imageId);
        deleteFileIfExists(problemImage.getImagePath());
        problemImageRepo.delete(problemImage);
    }

    @Override
    public List<ProblemImagesDto> getProblemImages(int problemId) {
        Problem problem = problemRepo.findById(problemId)
                .orElseThrow(() -> new ResourceNotFoundException("Problem", "id", String.valueOf(problemId)));

        return problem.getScreenShot().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private ProblemImages findProblemImage(int problemId, Long imageId) {
        ProblemImages problemImage = problemImageRepo.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("ProblemImages", "id", String.valueOf(imageId)));

        if (problemImage.getProblem() == null || problemImage.getProblem().getId() != problemId) {
            throw new ResourceNotFoundException("ProblemImages", "problemId", String.valueOf(problemId));
        }
        return problemImage;
    }

    private void deleteFileIfExists(String fileName) {
        if (fileName == null || fileName.isBlank()) {
            return;
        }
        File oldFile = new File(imagesPath + File.separator + fileName);
        if (oldFile.exists()) {
            oldFile.delete();
        }
    }

    private ProblemImagesDto toDto(ProblemImages image) {
        ProblemImagesDto dto = mm.map(image, ProblemImagesDto.class);
        if (image.getProblem() != null) {
            dto.setProblemId(image.getProblem().getId());
        }
        return dto;
    }
}