package tech.yicode.portfolio.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.yicode.portfolio.entity.Skill;
import tech.yicode.portfolio.repository.SkillRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SkillService {
    
    private final SkillRepository skillRepository;
    
    @Cacheable(value = "skills", key = "'all_active'")
    @Transactional(readOnly = true)
    public List<Skill> getAllActiveSkills() {
        log.debug("Fetching all active skills");
        return skillRepository.findActiveSkillsOrdered();
    }
    
    @Transactional(readOnly = true)
    public List<Skill> getAllSkills() {
        log.debug("Fetching all skills");
        return skillRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Optional<Skill> getSkillById(Long id) {
        log.debug("Fetching skill by id: {}", id);
        return skillRepository.findById(id);
    }
    
    @CacheEvict(value = "skills", allEntries = true)
    public Skill createSkill(Skill skill) {
        log.info("Creating new skill: {}", skill.getName());
        
        if (skillRepository.existsByNameIgnoreCase(skill.getName())) {
            throw new IllegalArgumentException("Skill with name '" + skill.getName() + "' already exists");
        }
        
        if (skill.getDisplayOrder() == null) {
            skill.setDisplayOrder(getNextDisplayOrder());
        }
        
        if (skill.getIsActive() == null) {
            skill.setIsActive(true);
        }
        
        return skillRepository.save(skill);
    }
    
    @CacheEvict(value = "skills", allEntries = true)
    public Skill updateSkill(Long id, Skill skillDetails) {
        log.info("Updating skill with id: {}", id);
        
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Skill not found with id: " + id));
        
        // Check if name is being changed and if it conflicts with existing skill
        if (!skill.getName().equalsIgnoreCase(skillDetails.getName()) &&
            skillRepository.existsByNameIgnoreCase(skillDetails.getName())) {
            throw new IllegalArgumentException("Skill with name '" + skillDetails.getName() + "' already exists");
        }
        
        skill.setName(skillDetails.getName());
        skill.setDescription(skillDetails.getDescription());
        skill.setIcon(skillDetails.getIcon());
        skill.setProficiencyLevel(skillDetails.getProficiencyLevel());
        skill.setDisplayOrder(skillDetails.getDisplayOrder());
        skill.setIsActive(skillDetails.getIsActive());
        
        return skillRepository.save(skill);
    }
    
    @CacheEvict(value = "skills", allEntries = true)
    public void deleteSkill(Long id) {
        log.info("Deleting skill with id: {}", id);
        
        if (!skillRepository.existsById(id)) {
            throw new IllegalArgumentException("Skill not found with id: " + id);
        }
        
        skillRepository.deleteById(id);
    }
    
    @CacheEvict(value = "skills", allEntries = true)
    public void toggleSkillStatus(Long id) {
        log.info("Toggling status for skill with id: {}", id);
        
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Skill not found with id: " + id));
        
        skill.setIsActive(!skill.getIsActive());
        skillRepository.save(skill);
    }
    
    @Transactional(readOnly = true)
    public List<Skill> searchSkills(String keyword) {
        log.debug("Searching skills with keyword: {}", keyword);
        return skillRepository.findByNameContainingIgnoreCase(keyword);
    }
    
    private Integer getNextDisplayOrder() {
        List<Skill> skills = skillRepository.findAll();
        return skills.stream()
                .mapToInt(skill -> skill.getDisplayOrder() != null ? skill.getDisplayOrder() : 0)
                .max()
                .orElse(0) + 1;
    }
    
    public void initializeDefaultSkills() {
        log.info("Initializing default skills");
        
        if (skillRepository.count() == 0) {
            List<Skill> defaultSkills = List.of(
                createDefaultSkill("Java & Spring Boot", 
                    "Backend development with Spring Boot, Spring Security, and microservices architecture.", 
                    "fab fa-java", 5, 1),
                createDefaultSkill("Frontend Development", 
                    "Modern frontend development with React, Vue.js, and responsive design principles.", 
                    "fab fa-react", 4, 2),
                createDefaultSkill("Database Management", 
                    "MySQL, PostgreSQL, Redis, and database optimization techniques.", 
                    "fas fa-database", 4, 3),
                createDefaultSkill("Cloud & DevOps", 
                    "AWS, Docker, Kubernetes, and CI/CD pipeline implementation.", 
                    "fas fa-cloud", 3, 4),
                createDefaultSkill("API Development", 
                    "RESTful APIs, GraphQL, and microservices architecture design.", 
                    "fas fa-code", 5, 5),
                createDefaultSkill("System Architecture", 
                    "Scalable system design, performance optimization, and best practices.", 
                    "fas fa-sitemap", 4, 6)
            );
            
            skillRepository.saveAll(defaultSkills);
            log.info("Default skills initialized successfully");
        }
    }
    
    private Skill createDefaultSkill(String name, String description, String icon, int proficiency, int order) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setDescription(description);
        skill.setIcon(icon);
        skill.setProficiencyLevel(proficiency);
        skill.setDisplayOrder(order);
        skill.setIsActive(true);
        return skill;
    }
}