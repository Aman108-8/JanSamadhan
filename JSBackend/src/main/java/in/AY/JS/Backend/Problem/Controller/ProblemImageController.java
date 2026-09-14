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

import in.AY.JS.Backend.Problem.Payload.ProblemImagesDto;
import in.AY.JS.Backend.Problem.Service.FileImageService;
import in.AY.JS.Backend.Problem.Service.ProblemImageService;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/problem/")
public class ProblemImageController {

    @Autowired
    private ProblemImageService problemImageService;

    @Autowired
    private FileImageService fileImageService;

    @Value("${project.uploads}")
    private String imagesPath;

    // NEW: this was missing — uploads a new image for a problem
    @PostMapping("/{problemId}/images")
    public ResponseEntity<Map<String, String>> addProblemImage(
            @PathVariable int problemId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        String fileName = problemImageService.addProblemImage(problemId, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("fileName", fileName));
    }

    @PutMapping("/{problemId}/images/{imageId}")
    public ResponseEntity<String> updateProblemImage(
            @PathVariable int problemId,
            @PathVariable Long imageId,
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        String fileName = problemImageService.updateProblemImage(problemId, imageId, image);
        return ResponseEntity.ok(fileName);
    }

    @DeleteMapping("/{problemId}/images/{imageId}")
    public ResponseEntity<String> deleteProblemImage(
            @PathVariable int problemId,
            @PathVariable Long imageId
    ) throws IOException {
        problemImageService.deleteProblemImage(problemId, imageId);
        return ResponseEntity.ok("Image deleted");
    }

    @GetMapping("/{problemId}/images")
    public ResponseEntity<List<ProblemImagesDto>> getProblemImages(
            @PathVariable int problemId
    ) {
        List<ProblemImagesDto> images = problemImageService.getProblemImages(problemId);
        return ResponseEntity.ok(images);
    }

    // Serves the raw image/video bytes so <img>/<video> tags can load them directly
    @GetMapping("/file/{imageName}")
    public void downloadProblemImage(
            @PathVariable String imageName,
            HttpServletResponse response
    ) throws IOException {
        String fullPath = imagesPath + File.separator + imageName;

        String contentType = Files.probeContentType(Paths.get(fullPath));
        if (contentType == null) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }
        response.setContentType(contentType);

        InputStream resource = fileImageService.getResource(imagesPath, imageName);
        StreamUtils.copy(resource, response.getOutputStream());
    }
}