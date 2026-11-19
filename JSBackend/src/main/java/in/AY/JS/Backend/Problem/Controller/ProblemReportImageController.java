package in.AY.JS.Backend.Problem.Controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import in.AY.JS.Backend.Problem.Payload.ProblemReportImageDto;
import in.AY.JS.Backend.Problem.Service.FileImageService;
import in.AY.JS.Backend.Problem.Service.ProblemReportImageService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/problem-reports")
public class ProblemReportImageController {

    @Autowired
    private ProblemReportImageService problemReportImageService;

    @Autowired
    private FileImageService fileImageService;

    @Value("${project.uploads}")
    private String imagesPath;


    // =========================================
    // ADD IMAGE
    // =========================================

    @PostMapping("/{reportId}/images")
    public ResponseEntity<Map<String, String>> addProblemReportImage(
            @PathVariable Long reportId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        String fileName =
                problemReportImageService.addProblemReportImage(
                        reportId,
                        file
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("fileName", fileName));
    }


    // =========================================
    // UPDATE IMAGE
    // =========================================

    @PutMapping("/{reportId}/images/{imageId}")
    public ResponseEntity<String> updateProblemReportImage(
            @PathVariable Long reportId,
            @PathVariable Long imageId,
            @RequestParam("image") MultipartFile image
    ) throws IOException {

        String fileName =
                problemReportImageService.updateProblemReportImage(
                        reportId,
                        imageId,
                        image
                );

        return ResponseEntity.ok(fileName);
    }


    // =========================================
    // DELETE IMAGE
    // =========================================

    @DeleteMapping("/{reportId}/images/{imageId}")
    public ResponseEntity<String> deleteProblemReportImage(
            @PathVariable Long reportId,
            @PathVariable Long imageId
    ) throws IOException {

        problemReportImageService.deleteProblemReportImage(
                reportId,
                imageId
        );

        return ResponseEntity.ok("Image deleted");
    }


    // =========================================
    // GET REPORT IMAGES
    // =========================================

    @GetMapping("/{reportId}/images")
    public ResponseEntity<List<ProblemReportImageDto>> getProblemReportImages(
            @PathVariable Long reportId
    ) {

        return ResponseEntity.ok(
                problemReportImageService.getProblemReportImages(reportId)
        );
    }


    // =========================================
    // GET ACTUAL IMAGE FILE
    // =========================================

    @GetMapping("/file/{imageName}")
    public void downloadProblemImage(
            @PathVariable String imageName,
            HttpServletResponse response
    ) throws IOException {

        String fullPath =
                imagesPath + File.separator + imageName;

        String contentType =
                Files.probeContentType(
                        Paths.get(fullPath)
                );

        if (contentType == null) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        response.setContentType(contentType);

        try (InputStream resource =
                     fileImageService.getResource(
                             imagesPath,
                             imageName
                     )) {

            StreamUtils.copy(
                    resource,
                    response.getOutputStream()
            );
        }
    }
}