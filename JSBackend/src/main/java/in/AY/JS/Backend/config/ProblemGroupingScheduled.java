package in.AY.JS.Backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import in.AY.JS.Backend.Problem.Service.ProblemClusterService;
import in.AY.JS.Backend.Problem.Service.ProblemGroupService;

@Service
public class ProblemGroupingScheduled {

	@Autowired
	private ProblemClusterService problemClusterService;

    @Scheduled(cron = "0 0 2 * * *")
    public void runProblemGrouping() {

        System.out.println("Problem grouping started...");

        problemClusterService.clusterAcceptedReports();

        System.out.println("Problem grouping completed...");
    }
}