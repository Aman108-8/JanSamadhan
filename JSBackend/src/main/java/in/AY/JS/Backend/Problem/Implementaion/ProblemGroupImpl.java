package in.AY.JS.Backend.Problem.Implementaion;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.AY.JS.Backend.Exception.ResourceNotFoundException;
import in.AY.JS.Backend.Problem.Entity.ProblemGroup;
import in.AY.JS.Backend.Problem.Payload.ProblemGroupAIDto;
import in.AY.JS.Backend.Problem.Payload.ProblemGroupDto;
import in.AY.JS.Backend.Problem.Repo.ProblemGroupAIRepo;
import in.AY.JS.Backend.Problem.Repo.ProblemGroupRepo;
import in.AY.JS.Backend.Problem.Service.ProblemGroupService;

@Service
public class ProblemGroupImpl implements ProblemGroupService {

    @Autowired
    private ProblemGroupRepo problemGroupRepo;

    @Autowired
    private ProblemGroupAIRepo problemGroupAIRepo;

    @Autowired
    private ModelMapper mm;


    @Override
    @Transactional(readOnly = true)
    public List<ProblemGroupDto> getAllGroups() {
        return problemGroupRepo.findAll()
                .stream()
                .map(group -> mm.map(group, ProblemGroupDto.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProblemGroupDto getGroup(Long groupId) {
        ProblemGroup group = findGroup(groupId);
        return mm.map(group, ProblemGroupDto.class);
    }

    @Override
    public List<ProblemGroupAIDto> getGroupSummaries(Long groupId) {
        /*
         * Ensure the group actually exists before returning
         * (possibly empty) summaries for it.
         */
        findGroup(groupId);

        return problemGroupAIRepo.findByGroup_Id(groupId)
                .stream()
                .map(ai -> mm.map(ai, ProblemGroupAIDto.class))
                .collect(Collectors.toList());
    }

    private ProblemGroup findGroup(Long groupId) {
        return problemGroupRepo.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "ProblemGroup", "id", String.valueOf(groupId)));
    }
}