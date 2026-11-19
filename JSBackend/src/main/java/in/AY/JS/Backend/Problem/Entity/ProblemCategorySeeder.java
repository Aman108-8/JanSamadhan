package in.AY.JS.Backend.Problem.Entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import in.AY.JS.Backend.Problem.Entity.ProblemCategory.Level;
import in.AY.JS.Backend.Problem.Repo.ProblemCategoryRepo;

@Component
public class ProblemCategorySeeder implements CommandLineRunner {

    @Autowired
    private ProblemCategoryRepo problemCategoryRepo;

    @Override
    public void run(String... args) {
        seed("Water & Sanitation", Level.CRITICAL);
        seed("Roads & Infrastructure", Level.HIGH);
        seed("Electricity", Level.HIGH);
        seed("Waste Management", Level.MEDIUM);
        seed("Drainage & Flooding", Level.CRITICAL);
        seed("Streetlights", Level.MEDIUM);
        seed("Healthcare", Level.CRITICAL);
        seed("Education", Level.MEDIUM);
        seed("Environment", Level.HIGH);
        seed("Public Safety", Level.CRITICAL);
        seed("Public Facilities", Level.MEDIUM);
        seed("Government Services", Level.LOW);
    }

    private void seed(String name, Level level) {
        problemCategoryRepo.findByNameIgnoreCase(name).ifPresentOrElse(
                existing -> { /* already seeded, skip */ },
                () -> {
                    ProblemCategory category = new ProblemCategory();
                    category.setName(name);
                    category.setLevel(level);
                    problemCategoryRepo.save(category);
                }
        );
    }
}