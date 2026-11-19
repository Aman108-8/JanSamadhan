package in.AY.JS.Backend.Citizen.Entity;

import java.util.ArrayList;
import java.util.List;

import in.AY.JS.Backend.Problem.Entity.ProblemReport;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class User 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(name = "name", nullable = false, length = 100)
	private String name;
	
	@Column
	private String phoneNo;
	
	@Column
	private String password;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<ProblemReport> reports = new ArrayList<>();

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
	
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public List<ProblemReport> getReports() {
		return reports;
	}
	public void setReports(List<ProblemReport> reports) {
		this.reports = reports;
	}
}