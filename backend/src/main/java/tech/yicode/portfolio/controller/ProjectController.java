package tech.yicode.portfolio.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.yicode.portfolio.entity.Project;
import tech.yicode.portfolio.service.ProjectService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081", "http://127.0.0.1:5500"})
public class ProjectController {
    
    private final ProjectService projectService;
    
    @GetMapping
    public ResponseEntity<List<Project>> getAllActiveProjects() {
        log.debug("GET /api/projects - Fetching all active projects");
        List<Project> projects = projectService.getAllActiveProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        log.debug("GET /api/projects/featured - Fetching featured projects");
        List<Project> projects = projectService.getFeaturedProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Project>> getAllProjects() {
        log.debug("GET /api/projects/all - Fetching all projects");
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        log.debug("GET /api/projects/{} - Fetching project by id", id);
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        log.info("POST /api/projects - Creating new project: {}", project.getTitle());
        try {
            Project createdProject = projectService.createProject(project);
            return ResponseEntity.ok(createdProject);
        } catch (IllegalArgumentException e) {
            log.error("Error creating project: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @Valid @RequestBody Project project) {
        log.info("PUT /api/projects/{} - Updating project", id);
        try {
            Project updatedProject = projectService.updateProject(id, project);
            return ResponseEntity.ok(updatedProject);
        } catch (IllegalArgumentException e) {
            log.error("Error updating project: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        log.info("DELETE /api/projects/{} - Deleting project", id);
        try {
            projectService.deleteProject(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            log.error("Error deleting project: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<Void> toggleProjectStatus(@PathVariable Long id) {
        log.info("PATCH /api/projects/{}/toggle-status - Toggling project status", id);
        try {
            projectService.toggleProjectStatus(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            log.error("Error toggling project status: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/toggle-featured")
    public ResponseEntity<Void> toggleFeaturedStatus(@PathVariable Long id) {
        log.info("PATCH /api/projects/{}/toggle-featured - Toggling featured status", id);
        try {
            projectService.toggleFeaturedStatus(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            log.error("Error toggling featured status: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(@RequestParam String keyword) {
        log.debug("GET /api/projects/search?keyword={} - Searching projects", keyword);
        List<Project> projects = projectService.searchProjects(keyword);
        return ResponseEntity.ok(projects);
    }
}