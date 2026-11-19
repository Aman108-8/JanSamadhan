package in.AY.JS.Backend.Industry.Payload;

import jakarta.persistence.Column;

public class OrganizationDto 
{
	private int id;

    private String orgName;

    private String orgType;

    private String orgEmail;

    private String orgPhoneNo;

    private String orgWebsite;

    private Integer orgYear;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getOrgType() {
		return orgType;
	}

	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}

	public String getOrgEmail() {
		return orgEmail;
	}

	public void setOrgEmail(String orgEmail) {
		this.orgEmail = orgEmail;
	}

	public String getOrgPhoneNo() {
		return orgPhoneNo;
	}

	public void setOrgPhoneNo(String orgPhoneNo) {
		this.orgPhoneNo = orgPhoneNo;
	}

	public String getOrgWebsite() {
		return orgWebsite;
	}

	public void setOrgWebsite(String orgWebsite) {
		this.orgWebsite = orgWebsite;
	}

	public Integer getOrgYear() {
		return orgYear;
	}

	public void setOrgYear(Integer orgYear) {
		this.orgYear = orgYear;
	}
    
}
