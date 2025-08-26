-- Article System Database Schema
USE portfolio_db;

-- Create article categories table
CREATE TABLE IF NOT EXISTS article_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '分类名称',
    slug VARCHAR(100) NOT NULL COMMENT 'URL友好的分类标识',
    description TEXT COMMENT '分类描述',
    icon_class VARCHAR(50) COMMENT '图标CSS类',
    color VARCHAR(20) COMMENT '分类颜色',
    display_order INT DEFAULT 0 COMMENT '显示顺序',
    is_active BOOLEAN DEFAULT TRUE COMMENT '是否启用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_categories_slug (slug),
    INDEX idx_categories_active_order (is_active, display_order)
) COMMENT '文章分类表';

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL COMMENT '文章标题',
    slug VARCHAR(200) NOT NULL COMMENT 'URL友好的文章标识',
    summary TEXT COMMENT '文章摘要',
    content LONGTEXT NOT NULL COMMENT '文章内容(Markdown格式)',
    cover_image VARCHAR(500) COMMENT '封面图片URL',
    category_id BIGINT NOT NULL COMMENT '分类ID',
    author VARCHAR(100) DEFAULT '刘白' COMMENT '作者',
    view_count INT DEFAULT 0 COMMENT '浏览次数',
    like_count INT DEFAULT 0 COMMENT '点赞次数',
    comment_count INT DEFAULT 0 COMMENT '评论次数',
    is_featured BOOLEAN DEFAULT FALSE COMMENT '是否精选',
    is_published BOOLEAN DEFAULT TRUE COMMENT '是否发布',
    published_at TIMESTAMP NULL COMMENT '发布时间',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES article_categories(id) ON DELETE RESTRICT,
    UNIQUE KEY uk_articles_slug (slug),
    INDEX idx_articles_category (category_id),
    INDEX idx_articles_published (is_published, published_at),
    INDEX idx_articles_featured (is_featured),
    INDEX idx_articles_views (view_count),
    FULLTEXT KEY ft_articles_content (title, summary, content)
) COMMENT '文章表';

-- Create article tags table
CREATE TABLE IF NOT EXISTS article_tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL COMMENT '标签名称',
    slug VARCHAR(50) NOT NULL COMMENT 'URL友好的标签标识',
    color VARCHAR(20) COMMENT '标签颜色',
    use_count INT DEFAULT 0 COMMENT '使用次数',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_tags_slug (slug),
    INDEX idx_tags_use_count (use_count)
) COMMENT '文章标签表';

-- Create article_tag_relations table
CREATE TABLE IF NOT EXISTS article_tag_relations (
    article_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES article_tags(id) ON DELETE CASCADE
) COMMENT '文章标签关联表';

-- Insert sample categories
INSERT IGNORE INTO article_categories (name, slug, description, icon_class, color, display_order) VALUES
('Java开发', 'java', 'Java语言相关的技术文章，包括Spring Boot、JVM优化等', 'fab fa-java', '#f89820', 1),
('数据库技术', 'database', 'MySQL、Redis等数据库相关的技术分享', 'fas fa-database', '#336791', 2),
('系统架构', 'architecture', '微服务架构、分布式系统设计等架构相关内容', 'fas fa-sitemap', '#28a745', 3),
('前端技术', 'frontend', 'Vue.js、React等前端技术分享', 'fab fa-vuejs', '#4fc08d', 4),
('DevOps运维', 'devops', 'Docker、Kubernetes、CI/CD等运维相关技术', 'fas fa-cogs', '#326ce5', 5),
('编程心得', 'thoughts', '编程经验分享、职场感悟等个人心得', 'fas fa-lightbulb', '#ffc107', 6);

-- Insert sample tags
INSERT IGNORE INTO article_tags (name, slug, color) VALUES
('Spring Boot', 'spring-boot', '#6db33f'),
('MySQL', 'mysql', '#4479a1'),
('Redis', 'redis', '#dc382d'),
('Vue.js', 'vuejs', '#4fc08d'),
('Docker', 'docker', '#2496ed'),
('微服务', 'microservices', '#ff6b6b'),
('性能优化', 'performance', '#f39c12'),
('最佳实践', 'best-practices', '#9b59b6');

