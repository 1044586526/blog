package tech.yicode.portfolio.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.yicode.portfolio.entity.Project;
import tech.yicode.portfolio.repository.ProjectRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    
    @Cacheable(value = "projects", key = "'all_active'")
    @Transactional(readOnly = true)
    public List<Project> getAllActiveProjects() {
        log.debug("Fetching all active projects");
        return projectRepository.findActiveProjectsOrdered();
    }
    
    @Cacheable(value = "projects", key = "'featured'")
    @Transactional(readOnly = true)
    public List<Project> getFeaturedProjects() {
        log.debug("Fetching featured projects");
        return projectRepository.findByIsFeaturedTrueAndIsActiveTrueOrderByDisplayOrderAsc();
    }
    
    @Transactional(readOnly = true)
    public List<Project> getAllProjects() {
        log.debug("Fetching all projects");
        return projectRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Optional<Project> getProjectById(Long id) {
        log.debug("Fetching project by id: {}", id);
        return projectRepository.findById(id);
    }
    
    @CacheEvict(value = "projects", allEntries = true)
    public Project createProject(Project project) {
        log.info("Creating new project: {}", project.getTitle());
        
        if (projectRepository.existsByTitleIgnoreCase(project.getTitle())) {
            throw new IllegalArgumentException("Project with title '" + project.getTitle() + "' already exists");
        }
        
        if (project.getDisplayOrder() == null) {
            project.setDisplayOrder(getNextDisplayOrder());
        }
        
        if (project.getIsActive() == null) {
            project.setIsActive(true);
        }
        
        if (project.getIsFeatured() == null) {
            project.setIsFeatured(false);
        }
        
        return projectRepository.save(project);
    }
    
    @CacheEvict(value = "projects", allEntries = true)
    public Project updateProject(Long id, Project projectDetails) {
        log.info("Updating project with id: {}", id);
        
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));
        
        // Check if title is being changed and if it conflicts with existing project
        if (!project.getTitle().equalsIgnoreCase(projectDetails.getTitle()) &&
            projectRepository.existsByTitleIgnoreCase(projectDetails.getTitle())) {
            throw new IllegalArgumentException("Project with title '" + projectDetails.getTitle() + "' already exists");
        }
        
        project.setTitle(projectDetails.getTitle());
        project.setDescription(projectDetails.getDescription());
        project.setGithubUrl(projectDetails.getGithubUrl());
        project.setLiveUrl(projectDetails.getLiveUrl());
        project.setImageUrl(projectDetails.getImageUrl());
        project.setTechnologies(projectDetails.getTechnologies());
        project.setDisplayOrder(projectDetails.getDisplayOrder());
        project.setIsFeatured(projectDetails.getIsFeatured());
        project.setIsActive(projectDetails.getIsActive());
        project.setStartDate(projectDetails.getStartDate());
        project.setEndDate(projectDetails.getEndDate());
        
        return projectRepository.save(project);
    }
    
    @CacheEvict(value = "projects", allEntries = true)
    public void deleteProject(Long id) {
        log.info("Deleting project with id: {}", id);
        
        if (!projectRepository.existsById(id)) {
            throw new IllegalArgumentException("Project not found with id: " + id);
        }
        
        projectRepository.deleteById(id);
    }
    
    @CacheEvict(value = "projects", allEntries = true)
    public void toggleProjectStatus(Long id) {
        log.info("Toggling status for project with id: {}", id);
        
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));
        
        project.setIsActive(!project.getIsActive());
        projectRepository.save(project);
    }
    
    @CacheEvict(value = "projects", allEntries = true)
    public void toggleFeaturedStatus(Long id) {
        log.info("Toggling featured status for project with id: {}", id);
        
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));
        
        project.setIsFeatured(!project.getIsFeatured());
        projectRepository.save(project);
    }
    
    @Transactional(readOnly = true)
    public List<Project> searchProjects(String keyword) {
        log.debug("Searching projects with keyword: {}", keyword);
        return projectRepository.searchProjects(keyword);
    }
    
    private Integer getNextDisplayOrder() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream()
                .mapToInt(project -> project.getDisplayOrder() != null ? project.getDisplayOrder() : 0)
                .max()
                .orElse(0) + 1;
    }
    
    public void initializeDefaultProjects() {
        log.info("Initializing default projects");
        
        if (projectRepository.count() == 0) {
            List<Project> defaultProjects = List.of(
                createDefaultProject(
                    "E-Commerce Platform",
                    "Full-stack e-commerce solution with Spring Boot backend, React frontend, and MySQL database.",
                    List.of("Spring Boot", "React", "MySQL", "Redis"),
                    "https://github.com/yicode/ecommerce",
                    "https://demo.yicode.tech/ecommerce",
                    true, 1
                ),
                createDefaultProject(
                    "Task Management System",
                    "Collaborative task management application with real-time updates and team collaboration features.",
                    List.of("Java", "Vue.js", "WebSocket", "PostgreSQL"),
                    "https://github.com/yicode/taskmanager",
                    "https://demo.yicode.tech/tasks",
                    true, 2
                ),
                createDefaultProject(
                    "Blog CMS",
                    "Content management system for blogs with admin panel, SEO optimization, and responsive design.",
                    List.of("Spring Boot", "Thymeleaf", "MySQL", "Bootstrap"),
                    "https://github.com/yicode/blogcms",
                    "https://demo.yicode.tech/blog",
                    false, 3
                )
            );
            
            projectRepository.saveAll(defaultProjects);
            log.info("Default projects initialized successfully");
        }
    }
    
    private Project createDefaultProject(String title, String description, List<String> technologies,
                                       String githubUrl, String liveUrl, boolean isFeatured, int order) {
        Project project = new Project();
        project.setTitle(title);
        project.setDescription(description);
        project.setTechnologies(technologies);
        project.setGithubUrl(githubUrl);
        project.setLiveUrl(liveUrl);
        project.setIsFeatured(isFeatured);
        project.setDisplayOrder(order);
        project.setIsActive(true);
        return project;
    }
}