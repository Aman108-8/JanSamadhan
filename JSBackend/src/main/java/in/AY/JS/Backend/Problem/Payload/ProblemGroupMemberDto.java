package in.AY.JS.Backend.Problem.Payload;

public class ProblemGroupMemberDto {

    private Long id;

    private Long groupId;

    private Long problemReportId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public Long getProblemReportId() {
        return problemReportId;
    }

    public void setProblemReportId(Long problemReportId) {
        this.problemReportId = problemReportId;
    }
}