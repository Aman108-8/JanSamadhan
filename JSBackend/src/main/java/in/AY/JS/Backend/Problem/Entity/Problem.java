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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "problems")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProblemCategory category;

    @Column
    private String district;

    @Column
    private String block;

    @Column
    private String village;

    /*
     * Common/master problem description.
     * Individual citizen descriptions live in ProblemReport (if/when added there).
     */
    @Column(length = 2000)
    private String description;

    @Column
    private String address;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    /*
     * One problem can have many citizen reports.
     */
    @OneToMany(
        mappedBy = "problem",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ProblemReport> reports = new ArrayList<>();

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

    /*
     * Convenience: how many citizens reported this problem.
     * Replaces the old reportCount column — derived instead of stored,
     * so it can never drift out of sync with the actual report rows.
     */
    @Transient
    public int getReportCount() {
        return reports.size();
    }

    public List<ProblemReport> getReports() {
        return reports;
    }

    public void setReports(List<ProblemReport> reports) {
        this.reports = reports;
    }

    public void addReport(ProblemReport report) {
        reports.add(report);
        report.setProblem(this);
    }
}