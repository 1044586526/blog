package tech.yicode.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tech.yicode.portfolio.entity.Contact;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    List<Contact> findAllByOrderByCreatedAtDesc();
    
    List<Contact> findByIsReadFalseOrderByCreatedAtDesc();
    
    List<Contact> findByIsRepliedFalseOrderByCreatedAtDesc();
    
    @Query("SELECT c FROM Contact c WHERE c.createdAt BETWEEN :startDate AND :endDate ORDER BY c.createdAt DESC")
    List<Contact> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.createdAt >= :date")
    Long countContactsSince(LocalDateTime date);
    
    List<Contact> findByEmailContainingIgnoreCase(String email);
    
    List<Contact> findByNameContainingIgnoreCase(String name);
}