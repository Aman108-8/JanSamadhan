package in.AY.JS.Backend.Problem.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "problem_group_members")
public class ProblemGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Group to which this report belongs.
     */
    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private ProblemGroup group;

    /*
     * Individual citizen report.
     */
    @ManyToOne
    @JoinColumn(name = "problem_report_id", nullable = false)
    private ProblemReport problemReport;


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

    public ProblemReport getProblemReport() {
        return problemReport;
    }

    public void setProblemReport(ProblemReport problemReport) {
        this.problemReport = problemReport;
    }
}