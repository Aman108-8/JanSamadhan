package in.AY.JS.Backend.Problem.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.AY.JS.Backend.Problem.Payload.ProblemReportImageDto;

public interface ProblemReportImageService {

    String addProblemReportImage(
            Long reportId,
            MultipartFile image
    ) throws IOException;


    String updateProblemReportImage(
            Long reportId,
            Long imageId,
            MultipartFile image
    ) throws IOException;


    void deleteProblemReportImage(
            Long reportId,
            Long imageId
    ) throws IOException;


    List<ProblemReportImageDto> getProblemReportImages(
            Long reportId
    );
}
