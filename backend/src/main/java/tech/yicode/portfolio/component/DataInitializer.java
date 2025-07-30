package tech.yicode.portfolio.component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tech.yicode.portfolio.service.ProjectService;
import tech.yicode.portfolio.service.SkillService;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final SkillService skillService;
    private final ProjectService projectService;
    
    @Override
    public void run(String... args) throws Exception {
        log.info("Initializing default data...");
        
        try {
            skillService.initializeDefaultSkills();
            projectService.initializeDefaultProjects();
            log.info("Default data initialization completed successfully");
        } catch (Exception e) {
            log.error("Error during data initialization", e);
        }
    }
}