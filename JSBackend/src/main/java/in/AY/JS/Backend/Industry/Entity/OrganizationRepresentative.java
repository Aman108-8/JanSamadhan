package in.AY.JS.Backend.Industry.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "organization_representatives")
public class OrganizationRepresentative {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String designation;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phoneNo;

    @OneToOne
    @JoinColumn(name = "organization_id", nullable = false, unique = true)
    private Organization organization;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }
}