-- Insert sample articles
INSERT IGNORE INTO articles (title, slug, summary, content, category_id, view_count, like_count, comment_count, is_featured, published_at) VALUES
('Spring Boot性能优化实战指南', 'spring-boot-performance-optimization', '深入分析Spring Boot应用的性能瓶颈，提供实用的优化方案和最佳实践。', '# Spring Boot性能优化实战指南

## 前言
在现代Java开发中，Spring Boot已经成为了构建企业级应用的首选框架。然而，随着业务的增长和用户量的增加，应用的性能问题逐渐凸显。本文将从多个维度分析Spring Boot应用的性能瓶颈，并提供实用的优化方案。

## 1. JVM参数优化

### 1.1 堆内存配置
```bash
-Xms2g -Xmx2g -XX:NewRatio=1 -XX:SurvivorRatio=8
```

### 1.2 垃圾收集器选择
```bash
-XX:+UseG1GC -XX:MaxGCPauseMillis=200
```

## 2. 数据库连接池优化

### 2.1 HikariCP配置
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

## 3. 缓存策略

### 3.1 Redis缓存配置
```java
@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
        
        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .build();
    }
}
```

## 4. 异步处理

### 4.1 @Async注解使用
```java
@Service
public class EmailService {
    
    @Async
    public CompletableFuture<Void> sendEmail(String to, String subject, String content) {
        // 异步发送邮件逻辑
        return CompletableFuture.completedFuture(null);
    }
}
```

## 5. 监控和诊断

### 5.1 Actuator配置
```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always
```

## 总结
通过以上优化措施，可以显著提升Spring Boot应用的性能。在实际应用中，需要根据具体的业务场景和系统负载情况，选择合适的优化策略。

记住，性能优化是一个持续的过程，需要不断地监控、分析和调整。', 1, 2300, 156, 23, TRUE, '2024-01-15 10:00:00'),

('MySQL索引优化策略详解', 'mysql-index-optimization', '从原理到实践，全面解析MySQL索引的设计和优化技巧，提升数据库查询性能。', '# MySQL索引优化策略详解

## 索引基础知识

### 什么是索引
索引是数据库中用于快速查找数据的数据结构，类似于书籍的目录。

### 索引类型
- **B+Tree索引**：最常用的索引类型
- **Hash索引**：适用于等值查询
- **全文索引**：用于文本搜索
- **空间索引**：用于地理位置数据

## 索引设计原则

### 1. 选择性原则
```sql
-- 查看列的选择性
SELECT COUNT(DISTINCT column_name) / COUNT(*) AS selectivity
FROM table_name;
```

### 2. 最左前缀原则
```sql
-- 复合索引示例
CREATE INDEX idx_user_info ON users(age, city, name);

-- 可以使用索引的查询
SELECT * FROM users WHERE age = 25;
SELECT * FROM users WHERE age = 25 AND city = "北京";
SELECT * FROM users WHERE age = 25 AND city = "北京" AND name = "张三";

-- 无法使用索引的查询
SELECT * FROM users WHERE city = "北京";
SELECT * FROM users WHERE name = "张三";
```

## 索引优化实践

### 1. 避免索引失效
```sql
-- 错误示例：使用函数
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- 正确示例
SELECT * FROM users WHERE created_at >= "2024-01-01" AND created_at < "2025-01-01";
```

### 2. 覆盖索引优化
```sql
-- 创建覆盖索引
CREATE INDEX idx_user_cover ON users(age, name, email);

-- 查询只需要索引中的列
SELECT name, email FROM users WHERE age = 25;
```

## 性能监控

### 1. 使用EXPLAIN分析
```sql
EXPLAIN SELECT * FROM users WHERE age = 25;
```

### 2. 慢查询日志
```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = 1;
SET GLOBAL long_query_time = 2;
```

## 总结
索引优化是数据库性能调优的重要手段，需要根据具体的查询模式和数据特点来设计合适的索引策略。', 2, 1800, 124, 18, FALSE, '2024-01-10 14:30:00'),

('微服务架构设计原则与实践', 'microservices-architecture-principles', '探讨微服务架构的设计原则和实施策略，避免常见的架构陷阱。', '# 微服务架构设计原则与实践

## 微服务架构概述

微服务架构是一种将单一应用程序开发为一组小型服务的方法，每个服务运行在自己的进程中，并使用轻量级机制（通常是HTTP资源API）进行通信。

## 设计原则

### 1. 单一职责原则
每个微服务应该只负责一个业务功能，具有高内聚、低耦合的特点。

### 2. 服务自治
- 独立部署
- 独立扩展
- 独立技术栈
- 独立数据存储

### 3. 去中心化治理
```yaml
# 服务注册与发现配置
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true
```

## 技术实现

### 1. Spring Cloud生态
```java
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
```

### 2. 服务间通信
```java
@FeignClient(name = "order-service")
public interface OrderServiceClient {
    
    @GetMapping("/orders/{userId}")
    List<Order> getOrdersByUserId(@PathVariable Long userId);
}
```

### 3. 配置中心
```yaml
spring:
  cloud:
    config:
      uri: http://config-server:8888
      profile: dev
      label: master
```

## 数据管理

### 1. 数据库分离
每个微服务拥有自己的数据库，避免数据耦合。

### 2. 分布式事务
```java
@GlobalTransactional
public void createOrder(OrderDTO orderDTO) {
    // 创建订单
    orderService.createOrder(orderDTO);
    
    // 扣减库存
    inventoryService.reduceStock(orderDTO.getProductId(), orderDTO.getQuantity());
    
    // 扣减余额
    accountService.deductBalance(orderDTO.getUserId(), orderDTO.getAmount());
}
```

## 监控与治理

### 1. 链路追踪
```yaml
spring:
  zipkin:
    base-url: http://zipkin-server:9411
  sleuth:
    sampler:
      probability: 1.0
```

### 2. 熔断降级
```java
@Component
public class OrderServiceFallback implements OrderServiceClient {
    
    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return Collections.emptyList();
    }
}
```

## 部署策略

### 1. 容器化部署
```dockerfile
FROM openjdk:8-jre-alpine
COPY target/user-service.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### 2. Kubernetes编排
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 8080
```

## 总结
微服务架构虽然带来了很多好处，但也增加了系统的复杂性。在实施微服务架构时，需要充分考虑团队的技术能力、业务复杂度和运维成本。', 3, 3100, 234, 45, TRUE, '2024-01-05 09:15:00');

-- Insert article-tag relations
INSERT IGNORE INTO article_tag_relations (article_id, tag_id) VALUES
(1, 1), (1, 7), (1, 8),  -- Spring Boot性能优化 -> Spring Boot, 性能优化, 最佳实践
(2, 2), (2, 7), (2, 8),  -- MySQL索引优化 -> MySQL, 性能优化, 最佳实践
(3, 6), (3, 1), (3, 8);  -- 微服务架构 -> 微服务, Spring Boot, 最佳实践