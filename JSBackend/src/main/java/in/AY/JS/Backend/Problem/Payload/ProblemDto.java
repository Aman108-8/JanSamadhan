package in.AY.JS.Backend.Problem.Payload;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import in.AY.JS.Backend.Problem.Entity.ProblemCategory;

public class ProblemDto {

	private int id;
    private String title;
    private ProblemCategory category;
	private int categoryId;
    private String district;
    private String block;
    private String village;
    private String description;
    private String address;
    private Double latitude;
    private Double longitude;
    private LocalDateTime createdAt;
	private List<ProblemReportDto> reports = new ArrayList<>();
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public ProblemCategory getCategory() {
		return category;
	}
	public void setCategory(ProblemCategory category) {
		this.category = category;
	}
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getBlock() {
		return block;
	}
	public void setBlock(String block) {
		this.block = block;
	}
	public String getVillage() {
		return village;
	}
	public void setVillage(String village) {
		this.village = village;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Double getLatitude() {
		return latitude;
	}
	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}
	public Double getLongitude() {
		return longitude;
	}
	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public List<ProblemReportDto> getReports() {
		return reports;
	}
	public void setReports(List<ProblemReportDto> reports) {
		this.reports = reports;
	}

}