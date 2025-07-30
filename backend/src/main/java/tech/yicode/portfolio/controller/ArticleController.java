package tech.yicode.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.yicode.portfolio.entity.Article;
import tech.yicode.portfolio.entity.ArticleCategory;
import tech.yicode.portfolio.service.ArticleService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "*")
public class ArticleController {
    
    @Autowired
    private ArticleService articleService;
    
    /**
     * Get all categories with their articles for the main page
     */
    @GetMapping("/categories")
    public ResponseEntity<List<ArticleCategory>> getCategories() {
        List<ArticleCategory> categories = articleService.getActiveCategories();
        return ResponseEntity.ok(categories);
    }
    
    /**
     * Get articles by category slug
     */
    @GetMapping("/category/{slug}")
    public ResponseEntity<List<Article>> getArticlesByCategory(@PathVariable String slug) {
        List<Article> articles = articleService.getArticlesByCategorySlug(slug);
        return ResponseEntity.ok(articles);
    }
    
    /**
     * Get paginated articles by category
     */
    @GetMapping("/category/{categoryId}/page")
    public ResponseEntity<Page<Article>> getArticlesByCategoryPaged(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Article> articles = articleService.getArticlesByCategory(categoryId, page, size);
        return ResponseEntity.ok(articles);
    }
    
    /**
     * Get all published articles with pagination
     */
    @GetMapping("/published")
    public ResponseEntity<Page<Article>> getPublishedArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Article> articles = articleService.getPublishedArticles(page, size);
        return ResponseEntity.ok(articles);
    }
    
    /**
     * Get featured articles
     */
    @GetMapping("/featured")
    public ResponseEntity<List<Article>> getFeaturedArticles() {
        List<Article> articles = articleService.getFeaturedArticles();
        return ResponseEntity.ok(articles);
    }
    
    /**
     * Get article by slug
     */
    @GetMapping("/{slug}")
    public ResponseEntity<Article> getArticleBySlug(@PathVariable String slug) {
        Optional<Article> article = articleService.getArticleBySlug(slug);
        if (article.isPresent()) {
            // Increment view count
            articleService.incrementViewCount(article.get().getId());
            return ResponseEntity.ok(article.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    /**
     * Search articles
     */
    @GetMapping("/search")
    public ResponseEntity<Page<Article>> searchArticles(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Article> articles = articleService.searchArticles(keyword, page, size);
        return ResponseEntity.ok(articles);
    }
    
    /**
     * Get category info by slug
     */
    @GetMapping("/category-info/{slug}")
    public ResponseEntity<ArticleCategory> getCategoryBySlug(@PathVariable String slug) {
        Optional<ArticleCategory> category = articleService.getCategoryBySlug(slug);
        return category.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}