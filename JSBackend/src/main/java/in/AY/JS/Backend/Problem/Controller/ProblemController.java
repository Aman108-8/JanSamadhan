package in.AY.JS.Backend.Problem.Controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import in.AY.JS.Backend.Problem.Payload.ProblemDto;
import in.AY.JS.Backend.Problem.Payload.ProblemReportDto;
import in.AY.JS.Backend.Problem.Service.ProblemService;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<ProblemDto> createProblem(
            @PathVariable int userId,
            @RequestBody ProblemDto problemDto) {

        ProblemDto createdProblem =
                problemService.createProblem(
                        problemDto,
                        userId
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdProblem);
    }
    
    @PutMapping("/status/{problemId}")
    public ResponseEntity<ProblemDto> updateProblemStatus(
            @PathVariable int problemId,
            @RequestBody String status) {

        return ResponseEntity.ok(
                problemService.updateStatus(
                        problemId,
                        status
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<ProblemDto>> getAllProblems() {

        return ResponseEntity.ok(
                problemService.getAllProblems()
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProblemDto>> getProblemsByUser(
            @PathVariable int userId) {

        return ResponseEntity.ok(
                problemService.getProblemsByUser(userId)
        );
    }
    
    @GetMapping("/{problemId}")
    public ResponseEntity<ProblemDto> getProblem(
            @PathVariable int problemId) {

        return ResponseEntity.ok(
                problemService.getProblem(problemId)
        );
    }

    @PutMapping("/{problemId}")
    public ResponseEntity<ProblemDto> updateProblem(
            @PathVariable int problemId,
            @RequestBody ProblemDto problemDto) {

        return ResponseEntity.ok(
                problemService.updateProblem(
                        problemId,
                        problemDto
                )
        );
    }


    /*
     * Delete master problem.
     *
     * Because Problem has cascade + orphanRemoval
     * for ProblemReport, related reports will also
     * be removed.
     */
    @DeleteMapping("/{problemId}")
    public ResponseEntity<Void> deleteProblem(
            @PathVariable int problemId) {

        problemService.deleteProblem(problemId);

        return ResponseEntity.noContent().build();
    }
}