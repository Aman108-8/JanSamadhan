package in.AY.JS.Backend.Problem.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.AY.JS.Backend.Problem.Payload.ProblemGroupAIDto;
import in.AY.JS.Backend.Problem.Payload.ProblemGroupDto;
import in.AY.JS.Backend.Problem.Service.ProblemGroupService;

/*
 * Read-only. ProblemGroup / ProblemGroupMember / ProblemGroupAI
 * rows are created by the backend's own grouping + AI-summary
 * job (not exposed here), not by client requests.
 */
@RestController
@RequestMapping("/api/problem-groups")
public class ProblemGroupController {

    @Autowired
    private ProblemGroupService problemGroupService;


    @GetMapping
    public ResponseEntity<List<ProblemGroupDto>> getAllGroups() {
        return ResponseEntity.ok(problemGroupService.getAllGroups());
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<ProblemGroupDto> getGroup(
            @PathVariable Long groupId) {
        return ResponseEntity.ok(problemGroupService.getGroup(groupId));
    }

    @GetMapping("/{groupId}/summaries")
    public ResponseEntity<List<ProblemGroupAIDto>> getGroupSummaries(
            @PathVariable Long groupId) {
        return ResponseEntity.ok(problemGroupService.getGroupSummaries(groupId));
    }
}