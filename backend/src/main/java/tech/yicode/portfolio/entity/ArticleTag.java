package tech.yicode.portfolio.entity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "article_tags")
public class ArticleTag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50)
    private String name;
    
    @Column(nullable = false, unique = true, length = 50)
    private String slug;
    
    @Column(length = 20)
    private String color;
    
    @Column(name = "use_count")
    private Integer useCount = 0;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
    private List<Article> articles;
    
    // Constructors
    public ArticleTag() {}
    
    public ArticleTag(String name, String slug, String color) {
        this.name = name;
        this.slug = slug;
        this.color = color;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    
    public Integer getUseCount() { return useCount; }
    public void setUseCount(Integer useCount) { this.useCount = useCount; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public List<Article> getArticles() { return articles; }
    public void setArticles(List<Article> articles) { this.articles = articles; }
}