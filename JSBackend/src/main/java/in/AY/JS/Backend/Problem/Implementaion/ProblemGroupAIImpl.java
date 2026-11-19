package in.AY.JS.Backend.Problem.Implementaion;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.AY.JS.Backend.Exception.ResourceNotFoundException;
import in.AY.JS.Backend.Problem.Entity.ProblemGroup;
import in.AY.JS.Backend.Problem.Entity.ProblemGroupAI;
import in.AY.JS.Backend.Problem.Payload.ProblemGroupAIDto;
import in.AY.JS.Backend.Problem.Repo.ProblemGroupAIRepo;
import in.AY.JS.Backend.Problem.Repo.ProblemGroupRepo;
import in.AY.JS.Backend.Problem.Service.ProblemGroupAIService;

@Service
public class ProblemGroupAIImpl implements ProblemGroupAIService {

    @Autowired
    private ProblemGroupAIRepo problemGroupAIRepo;

    @Autowired
    private ProblemGroupRepo problemGroupRepo;

    @Autowired
    private ModelMapper mm;


    // =========================================
    // ADD AI SUMMARY TO A GROUP
    // =========================================

    @Override
    public ProblemGroupAIDto addSummary(Long groupId, String summary) {

        if (summary == null || summary.isBlank()) {
            throw new IllegalArgumentException("Summary must not be empty");
        }

        ProblemGroup group = problemGroupRepo.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "ProblemGroup", "id", String.valueOf(groupId)));

        ProblemGroupAI ai = new ProblemGroupAI();
        ai.setSummary(summary);
        group.addAISummary(ai);

        problemGroupRepo.save(group);

        return mm.map(ai, ProblemGroupAIDto.class);
    }


    // =========================================
    // GET ALL SUMMARIES OF A GROUP
    // =========================================

    @Override
    public List<ProblemGroupAIDto> getSummaries(Long groupId) {

        problemGroupRepo.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "ProblemGroup", "id", String.valueOf(groupId)));

        return problemGroupAIRepo.findByGroup_Id(groupId)
                .stream()
                .map(ai -> mm.map(ai, ProblemGroupAIDto.class))
                .collect(Collectors.toList());
    }
}