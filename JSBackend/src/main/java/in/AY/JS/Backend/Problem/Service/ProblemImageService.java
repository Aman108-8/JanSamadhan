package in.AY.JS.Backend.Problem.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.AY.JS.Backend.Problem.Payload.ProblemImagesDto;

public interface ProblemImageService {

    String addProblemImage(int problemId, MultipartFile image) throws IOException;

    String updateProblemImage(int problemId, Long imageId, MultipartFile image) throws IOException;

    void deleteProblemImage(int problemId, Long imageId) throws IOException;

    List<ProblemImagesDto> getProblemImages(int problemId);
}