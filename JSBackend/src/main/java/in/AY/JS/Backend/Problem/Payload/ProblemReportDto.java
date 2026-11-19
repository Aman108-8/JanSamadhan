package in.AY.JS.Backend.Problem.Payload;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ProblemReportDto {

    private Long id;

    private int problemId;

    private int userId;

    private LocalDateTime reportedAt;

    private boolean grouped = false;
    
    private String status = "UNDER_REVIEW";
    
    private List<ProblemReportImageDto> images = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getProblemId() {
        return problemId;
    }

    public void setProblemId(int problemId) {
        this.problemId = problemId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public LocalDateTime getReportedAt() {
        return reportedAt;
    }

    public void setReportedAt(LocalDateTime reportedAt) {
        this.reportedAt = reportedAt;
    }

    public List<ProblemReportImageDto> getImages() {
        return images;
    }

    public void setImages(List<ProblemReportImageDto> images) {
        this.images = images;
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