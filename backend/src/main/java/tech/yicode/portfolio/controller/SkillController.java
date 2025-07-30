package tech.yicode.portfolio.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.yicode.portfolio.entity.Skill;
import tech.yicode.portfolio.service.SkillService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081", "http://127.0.0.1:5500"})
public class SkillController {
    
    private final SkillService skillService;
    
    @GetMapping
    public ResponseEntity<List<Skill>> getAllActiveSkills() {
        log.debug("GET /api/skills - Fetching all active skills");
        List<Skill> skills = skillService.getAllActiveSkills();
        return ResponseEntity.ok(skills);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Skill>> getAllSkills() {
        log.debug("GET /api/skills/all - Fetching all skills");
        List<Skill> skills = skillService.getAllSkills();
        return ResponseEntity.ok(skills);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {
        log.debug("GET /api/skills/{} - Fetching skill by id", id);
        return skillService.getSkillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Skill> createSkill(@Valid @RequestBody Skill skill) {
        log.info("POST /api/skills - Creating new skill: {}", skill.getName());
        try {
            Skill createdSkill = skillService.createSkill(skill);
            return ResponseEntity.ok(createdSkill);
        } catch (IllegalArgumentException e) {
            log.error("Error creating skill: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @Valid @RequestBody Skill skill) {
        log.info("PUT /api/skills/{} - Updating skill", id);
        try {
            Skill updatedSkill = skillService.updateSkill(id, skill);
            return ResponseEntity.ok(updatedSkill);
        } catch (IllegalArgumentException e) {
            log.error("Error updating skill: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        log.info("DELETE /api/skills/{} - Deleting skill", id);
        try {
            skillService.deleteSkill(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            log.error("Error deleting skill: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<Void> toggleSkillStatus(@PathVariable Long id) {
        log.info("PATCH /api/skills/{}/toggle-status - Toggling skill status", id);
        try {
            skillService.toggleSkillStatus(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            log.error("Error toggling skill status: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Skill>> searchSkills(@RequestParam String keyword) {
        log.debug("GET /api/skills/search?keyword={} - Searching skills", keyword);
        List<Skill> skills = skillService.searchSkills(keyword);
        return ResponseEntity.ok(skills);
    }
}