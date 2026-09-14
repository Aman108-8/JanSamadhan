package in.AY.JS.Backend.Problem.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import in.AY.JS.Backend.Problem.Payload.ProblemDto;
import in.AY.JS.Backend.Problem.Service.ProblemService;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

	@Autowired
    private ProblemService problemService;

    @PostMapping
    public ResponseEntity<ProblemDto> createProblem(@RequestBody ProblemDto problemDto) {
        return new ResponseEntity<>(problemService.createProblem(problemDto, problemDto.getUserId()), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProblemDto>> getAllProblems() {
        return ResponseEntity.ok(problemService.getAllProblems());
    }

    // NEW: fetch only the problems submitted by a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProblemDto>> getProblemsByUser(@PathVariable int userId) {
        return ResponseEntity.ok(problemService.getProblemsByUser(userId));
    }

    @GetMapping("/{problemId}")
    public ResponseEntity<ProblemDto> getProblem(@PathVariable int problemId) {
        return ResponseEntity.ok(problemService.getProblem(problemId));
    }

    @PutMapping("/{problemId}")
    public ResponseEntity<ProblemDto> updateProblem(
            @PathVariable int problemId, @RequestBody ProblemDto problemDto) {
        return ResponseEntity.ok(problemService.updateProblem(problemId, problemDto));
    }

    @DeleteMapping("/{problemId}")
    public ResponseEntity<Void> deleteProblem(@PathVariable int problemId) {
        problemService.deleteProblem(problemId);
        return ResponseEntity.noContent().build();
    }

    
}