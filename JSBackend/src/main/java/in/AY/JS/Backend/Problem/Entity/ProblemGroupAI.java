package in.AY.JS.Backend.Problem.Entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "problem_group_ai")
public class ProblemGroupAI {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Group for which this summary was generated.
     */
    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private ProblemGroup group;

    /*
     * AI-generated summary of the similar problems.
     */
    @Column(length = 3000, nullable = false)
    private String summary;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    // =========================
    // GETTERS AND SETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProblemGroup getGroup() {
        return group;
    }

    public void setGroup(ProblemGroup group) {
        this.group = group;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}