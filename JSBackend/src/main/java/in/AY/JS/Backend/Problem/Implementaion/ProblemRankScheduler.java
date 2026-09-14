package in.AY.JS.Backend.Problem.Implementaion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import in.AY.JS.Backend.Problem.Repo.problemRepo;

@Component
public class ProblemRankScheduler {

    @Autowired
    private problemRepo problemRepo;

    // Runs every night at 2 AM — recomputes problemRank in one bulk query
    // instead of doing it on every create request.
    @Scheduled(cron = "0 0 2 * * *")
    @Transactional
    public void recalculateRanks() {
        problemRepo.recalculateProblemRanks();
    }
}