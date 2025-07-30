package tech.yicode.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tech.yicode.portfolio.entity.ArticleCategory;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleCategoryRepository extends JpaRepository<ArticleCategory, Long> {
    
    Optional<ArticleCategory> findBySlug(String slug);
    
    @Query("SELECT c FROM ArticleCategory c WHERE c.isActive = true ORDER BY c.displayOrder ASC")
    List<ArticleCategory> findActiveCategories();
    
    @Query("SELECT c FROM ArticleCategory c LEFT JOIN FETCH c.articles a WHERE c.isActive = true AND a.isPublished = true ORDER BY c.displayOrder ASC")
    List<ArticleCategory> findActiveCategoriesWithArticles();
}