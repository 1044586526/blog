package tech.yicode.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.yicode.portfolio.entity.Article;
import tech.yicode.portfolio.entity.ArticleCategory;
import tech.yicode.portfolio.repository.ArticleCategoryRepository;
import tech.yicode.portfolio.repository.ArticleRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ArticleService {
    
    @Autowired
    private ArticleRepository articleRepository;
    
    @Autowired
    private ArticleCategoryRepository categoryRepository;
    
    /**
     * Get all active categories with their published articles
     */
    public List<ArticleCategory> getCategoriesWithArticles() {
        return categoryRepository.findActiveCategoriesWithArticles();
    }
    
    /**
     * Get all active categories
     */
    public List<ArticleCategory> getActiveCategories() {
        return categoryRepository.findActiveCategories();
    }
    
    /**
     * Get articles by category slug
     */
    public List<Article> getArticlesByCategorySlug(String categorySlug) {
        return articleRepository.findPublishedArticlesByCategorySlug(categorySlug);
    }
    
    /**
     * Get paginated articles by category
     */
    public Page<Article> getArticlesByCategory(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return articleRepository.findPublishedArticlesByCategory(categoryId, pageable);
    }
    
    /**
     * Get all published articles with pagination
     */
    public Page<Article> getPublishedArticles(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return articleRepository.findPublishedArticles(pageable);
    }
    
    /**
     * Get featured articles
     */
    public List<Article> getFeaturedArticles() {
        return articleRepository.findFeaturedArticles();
    }
    
    /**
     * Get article by slug
     */
    public Optional<Article> getArticleBySlug(String slug) {
        return articleRepository.findBySlug(slug);
    }
    
    /**
     * Get category by slug
     */
    public Optional<ArticleCategory> getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug);
    }
    
    /**
     * Search articles by keyword
     */
    public Page<Article> searchArticles(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return articleRepository.searchArticles(keyword, pageable);
    }
    
    /**
     * Increment article view count
     */
    public void incrementViewCount(Long articleId) {
        articleRepository.incrementViewCount(articleId);
    }
    
    /**
     * Get article count by category
     */
    public Long getArticleCountByCategory(Long categoryId) {
        return articleRepository.countByCategoryId(categoryId);
    }
    
    /**
     * Save article
     */
    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }
    
    /**
     * Delete article
     */
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}