package in.AY.JS.Backend.Problem.Payload;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ProblemGroupDto {

    private Long id;

    private LocalDateTime createdAt;

    private List<ProblemGroupMemberDto> members = new ArrayList<>();

    private List<ProblemGroupAIDto> aiSummaries = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<ProblemGroupMemberDto> getMembers() {
        return members;
    }

    public void setMembers(List<ProblemGroupMemberDto> members) {
        this.members = members;
    }

    public List<ProblemGroupAIDto> getAiSummaries() {
        return aiSummaries;
    }

    public void setAiSummaries(List<ProblemGroupAIDto> aiSummaries) {
        this.aiSummaries = aiSummaries;
    }
}