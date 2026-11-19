package in.AY.JS.Backend.Industry.Payload;

import in.AY.JS.Backend.Industry.Entity.Organization;
import in.AY.JS.Backend.Problem.Entity.ProblemCategory;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class OrganizationCapabilityDto 
{
	private int id;

    private Organization organization;

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
