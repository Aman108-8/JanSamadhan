package in.AY.JS.Backend.Problem.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import in.AY.JS.Backend.Citizen.Entity.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "problem_reports")
public class ProblemReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    
    @CreationTimestamp
    @Column(name = "reported_at", updatable = false)
    private LocalDateTime reportedAt;
    
    @Column(nullable = false)
    private boolean grouped = false;
    
    @Column(nullable = false, length = 20)
    private String status = "UNDER_REVIEW";

    
    @OneToMany(
    	    mappedBy = "problemReport",
    	    cascade = CascadeType.ALL,
    	    orphanRemoval = true
    	)
    private List<ProblemGroupMember> groupMembers = new ArrayList<>();
    
    
    public List<ProblemGroupMember> getGroupMembers() {
		return groupMembers;
	}

	public void setGroupMembers(List<ProblemGroupMember> groupMembers) {
		this.groupMembers = groupMembers;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Problem getProblem() {
        return problem;
    }

    public void setProblem(Problem problem) {
        this.problem = problem;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getReportedAt() {
        return reportedAt;
    }

    public void setReportedAt(LocalDateTime reportedAt) {
        this.reportedAt = reportedAt;
    }

	public boolean isGrouped() {
		return grouped;
	}

	public void setGrouped(boolean grouped) {
		this.grouped = grouped;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}