package in.AY.JS.Backend.Industry.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "organizations")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String orgName;

    @Column(nullable = false)
    private String orgType;

    @Column(nullable = false, unique = true)
    private String orgEmail;

    @Column(nullable = false)
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