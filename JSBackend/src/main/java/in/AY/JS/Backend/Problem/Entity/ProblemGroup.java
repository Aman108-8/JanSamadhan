package in.AY.JS.Backend.Problem.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "problem_groups")
public class ProblemGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    /*
     * Problems/reports that belong to this group.
     */
    @OneToMany(
        mappedBy = "group",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ProblemGroupMember> members = new ArrayList<>();

    /*
     * AI summaries generated for this group.
     */
    @OneToMany(
        mappedBy = "group",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ProblemGroupAI> aiSummaries = new ArrayList<>();


    // =========================
    // GETTERS AND SETTERS
    // =========================

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

    public List<ProblemGroupMember> getMembers() {
        return members;
    }

    public void setMembers(List<ProblemGroupMember> members) {
        this.members = members;
    }

    public List<ProblemGroupAI> getAiSummaries() {
        return aiSummaries;
    }

    public void setAiSummaries(List<ProblemGroupAI> aiSummaries) {
        this.aiSummaries = aiSummaries;
    }

    public void addMember(ProblemGroupMember member) {
        members.add(member);
        member.setGroup(this);
    }

    public void addAISummary(ProblemGroupAI aiSummary) {
        aiSummaries.add(aiSummary);
        aiSummary.setGroup(this);
    }
}