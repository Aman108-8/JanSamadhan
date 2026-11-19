package in.AY.JS.Backend.Problem.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.AY.JS.Backend.Problem.Payload.ProblemCategoryDto;
import in.AY.JS.Backend.Problem.Service.ProblemCategoryService;

@RestController
@RequestMapping("/api/problem-categories")
public class ProblemCategoryController {

	@Autowired
    private ProblemCategoryService problemCategoryService;

    @GetMapping
    public ResponseEntity<List<ProblemCategoryDto>> getAllCategories() {
        return ResponseEntity.ok(problemCategoryService.getAllCategories());
    }
}