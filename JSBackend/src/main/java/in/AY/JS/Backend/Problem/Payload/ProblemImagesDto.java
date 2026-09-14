package in.AY.JS.Backend.Problem.Payload;

public class ProblemImagesDto {

	private Long id;
	private String imagePath;

	// FIXED: was embedding the Problem entity directly — replaced with just
	// the problem's id, which is all a DTO should expose
	private int problemId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public int getProblemId() {
		return problemId;
	}

	public void setProblemId(int problemId) {
		this.problemId = problemId;
	}
}