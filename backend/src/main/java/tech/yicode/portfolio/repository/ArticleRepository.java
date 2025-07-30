package tech.yicode.portfolio.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tech.yicode.portfolio.entity.Article;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    
    Optional<Article> findBySlug(String slug);
    
    @Query("SELECT a FROM Article a WHERE a.isPublished = true ORDER BY a.publishedAt DESC")
    Page<Article> findPublishedArticles(Pageable pageable);
    
    @Query("SELECT a FROM Article a WHERE a.category.id = :categoryId AND a.isPublished = true ORDER BY a.publishedAt DESC")
    Page<Article> findPublishedArticlesByCategory(@Param("categoryId") Long categoryId, Pageable pageable);
    
    @Query("SELECT a FROM Article a WHERE a.category.slug = :categorySlug AND a.isPublished = true ORDER BY a.publishedAt DESC")
    List<Article> findPublishedArticlesByCategorySlug(@Param("categorySlug") String categorySlug);
    
    @Query("SELECT a FROM Article a WHERE a.isFeatured = true AND a.isPublished = true ORDER BY a.publishedAt DESC")
    List<Article> findFeaturedArticles();
    
    @Query("SELECT a FROM Article a WHERE a.isPublished = true AND (a.title LIKE %:keyword% OR a.summary LIKE %:keyword%) ORDER BY a.publishedAt DESC")
    Page<Article> searchArticles(@Param("keyword") String keyword, Pageable pageable);
    
    @Modifying
    @Query("UPDATE Article a SET a.viewCount = a.viewCount + 1 WHERE a.id = :id")
    void incrementViewCount(@Param("id") Long id);
    
    @Query("SELECT COUNT(a) FROM Article a WHERE a.category.id = :categoryId AND a.isPublished = true")
    Long countByCategoryId(@Param("categoryId") Long categoryId);
}