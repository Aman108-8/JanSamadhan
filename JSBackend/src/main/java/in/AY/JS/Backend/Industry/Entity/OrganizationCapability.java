package in.AY.JS.Backend.Industry.Entity;

import in.AY.JS.Backend.Problem.Entity.ProblemCategory;
import jakarta.persistence.*;

@Entity
@Table(
    name = "organization_capabilities",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"organization_id", "category_id"})
    }
)
public class OrganizationCapability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProblemCategory category;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public ProblemCategory getCategory() {
        return category;
    }

    public void setCategory(ProblemCategory category) {
        this.category = category;
    }
}