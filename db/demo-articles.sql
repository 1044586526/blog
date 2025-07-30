-- Demo Article Data for Testing
-- Insert demo categories
INSERT INTO article_categories (name, slug, description, icon, color, display_order, is_active) VALUES
('Java Development', 'java-development', 'Java programming, Spring framework, and enterprise development', 'fab fa-java', '#f89820', 1, true),
('Database Technology', 'database', 'MySQL, Redis, MongoDB and database optimization', 'fas fa-database', '#336791', 2, true),
('Microservices', 'microservices', 'Microservice architecture, Spring Cloud, distributed systems', 'fas fa-cubes', '#6cc04a', 3, true),
('DevOps & Cloud', 'devops', 'Docker, Kubernetes, CI/CD, cloud deployment', 'fas fa-cloud', '#326ce5', 4, true),
('Performance Optimization', 'performance', 'Application performance tuning and optimization', 'fas fa-tachometer-alt', '#ff6b6b', 5, true),
('Architecture Design', 'architecture', 'System architecture, design patterns, best practices', 'fas fa-sitemap', '#4ecdc4', 6, true);

-- Insert demo tags
INSERT INTO article_tags (name, slug, color) VALUES
('Spring Boot', 'spring-boot', '#6db33f'),
('Java', 'java', '#f89820'),
('MySQL', 'mysql', '#00758f'),
('Redis', 'redis', '#dc382d'),
('Docker', 'docker', '#2496ed'),
('Kubernetes', 'kubernetes', '#326ce5'),
('Microservices', 'microservices', '#6cc04a'),
('Performance', 'performance', '#ff6b6b'),
('Security', 'security', '#28a745'),
('Best Practices', 'best-practices', '#6f42c1');

-- Insert demo articles
INSERT INTO articles (title, slug, summary, content, category_id, author_name, author_avatar, publish_date, read_time, views, likes, comments, is_published, is_featured) VALUES
('Spring Boot 3.0 New Features Deep Dive', 'spring-boot-3-new-features', 'In-depth analysis of Spring Boot 3.0 core new features, including native image support, observability enhancements, performance optimizations and other important updates.', 
'<h2>Introduction</h2><p>Spring Boot 3.0 represents a major milestone in the Spring ecosystem...</p>', 
1, 'DaDa', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cdefs%3E%3ClinearGradient id=\'grad1\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23667eea;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23764ba2;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'90\' fill=\'url(%23grad1)\'/%3E%3Ctext x=\'100\' y=\'120\' text-anchor=\'middle\' fill=\'white\' font-size=\'60\' font-weight=\'bold\'%3EDa%3C/text%3E%3C/svg%3E', 
'2024-01-15', 8, 1250, 89, 23, true, true),

('MySQL Performance Optimization Guide', 'mysql-performance-optimization', 'Comprehensive guide to MySQL performance optimization, covering indexing strategies, query optimization, and configuration tuning.', 
'<h2>Index Optimization</h2><p>Proper indexing is crucial for MySQL performance...</p>', 
2, 'DaDa', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cdefs%3E%3ClinearGradient id=\'grad1\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23667eea;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23764ba2;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'90\' fill=\'url(%23grad1)\'/%3E%3Ctext x=\'100\' y=\'120\' text-anchor=\'middle\' fill=\'white\' font-size=\'60\' font-weight=\'bold\'%3EDa%3C/text%3E%3C/svg%3E', 
'2024-01-12', 12, 980, 67, 18, true, false),

('Microservice Architecture Design Patterns', 'microservice-design-patterns', 'Explore common design patterns and best practices for building scalable microservice architectures.', 
'<h2>Service Discovery</h2><p>Service discovery is a fundamental pattern in microservices...</p>', 
3, 'DaDa', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cdefs%3E%3ClinearGradient id=\'grad1\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23667eea;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23764ba2;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'90\' fill=\'url(%23grad1)\'/%3E%3Ctext x=\'100\' y=\'120\' text-anchor=\'middle\' fill=\'white\' font-size=\'60\' font-weight=\'bold\'%3EDa%3C/text%3E%3C/svg%3E', 
'2024-01-10', 15, 1560, 124, 31, true, true),

('Docker Container Best Practices', 'docker-best-practices', 'Essential Docker best practices for building efficient, secure, and maintainable container images.', 
'<h2>Image Optimization</h2><p>Creating efficient Docker images is crucial for deployment...</p>', 
4, 'DaDa', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cdefs%3E%3ClinearGradient id=\'grad1\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23667eea;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23764ba2;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'90\' fill=\'url(%23grad1)\'/%3E%3Ctext x=\'100\' y=\'120\' text-anchor=\'middle\' fill=\'white\' font-size=\'60\' font-weight=\'bold\'%3EDa%3C/text%3E%3C/svg%3E', 
'2024-01-08', 10, 890, 56, 12, true, false),

('Java 17 Performance Improvements', 'java-17-performance', 'Explore the performance improvements and new features introduced in Java 17 LTS.', 
'<h2>JVM Enhancements</h2><p>Java 17 brings significant JVM improvements...</p>', 
5, 'DaDa', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cdefs%3E%3ClinearGradient id=\'grad1\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23667eea;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23764ba2;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'90\' fill=\'url(%23grad1)\'/%3E%3Ctext x=\'100\' y=\'120\' text-anchor=\'middle\' fill=\'white\' font-size=\'60\' font-weight=\'bold\'%3EDa%3C/text%3E%3C/svg%3E', 
'2024-01-05', 9, 1120, 78, 19, true, false),

('Clean Architecture in Spring Boot', 'clean-architecture-spring-boot', 'Implementing clean architecture principles in Spring Boot applications for better maintainability.', 
'<h2>Layered Architecture</h2><p>Clean architecture promotes separation of concerns...</p>', 
6, 'DaDa', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cdefs%3E%3ClinearGradient id=\'grad1\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23667eea;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23764ba2;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'90\' fill=\'url(%23grad1)\'/%3E%3Ctext x=\'100\' y=\'120\' text-anchor=\'middle\' fill=\'white\' font-size=\'60\' font-weight=\'bold\'%3EDa%3C/text%3E%3C/svg%3E', 
'2024-01-03', 11, 750, 45, 8, true, false);

-- Insert article-tag relationships
INSERT INTO article_tags_relation (article_id, tag_id) VALUES
(1, 1), (1, 2), (1, 8), (1, 10),  -- Spring Boot 3.0 article
(2, 3), (2, 8), (2, 10),          -- MySQL Performance article
(3, 7), (3, 10), (3, 6),          -- Microservice article
(4, 5), (4, 10),                  -- Docker article
(5, 2), (5, 8),                   -- Java 17 article
(6, 1), (6, 2), (6, 10);          -- Clean Architecture article