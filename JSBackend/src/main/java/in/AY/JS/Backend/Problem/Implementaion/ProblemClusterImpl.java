package in.AY.JS.Backend.Problem.Implementaion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.AY.JS.Backend.Problem.Entity.Problem;
import in.AY.JS.Backend.Problem.Entity.ProblemGroup;
import in.AY.JS.Backend.Problem.Entity.ProblemGroupMember;
import in.AY.JS.Backend.Problem.Entity.ProblemReport;
import in.AY.JS.Backend.Problem.Repo.ProblemGroupMemberRepo;
import in.AY.JS.Backend.Problem.Repo.ProblemGroupRepo;
import in.AY.JS.Backend.Problem.Repo.ProblemReportRepo;
import in.AY.JS.Backend.Problem.Service.ProblemClusterService;

@Service
public class ProblemClusterImpl implements ProblemClusterService {

	@Autowired
	private ProblemReportRepo problemReportRepo;
	
	@Autowired
	private ProblemGroupRepo problemGroupRepo;
	
	@Autowired
	private ProblemGroupMemberRepo problemGroupMemberRepo;
	
	private static final double CLUSTER_RADIUS_METERS = 500.0;
	
	@Override
	@Transactional
	public void clusterAcceptedReports() 
	{
		//Get those ProblemReport who have status accepted and grouped false
		List<ProblemReport> reports = problemReportRepo.findByStatusAndGroupedFalse("ACCEPTED");
		
		//Loop each report 
		for(ProblemReport report : reports) {
			
			//get full Details of problem from report
			Problem problem =  report.getProblem();
			
			//if report submit null then skip
			if(problem == null) {
				continue;
			}
			
			//passing those report who have not grouped
			//get Matching group from problemGroup
			ProblemGroup existingGroup = findMatchingGroup(report);
			
			if(existingGroup != null) 
			{
				addReportToGroup(report, existingGroup);
			}
			else 
			{
				createNewGroup(report);
			}
		}
	}
	
	//Check Report is matching with existing one or not. if not then create
	/*
	 * We select accepted, ungrouped ProblemReports and compare each new report 
	 * against reports already belonging to existing ProblemGroups.
	*/
	private ProblemGroup findMatchingGroup(ProblemReport report)
	{
		//Fetch all group
		//
		List<ProblemGroup> groups = problemGroupRepo.findAll();

		//Loop east group
        for (ProblemGroup group : groups)
		{
        	//get the member from group and loop
			for(ProblemGroupMember member: group.getMembers())
			{
				//get problem Report from Problem Member
				ProblemReport existingReport = member.getProblemReport();
				
				//if null then skip
				if(existingReport == null) {
					continue;
				}
				
				if(isSameCategory(report, existingReport) && isWithinRadius(report, existingReport)) 
				{
					return group;
				}
			}
		}
		return null;
	}
	
	private boolean isSameCategory(ProblemReport falseReport, ProblemReport trueReport)
	{
		Problem falseProblem = falseReport.getProblem();
		Problem trueProblem = trueReport.getProblem();
		
		if(falseProblem == null || trueProblem == null)
		{
			return false;
		}
		
		if (falseProblem.getCategory() == null || trueProblem.getCategory() == null) 
		{
	        return false;
		}
		 
		 return (falseProblem.getCategory().getId() == trueProblem.getCategory().getId());
	}

    private boolean isWithinRadius(ProblemReport falseReport, ProblemReport trueReport)
    {
    	Problem falseProblem = falseReport.getProblem();
		Problem trueProblem = trueReport.getProblem();
		
		if(falseProblem == null || trueProblem == null)
		{
			return false;
		}
		
		if (falseProblem.getLatitude() == null || falseProblem.getLongitude() == null || trueProblem.getLatitude() == null || trueProblem.getLongitude() == null ) 
		{
	        return false;
		}
		
		double distance = calculateDistance(falseProblem.getLatitude(), falseProblem.getLongitude(), trueProblem.getLatitude(), trueProblem.getLongitude());
		
		return distance <= CLUSTER_RADIUS_METERS;
    }
    
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2)
    {
    	final double EARTH_RADIUS = 6371000;

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        
        
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }
    
    private void createNewGroup(ProblemReport report)
    {
    	ProblemGroup group = new ProblemGroup();
    	
    	ProblemGroupMember member = new ProblemGroupMember();
    	
    	member.setProblemReport(report);
    	
    	group.addMember(member);
    	
    	problemGroupRepo.save(group);
    	report.setGrouped(true);
    	
    	problemReportRepo.save(report);
    }
    
    private void addReportToGroup(ProblemReport report, ProblemGroup group)
    {
    	//Prevent duplicate membership.
    	if(problemGroupMemberRepo.existsByGroup_IdAndProblemReport_Id(group.getId(), report.getId()))
    	{
    		report.setGrouped(true);
    		return;
    	}
    	
    	ProblemGroupMember member = new ProblemGroupMember();
    	
    	member.setProblemReport(report);
    	group.addMember(member);
    	
    	problemGroupMemberRepo.save(member);
    	report.setGrouped(true);
    	
    	problemReportRepo.save(report);
    }
}