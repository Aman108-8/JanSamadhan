package in.AY.JS.Backend.Problem.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
import jakarta.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "problems")
public class Problem
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProblemCategory category;

    @Column
    private String district;

    @Column
    private String block;

    @Column
    private String village;

    @Column(length = 2000)
    private String description;

	@Column(nullable = false, length = 30)
	private String status = "SUBMITTED";

	@Column
	private String address;

	@Column
	private Double latitude;

	@Column
	private Double longitude;

	@Column
	private long problemRank;

	// NEW: auto-set once, when the row is first inserted — never changes after
	@CreationTimestamp
	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProblemImages> screenShot = new ArrayList<>();

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

	@Transient
	public ProblemCategory.Level getLevel() {
		return category != null ? category.getLevel() : null;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public long getProblemRank() {
		return problemRank;
	}

	public void setProblemRank(long problemRank) {
		this.problemRank = problemRank;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<ProblemImages> getScreenShot() {
		return screenShot;
	}

	public void setScreenShot(List<ProblemImages> screenShot) {
		this.screenShot = screenShot;
	}

	public void addImage(ProblemImages image) {
		screenShot.add(image);
		image.setProblem(this);
	}

}