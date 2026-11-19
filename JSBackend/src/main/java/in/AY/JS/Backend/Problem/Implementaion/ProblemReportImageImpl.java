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
import in.AY.JS.Backend.Problem.Entity.ProblemReport;
import in.AY.JS.Backend.Problem.Entity.ProblemReportImage;
import in.AY.JS.Backend.Problem.Payload.ProblemReportImageDto;
import in.AY.JS.Backend.Problem.Repo.ProblemReportImageRepo;
import in.AY.JS.Backend.Problem.Repo.ProblemReportRepo;
import in.AY.JS.Backend.Problem.Service.FileImageService;
import in.AY.JS.Backend.Problem.Service.ProblemReportImageService;

@Service
public class ProblemReportImageImpl implements ProblemReportImageService {

    @Autowired
    private ProblemReportImageRepo problemReportImageRepo;

    @Autowired
    private ProblemReportRepo problemReportRepo;

    @Autowired
    private FileImageService fileImageService;

    @Autowired
    private ModelMapper mm;

    @Value("${project.uploads}")
    private String imagesPath;


    // =========================================
    // ADD IMAGE TO A CITIZEN REPORT
    // =========================================

    // =========================================
    // ADD IMAGE TO A CITIZEN REPORT
    // =========================================

    @Override
    public String addProblemReportImage(
            Long reportId,
            MultipartFile image) throws IOException {

        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException(
                    "Image file must not be empty"
            );
        }

        ProblemReport report = problemReportRepo.findById(reportId)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "ProblemReport",
                        "id",
                        String.valueOf(reportId)
                    )
                );

        String fileName =
                fileImageService.UploadImage(imagesPath, image);

        ProblemReportImage reportImage =
                new ProblemReportImage();

        reportImage.setImagePath(fileName);
        reportImage.setReport(report);

        problemReportImageRepo.save(reportImage);

        return fileName;
    }
    
    @Override
    public String updateProblemReportImage(
            Long reportId,
            Long imageId,
            MultipartFile image) throws IOException {

        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException(
                    "Image file must not be empty"
            );
        }

        ProblemReportImage reportImage =
                findReportImage(reportId, imageId);

        /*
         * Delete old physical file.
         */
        deleteFileIfExists(reportImage.getImagePath());

        /*
         * Upload new file.
         */
        String fileName =
                fileImageService.UploadImage(imagesPath, image);

        reportImage.setImagePath(fileName);

        problemReportImageRepo.save(reportImage);

        return fileName;
    }


    // =========================================
    // DELETE REPORT IMAGE
    // =========================================

    @Override
    public void deleteProblemReportImage(
            Long reportId,
            Long imageId) throws IOException {

        ProblemReportImage reportImage =
                findReportImage(reportId, imageId);

        /*
         * Delete physical image file.
         */
        deleteFileIfExists(reportImage.getImagePath());

        /*
         * Delete database record.
         */
        problemReportImageRepo.delete(reportImage);
    }

    @Override
    public List<ProblemReportImageDto> getProblemReportImages(
            Long reportId) {

        problemReportRepo.findById(reportId)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "ProblemReport",
                        "id",
                        String.valueOf(reportId)
                    )
                );

        return problemReportImageRepo
                .findByReport_Id(reportId)
                .stream()
                .map(image ->
                        mm.map(
                            image,
                            ProblemReportImageDto.class
                        )
                )
                .collect(Collectors.toList());
    }


    // =========================================
    // FIND IMAGE AND VERIFY REPORT
    // =========================================

    private ProblemReportImage findReportImage(
            Long reportId,
            Long imageId) {

        ProblemReportImage reportImage =
                problemReportImageRepo.findById(imageId)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "ProblemReportImage",
                        "id",
                        String.valueOf(imageId)
                    )
                );

        /*
         * Make sure this image actually belongs
         * to the requested report.
         */
        if (reportImage.getReport() == null ||
            !reportImage.getReport().getId().equals(reportId)) {

            throw new ResourceNotFoundException(
                    "ProblemReportImage",
                    "reportId",
                    String.valueOf(reportId)
            );
        }

        return reportImage;
    }


    // =========================================
    // DELETE PHYSICAL FILE
    // =========================================

    private void deleteFileIfExists(String fileName) {

        if (fileName == null || fileName.isBlank()) {
            return;
        }

        File oldFile =
                new File(
                    imagesPath
                    + File.separator
                    + fileName
                );

        if (oldFile.exists()) {
            oldFile.delete();
        }
    }
}
