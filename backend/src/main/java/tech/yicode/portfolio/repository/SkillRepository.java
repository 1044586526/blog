package tech.yicode.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tech.yicode.portfolio.entity.Skill;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    
    List<Skill> findByIsActiveTrueOrderByDisplayOrderAsc();
    
    @Query("SELECT s FROM Skill s WHERE s.isActive = true ORDER BY s.displayOrder ASC, s.createdAt DESC")
    List<Skill> findActiveSkillsOrdered();
    
    List<Skill> findByNameContainingIgnoreCase(String name);
    
    boolean existsByNameIgnoreCase(String name);
}