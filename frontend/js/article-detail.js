// Article Detail Page JavaScript

class ArticleDetailManager {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8080/api';
        this.articleId = this.getArticleIdFromUrl();
        this.isLiked = false;
        this.isFollowing = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadArticle();
        this.loadComments();
        this.loadRelatedArticles();
        this.initTableOfContents();
    }
    
    getArticleIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1';
    }
    
    bindEvents() {
        // Like button
        const likeBtn = document.getElementById('likeBtn');
        if (likeBtn) {
            likeBtn.addEventListener('click', () => this.toggleLike());
        }
        
        // Share button
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareArticle());
        }
        
        // Follow button
        const followBtn = document.querySelector('.follow-btn');
        if (followBtn) {
            followBtn.addEventListener('click', () => this.toggleFollow());
        }
        
        // Comment submission
        const submitComment = document.getElementById('submitComment');
        if (submitComment) {
            submitComment.addEventListener('click', () => this.submitComment());
        }
        
        // Comment sorting
        const sortComments = document.getElementById('sortComments');
        if (sortComments) {
            sortComments.addEventListener('change', () => this.loadComments());
        }
        
        // Back to top functionality
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Theme toggle
        this.initThemeToggle();
    }
    
    async loadArticle() {
        try {
            // Mock article data for demonstration
            const mockArticle = {
                id: this.articleId,
                title: 'Spring Boot 3.0 New Features Deep Dive',
                summary: 'In-depth analysis of Spring Boot 3.0 core new features, including native image support, observability enhancements, performance optimizations and other important updates.',
                content: this.getMockArticleContent(),
                category: {
                    id: 1,
                    name: 'Java Development',
                    slug: 'java-development'
                },
                tags: [
                    { id: 1, name: 'Spring Boot' },
                    { id: 2, name: 'Java' },
                    { id: 3, name: 'Microservices' },
                    { id: 4, name: 'Performance Optimization' }
                ],
                publishDate: '2024-01-15',
                readTime: 8,
                views: 1250,
                likes: 89,
                comments: 23,
                author: {
                    id: 1,
                    name: 'DaDa',
                    avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cdefs%3E%3ClinearGradient id=\'grad1\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23667eea;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23764ba2;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'90\' fill=\'url(%23grad1)\'/%3E%3Ctext x=\'100\' y=\'120\' text-anchor=\'middle\' fill=\'white\' font-size=\'60\' font-weight=\'bold\'%3EDa%3C/text%3E%3C/svg%3E',
                    bio: 'Java Development Engineer, focusing on Spring ecosystem and microservice architecture, passionate about technology sharing.',
                    articleCount: 156,
                    totalLikes: 12500,
                    followers: 8900
                }
            };
            
            this.renderArticle(mockArticle);
            
        } catch (error) {
            console.error('Failed to load article:', error);
            this.showError('Failed to load article, please try again later');
        }
    }
    
    getMockArticleContent() {
        return `
            <h2 id="introduction">1. Introduction</h2>
            <p>Spring Boot 3.0 represents a major milestone in the Spring ecosystem, bringing significant improvements in performance, developer experience, and cloud-native capabilities. This article will explore the key new features and enhancements that make Spring Boot 3.0 a compelling upgrade for Java developers.</p>
            
            <h2 id="new-features">2. Core New Features</h2>
            <p>Spring Boot 3.0 introduces several groundbreaking features that enhance both development productivity and application performance:</p>
            
            <ul>
                <li><strong>Native Image Support</strong>: First-class support for GraalVM native images</li>
                <li><strong>Enhanced Observability</strong>: Improved metrics, tracing, and monitoring capabilities</li>
                <li><strong>Performance Optimizations</strong>: Faster startup times and reduced memory footprint</li>
                <li><strong>Java 17+ Baseline</strong>: Leveraging modern Java features and improvements</li>
            </ul>
            
            <h2 id="native-image">3. Native Image Support</h2>
            <p>One of the most exciting features in Spring Boot 3.0 is the comprehensive support for GraalVM native images. This enables developers to compile Spring Boot applications into native executables that start up in milliseconds and consume significantly less memory.</p>
            
            <blockquote>
                <p>Native images can reduce startup time from seconds to milliseconds and memory usage by up to 5x, making them ideal for serverless and containerized environments.</p>
            </blockquote>
            
            <h3>Building Native Images</h3>
            <p>To build a native image with Spring Boot 3.0, you can use the following Maven command:</p>
            
            <pre><code class="language-bash">./mvnw -Pnative native:compile</code></pre>
            
            <p>Or with Gradle:</p>
            
            <pre><code class="language-bash">./gradlew nativeCompile</code></pre>
            
            <h2 id="observability">4. Observability Enhancements</h2>
            <p>Spring Boot 3.0 significantly improves observability with enhanced support for:</p>
            
            <ul>
                <li><strong>Micrometer Tracing</strong>: Distributed tracing with OpenTelemetry</li>
                <li><strong>Metrics Collection</strong>: More detailed application metrics</li>
                <li><strong>Health Indicators</strong>: Enhanced health check capabilities</li>
                <li><strong>Actuator Improvements</strong>: Better monitoring endpoints</li>
            </ul>
            
            <h3>Configuration Example</h3>
            <pre><code class="language-yaml">management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  tracing:
    sampling:
      probability: 1.0
  metrics:
    export:
      prometheus:
        enabled: true</code></pre>
            
            <h2 id="performance">5. Performance Optimizations</h2>
            <p>Spring Boot 3.0 includes numerous performance improvements:</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Aspect</th>
                        <th>Spring Boot 2.x</th>
                        <th>Spring Boot 3.0</th>
                        <th>Improvement</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Startup Time</td>
                        <td>2.5s</td>
                        <td>1.8s</td>
                        <td>28% faster</td>
                    </tr>
                    <tr>
                        <td>Memory Usage</td>
                        <td>150MB</td>
                        <td>120MB</td>
                        <td>20% reduction</td>
                    </tr>
                    <tr>
                        <td>Throughput</td>
                        <td>10k req/s</td>
                        <td>13k req/s</td>
                        <td>30% increase</td>
                    </tr>
                </tbody>
            </table>
            
            <h2 id="migration">6. Migration Guide</h2>
            <p>Migrating from Spring Boot 2.x to 3.0 requires careful planning. Here are the key steps:</p>
            
            <h3>Prerequisites</h3>
            <ul>
                <li>Java 17 or later</li>
                <li>Spring Framework 6.0+</li>
                <li>Jakarta EE 9+ (javax → jakarta package migration)</li>
            </ul>
            
            <h3>Key Changes</h3>
            <p>The most significant change is the migration from Java EE to Jakarta EE:</p>
            
            <pre><code class="language-java">// Before (Spring Boot 2.x)
import javax.servlet.http.HttpServletRequest;
import javax.persistence.Entity;

// After (Spring Boot 3.0)
import jakarta.servlet.http.HttpServletRequest;
import jakarta.persistence.Entity;</code></pre>
            
            <h2 id="conclusion">7. Conclusion</h2>
            <p>Spring Boot 3.0 represents a significant evolution in the Spring ecosystem, offering improved performance, better observability, and native image support. While the migration requires some effort, the benefits in terms of performance and developer experience make it a worthwhile upgrade.</p>
            
            <p>The combination of faster startup times, reduced memory usage, and enhanced monitoring capabilities makes Spring Boot 3.0 an excellent choice for modern cloud-native applications.</p>
        `;
    }
    
    renderArticle(article) {
        // Update page title
        document.title = `${article.title} - DaDa's Tech Blog`;
        
        // Update breadcrumb
        const categoryElement = document.getElementById('articleCategory');
        if (categoryElement) {
            categoryElement.textContent = article.category.name;
        }
        
        // Update category tag
        const categoryTag = document.getElementById('categoryTag');
        if (categoryTag) {
            categoryTag.textContent = article.category.name;
        }
        
        // Update publish date
        const publishDate = document.getElementById('publishDate');
        if (publishDate) {
            publishDate.textContent = this.formatDate(article.publishDate);
        }
        
        // Update read time
        const readTime = document.getElementById('readTime');
        if (readTime) {
            readTime.textContent = `${article.readTime} min read`;
        }
        
        // Update title
        const titleElement = document.getElementById('articleTitle');
        if (titleElement) {
            titleElement.textContent = article.title;
        }
        
        // Update summary
        const summaryElement = document.getElementById('articleSummary');
        if (summaryElement) {
            summaryElement.textContent = article.summary;
        }
        
        // Update stats
        const viewCount = document.getElementById('viewCount');
        if (viewCount) {
            viewCount.textContent = this.formatNumber(article.views);
        }
        
        const likeCount = document.getElementById('likeCount');
        if (likeCount) {
            likeCount.textContent = article.likes;
        }
        
        const commentCount = document.getElementById('commentCount');
        if (commentCount) {
            commentCount.textContent = article.comments;
        }
        
        // Update content
        const contentElement = document.getElementById('articleContent');
        if (contentElement) {
            contentElement.innerHTML = article.content;
            
            // Initialize syntax highlighting
            if (window.Prism) {
                Prism.highlightAll();
            }
        }
        
        // Update tags
        const tagsList = document.getElementById('tagsList');
        if (tagsList && article.tags) {
            tagsList.innerHTML = article.tags.map(tag => 
                `<span class="tag" onclick="window.location.href='articles.html?tag=${tag.slug}'">${tag.name}</span>`
            ).join('');
        }
        
        // Update author info
        this.updateAuthorInfo(article.author);
    }
    
    updateAuthorInfo(author) {
        const authorAvatar = document.querySelector('.author-avatar img');
        if (authorAvatar) {
            authorAvatar.src = author.avatar;
            authorAvatar.alt = `${author.name}'s avatar`;
        }
        
        const authorName = document.querySelector('.author-details h4');
        if (authorName) {
            authorName.textContent = author.name;
        }
        
        const authorBio = document.querySelector('.author-details p');
        if (authorBio) {
            authorBio.textContent = author.bio;
        }
        
        const authorStats = document.querySelector('.author-stats');
        if (authorStats) {
            authorStats.innerHTML = `
                <span>Published <strong>${author.articleCount}</strong> articles</span>
                <span>Received <strong>${this.formatNumber(author.totalLikes)}</strong> likes</span>
                <span><strong>${this.formatNumber(author.followers)}</strong> followers</span>
            `;
        }
    }
    
    async loadComments() {
        try {
            const sortBy = document.getElementById('sortComments')?.value || 'latest';
            
            // Mock comments data
            const mockComments = [
                {
                    id: 1,
                    user: { name: 'Tech Enthusiast', avatar: 'TE' },
                    content: 'Excellent article! The native image support in Spring Boot 3.0 is a game-changer for microservices deployment.',
                    publishDate: '2024-01-16T10:30:00Z',
                    likes: 12,
                    replies: []
                },
                {
                    id: 2,
                    user: { name: 'Java Developer', avatar: 'JD' },
                    content: 'Thanks for the detailed migration guide. The javax to jakarta package change was the most challenging part of our upgrade.',
                    publishDate: '2024-01-16T09:15:00Z',
                    likes: 8,
                    replies: []
                },
                {
                    id: 3,
                    user: { name: 'Cloud Architect', avatar: 'CA' },
                    content: 'The performance improvements are impressive. We\'ve seen similar results in our production environment after upgrading.',
                    publishDate: '2024-01-16T08:45:00Z',
                    likes: 15,
                    replies: []
                }
            ];
            
            this.renderComments(mockComments);
            
        } catch (error) {
            console.error('Failed to load comments:', error);
        }
    }
    
    renderComments(comments) {
        const commentsList = document.getElementById('commentsList');
        if (!commentsList) return;
        
        commentsList.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <div class="comment-user-avatar">${comment.user.avatar}</div>
                    <div class="comment-user-info">
                        <h5>${comment.user.name}</h5>
                        <span>${this.formatDate(comment.publishDate)}</span>
                    </div>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-actions-bottom">
                    <span class="comment-action"><i class="fas fa-heart"></i> ${comment.likes}</span>
                    <span class="comment-action"><i class="fas fa-reply"></i> Reply</span>
                    <span class="comment-action"><i class="fas fa-flag"></i> Report</span>
                </div>
            </div>
        `).join('');
    }
    
    async loadRelatedArticles() {
        try {
            // Mock related articles
            const mockRelated = [
                {
                    id: 2,
                    title: 'Java 17 Performance Optimization Practices',
                    summary: 'Explore the performance improvements and optimization techniques available in Java 17.',
                    publishDate: '2024-01-12',
                    views: 980
                },
                {
                    id: 3,
                    title: 'Microservice Architecture Design Patterns',
                    summary: 'Common design patterns and best practices for building scalable microservice architectures.',
                    publishDate: '2024-01-10',
                    views: 1560
                },
                {
                    id: 4,
                    title: 'Spring Security 6 Permission Control',
                    summary: 'Comprehensive guide to implementing fine-grained permission control with Spring Security 6.',
                    publishDate: '2024-01-08',
                    views: 890
                }
            ];
            
            this.renderRelatedArticles(mockRelated);
            
        } catch (error) {
            console.error('Failed to load related articles:', error);
        }
    }
    
    renderRelatedArticles(articles) {
        const relatedGrid = document.getElementById('relatedGrid');
        if (!relatedGrid) return;
        
        relatedGrid.innerHTML = articles.map(article => `
            <div class="related-card" onclick="window.location.href='article.html?id=${article.id}'">
                <h4>${article.title}</h4>
                <p>${article.summary}</p>
                <div class="related-meta">
                    <span>${this.formatDate(article.publishDate)}</span>
                    <span><i class="fas fa-eye"></i> ${this.formatNumber(article.views)}</span>
                </div>
            </div>
        `).join('');
    }
    
    initTableOfContents() {
        const tocList = document.getElementById('tocList');
        const articleContent = document.getElementById('articleContent');
        
        if (!tocList || !articleContent) return;
        
        // Generate TOC from headings
        const headings = articleContent.querySelectorAll('h2, h3, h4');
        if (headings.length === 0) return;
        
        const tocItems = Array.from(headings).map(heading => {
            const id = heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-');
            heading.id = id;
            
            return `<li><a href="#${id}">${heading.textContent}</a></li>`;
        });
        
        tocList.innerHTML = tocItems.join('');
        
        // Add scroll spy functionality
        this.initScrollSpy();
    }
    
    initScrollSpy() {
        const tocLinks = document.querySelectorAll('.toc-list a');
        const headings = document.querySelectorAll('.article-content h2, .article-content h3, .article-content h4');
        
        if (tocLinks.length === 0 || headings.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    tocLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.toc-list a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -80% 0px'
        });
        
        headings.forEach(heading => observer.observe(heading));
    }
    
    toggleLike() {
        const likeBtn = document.getElementById('likeBtn');
        const likeCount = document.getElementById('likeCount');
        
        if (!likeBtn || !likeCount) return;
        
        this.isLiked = !this.isLiked;
        
        if (this.isLiked) {
            likeBtn.classList.add('liked');
            likeBtn.innerHTML = '<i class="fas fa-heart"></i><span>Liked</span>';
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        } else {
            likeBtn.classList.remove('liked');
            likeBtn.innerHTML = '<i class="fas fa-heart"></i><span>Like</span>';
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
        }
    }
    
    shareArticle() {
        if (navigator.share) {
            navigator.share({
                title: document.getElementById('articleTitle')?.textContent || 'Article',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Article link copied to clipboard!');
            });
        }
    }
    
    toggleFollow() {
        const followBtn = document.querySelector('.follow-btn');
        if (!followBtn) return;
        
        this.isFollowing = !this.isFollowing;
        
        if (this.isFollowing) {
            followBtn.innerHTML = '<i class="fas fa-check"></i><span>Following</span>';
            followBtn.style.background = 'var(--success-gradient)';
        } else {
            followBtn.innerHTML = '<i class="fas fa-plus"></i><span>Follow</span>';
            followBtn.style.background = 'var(--primary-gradient)';
        }
    }
    
    submitComment() {
        const commentText = document.getElementById('commentText');
        if (!commentText || !commentText.value.trim()) return;
        
        // Mock comment submission
        alert('Comment submitted successfully!');
        commentText.value = '';
        
        // Reload comments to show the new one
        this.loadComments();
    }
    
    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
        
        // Theme toggle event
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('light-theme');
                const isLight = body.classList.contains('light-theme');
                
                themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
        }
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        
        return date.toLocaleDateString('en-US');
    }
    
    formatNumber(num) {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + 'w';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
    
    showError(message) {
        const contentElement = document.getElementById('articleContent');
        if (contentElement) {
            contentElement.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.articleDetailManager = new ArticleDetailManager();
});