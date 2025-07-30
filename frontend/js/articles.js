// Articles Page JavaScript

class ArticlesManager {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8080/api';
        this.currentPage = 1;
        this.pageSize = 10;
        this.currentCategory = null;
        this.searchQuery = '';
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadCategories();
        this.loadFeaturedArticles();
    }
    
    bindEvents() {
        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch());
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch();
                }
            });
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
    }
    
    async loadCategories() {
        try {
            this.showLoading('categoriesGrid');
            
            // Mock data for demonstration
            const mockCategories = [
                {
                    id: 1,
                    name: 'Java开发',
                    description: 'Java核心技术、Spring框架、微服务架构',
                    icon: 'fab fa-java',
                    color: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
                    articleCount: 15,
                    articles: [
                        { id: 1, title: 'Spring Boot 3.0 新特性详解', publishDate: '2024-01-15', views: 1250, likes: 89 },
                        { id: 2, title: 'Java 17 性能优化实践', publishDate: '2024-01-12', views: 980, likes: 67 },
                        { id: 3, title: '微服务架构设计模式', publishDate: '2024-01-10', views: 1560, likes: 123 },
                        { id: 4, title: 'Spring Security 6 权限控制', publishDate: '2024-01-08', views: 890, likes: 56 },
                        { id: 5, title: 'JVM 调优实战指南', publishDate: '2024-01-05', views: 1340, likes: 98 }
                    ]
                },
                {
                    id: 2,
                    name: '数据库技术',
                    description: 'MySQL优化、Redis缓存、数据库设计',
                    icon: 'fas fa-database',
                    color: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    articleCount: 12,
                    articles: [
                        { id: 6, title: 'MySQL 8.0 索引优化策略', publishDate: '2024-01-14', views: 1120, likes: 78 },
                        { id: 7, title: 'Redis 集群部署与监控', publishDate: '2024-01-11', views: 950, likes: 65 },
                        { id: 8, title: '数据库分库分表实践', publishDate: '2024-01-09', views: 1280, likes: 92 },
                        { id: 9, title: 'SQL 查询性能调优', publishDate: '2024-01-07', views: 870, likes: 54 },
                        { id: 10, title: 'NoSQL 数据库选型指南', publishDate: '2024-01-04', views: 1050, likes: 71 }
                    ]
                },
                {
                    id: 3,
                    name: '系统架构',
                    description: '分布式系统、高并发、系统设计',
                    icon: 'fas fa-sitemap',
                    color: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
                    articleCount: 10,
                    articles: [
                        { id: 11, title: '分布式系统一致性解决方案', publishDate: '2024-01-13', views: 1450, likes: 105 },
                        { id: 12, title: '高并发系统设计实践', publishDate: '2024-01-10', views: 1680, likes: 134 },
                        { id: 13, title: '消息队列选型与应用', publishDate: '2024-01-08', views: 1200, likes: 87 },
                        { id: 14, title: '缓存架构设计模式', publishDate: '2024-01-06', views: 1100, likes: 79 },
                        { id: 15, title: '服务治理与监控', publishDate: '2024-01-03', views: 980, likes: 68 }
                    ]
                },
                {
                    id: 4,
                    name: 'DevOps运维',
                    description: 'Docker容器、K8s编排、CI/CD流程',
                    icon: 'fas fa-cogs',
                    color: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
                    articleCount: 8,
                    articles: [
                        { id: 16, title: 'Docker 容器化最佳实践', publishDate: '2024-01-12', views: 1350, likes: 96 },
                        { id: 17, title: 'Kubernetes 集群管理', publishDate: '2024-01-09', views: 1180, likes: 83 },
                        { id: 18, title: 'Jenkins CI/CD 流水线', publishDate: '2024-01-07', views: 1020, likes: 72 },
                        { id: 19, title: '监控告警系统搭建', publishDate: '2024-01-05', views: 890, likes: 61 },
                        { id: 20, title: '自动化部署实践', publishDate: '2024-01-02', views: 1150, likes: 84 }
                    ]
                },
                {
                    id: 5,
                    name: '前端技术',
                    description: 'Vue.js、React、现代前端开发',
                    icon: 'fab fa-js-square',
                    color: 'linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)',
                    articleCount: 6,
                    articles: [
                        { id: 21, title: 'Vue 3 Composition API 实践', publishDate: '2024-01-11', views: 1250, likes: 89 },
                        { id: 22, title: 'React Hooks 深入理解', publishDate: '2024-01-08', views: 1080, likes: 76 },
                        { id: 23, title: '前端性能优化技巧', publishDate: '2024-01-06', views: 1320, likes: 94 },
                        { id: 24, title: 'TypeScript 进阶应用', publishDate: '2024-01-04', views: 950, likes: 67 },
                        { id: 25, title: '现代前端工程化', publishDate: '2024-01-01', views: 1180, likes: 82 }
                    ]
                },
                {
                    id: 6,
                    name: '技术管理',
                    description: '团队管理、项目管理、技术决策',
                    icon: 'fas fa-users-cog',
                    color: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                    articleCount: 5,
                    articles: [
                        { id: 26, title: '技术团队管理心得', publishDate: '2024-01-10', views: 1420, likes: 108 },
                        { id: 27, title: '敏捷开发实践经验', publishDate: '2024-01-07', views: 1150, likes: 81 },
                        { id: 28, title: '代码审查最佳实践', publishDate: '2024-01-05', views: 980, likes: 69 },
                        { id: 29, title: '技术选型决策框架', publishDate: '2024-01-03', views: 1280, likes: 92 },
                        { id: 30, title: '工程师职业发展', publishDate: '2023-12-30', views: 1560, likes: 125 }
                    ]
                }
            ];
            
            this.renderCategories(mockCategories);
            
        } catch (error) {
            console.error('Failed to load categories:', error);
            this.showError('categoriesGrid', '加载分类失败，请稍后重试');
        }
    }
    
    async loadFeaturedArticles() {
        try {
            this.showLoading('featuredGrid');
            
            // Mock featured articles
            const mockFeatured = [
                {
                    id: 1,
                    title: 'Spring Boot 3.0 新特性详解',
                    summary: '深入解析 Spring Boot 3.0 的核心新特性，包括原生镜像支持、可观测性增强、性能优化等重要更新。',
                    category: { name: 'Java开发', color: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)' },
                    publishDate: '2024-01-15',
                    views: 1250,
                    likes: 89,
                    comments: 23,
                    featured: true,
                    icon: 'fab fa-java'
                },
                {
                    id: 11,
                    title: '分布式系统一致性解决方案',
                    summary: '探讨分布式系统中的一致性问题，分析 CAP 定理、BASE 理论，介绍常见的一致性解决方案。',
                    category: { name: '系统架构', color: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)' },
                    publishDate: '2024-01-13',
                    views: 1450,
                    likes: 105,
                    comments: 34,
                    featured: true,
                    icon: 'fas fa-sitemap'
                },
                {
                    id: 16,
                    title: 'Docker 容器化最佳实践',
                    summary: '从基础到进阶，全面介绍 Docker 容器化技术的最佳实践，包括镜像优化、安全配置、生产部署等。',
                    category: { name: 'DevOps运维', color: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)' },
                    publishDate: '2024-01-12',
                    views: 1350,
                    likes: 96,
                    comments: 28,
                    featured: true,
                    icon: 'fab fa-docker'
                }
            ];
            
            this.renderFeaturedArticles(mockFeatured);
            
        } catch (error) {
            console.error('Failed to load featured articles:', error);
            this.showError('featuredGrid', '加载精选文章失败，请稍后重试');
        }
    }
    
    renderCategories(categories) {
        const container = document.getElementById('categoriesGrid');
        if (!container) return;
        
        container.innerHTML = categories.map(category => `
            <div class="category-card" onclick="articlesManager.viewCategory(${category.id})">
                <div class="category-header">
                    <div class="category-icon" style="background: ${category.color}">
                        <i class="${category.icon}"></i>
                    </div>
                    <div class="category-info">
                        <h3>${category.name}</h3>
                        <p>${category.description}</p>
                    </div>
                </div>
                <div class="category-articles">
                    <ul class="article-list">
                        ${category.articles.slice(0, 5).map(article => `
                            <li class="article-item" onclick="event.stopPropagation(); articlesManager.viewArticle(${article.id})">
                                <div class="article-title">${article.title}</div>
                                <div class="article-meta">
                                    <span><i class="fas fa-calendar"></i> ${this.formatDate(article.publishDate)}</span>
                                    <div class="article-stats">
                                        <span><i class="fas fa-eye"></i> ${this.formatNumber(article.views)}</span>
                                        <span><i class="fas fa-heart"></i> ${article.likes}</span>
                                    </div>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                    ${category.articles.length > 5 ? `
                        <div class="view-more">
                            <a href="#" class="view-more-btn" onclick="event.stopPropagation(); articlesManager.viewCategory(${category.id})">
                                <span>查看全部 ${category.articleCount} 篇</span>
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
    
    renderFeaturedArticles(articles) {
        const container = document.getElementById('featuredGrid');
        if (!container) return;
        
        container.innerHTML = articles.map(article => `
            <div class="featured-card" onclick="articlesManager.viewArticle(${article.id})">
                <div class="featured-image" style="background: ${article.category.color}">
                    <i class="${article.icon}"></i>
                    ${article.featured ? '<div class="featured-badge">精选</div>' : ''}
                </div>
                <div class="featured-content">
                    <div class="featured-meta">
                        <span class="featured-category" style="background: ${article.category.color}">
                            ${article.category.name}
                        </span>
                        <span class="featured-date">${this.formatDate(article.publishDate)}</span>
                    </div>
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                    <div class="featured-stats">
                        <div class="featured-stats-left">
                            <span><i class="fas fa-eye"></i> ${this.formatNumber(article.views)}</span>
                            <span><i class="fas fa-heart"></i> ${article.likes}</span>
                            <span><i class="fas fa-comment"></i> ${article.comments}</span>
                        </div>
                        <a href="#" class="read-more" onclick="event.stopPropagation(); articlesManager.viewArticle(${article.id})">
                            阅读全文 <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    handleSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        this.searchQuery = searchInput.value.trim();
        if (this.searchQuery) {
            // Redirect to search results page or filter current results
            window.location.href = `search.html?q=${encodeURIComponent(this.searchQuery)}`;
        }
    }
    
    viewCategory(categoryId) {
        // Navigate to category page
        window.location.href = `category.html?id=${categoryId}`;
    }
    
    viewArticle(articleId) {
        // Navigate to article detail page
        window.location.href = `article.html?id=${articleId}`;
    }
    
    showLoading(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                </div>
            `;
        }
    }
    
    showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${message}</p>
                </div>
            `;
        }
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '昨天';
        if (diffDays < 7) return `${diffDays}天前`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
        
        return date.toLocaleDateString('zh-CN');
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.articlesManager = new ArticlesManager();
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
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
});