package tech.yicode.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tech.yicode.portfolio.entity.Project;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByIsActiveTrueOrderByDisplayOrderAsc();
    
    List<Project> findByIsFeaturedTrueAndIsActiveTrueOrderByDisplayOrderAsc();
    
    @Query("SELECT p FROM Project p WHERE p.isActive = true ORDER BY p.displayOrder ASC, p.createdAt DESC")
    List<Project> findActiveProjectsOrdered();
    
    List<Project> findByTitleContainingIgnoreCaseAndIsActiveTrue(String title);
    
    @Query("SELECT p FROM Project p WHERE p.isActive = true AND " +
           "(LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Project> searchProjects(String keyword);
    
    boolean existsByTitleIgnoreCase(String title);
}