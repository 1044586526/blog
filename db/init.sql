-- Portfolio Database Initialization Script
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_class VARCHAR(50),
    proficiency_level INT,
    display_order INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_skills_name (name)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    display_order INT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    start_date TIMESTAMP NULL,
    end_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_projects_title (title)
);

-- Create project_technologies table
CREATE TABLE IF NOT EXISTS project_technologies (
    project_id BIGINT NOT NULL,
    technology VARCHAR(100) NOT NULL,
    PRIMARY KEY (project_id, technology),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    is_replied BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_contacts_created_at (created_at),
    INDEX idx_contacts_email (email),
    INDEX idx_contacts_is_read (is_read),
    INDEX idx_contacts_is_replied (is_replied)
);

-- Insert default skills data
INSERT IGNORE INTO skills (name, description, icon_class, proficiency_level, display_order, is_active) VALUES
('Java & Spring Boot', 'Backend development with Spring Boot, Spring Security, and microservices architecture.', 'fab fa-java', 5, 1, TRUE),
('Frontend Development', 'Modern frontend development with React, Vue.js, and responsive design principles.', 'fab fa-react', 4, 2, TRUE),
('Database Management', 'MySQL, PostgreSQL, Redis, and database optimization techniques.', 'fas fa-database', 4, 3, TRUE),
('Cloud & DevOps', 'AWS, Docker, Kubernetes, and CI/CD pipeline implementation.', 'fas fa-cloud', 3, 4, TRUE),
('API Development', 'RESTful APIs, GraphQL, and microservices architecture design.', 'fas fa-code', 5, 5, TRUE),
('System Architecture', 'Scalable system design, performance optimization, and best practices.', 'fas fa-sitemap', 4, 6, TRUE);

-- Insert default projects data
INSERT IGNORE INTO projects (title, description, github_url, live_url, is_featured, display_order, is_active) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution with Spring Boot backend, React frontend, and MySQL database.', 'https://github.com/yicode/ecommerce', 'https://demo.yicode.tech/ecommerce', TRUE, 1, TRUE),
('Task Management System', 'Collaborative task management application with real-time updates and team collaboration features.', 'https://github.com/yicode/taskmanager', 'https://demo.yicode.tech/tasks', TRUE, 2, TRUE),
('Blog CMS', 'Content management system for blogs with admin panel, SEO optimization, and responsive design.', 'https://github.com/yicode/blogcms', 'https://demo.yicode.tech/blog', FALSE, 3, TRUE);

-- Insert project technologies
INSERT IGNORE INTO project_technologies (project_id, technology) VALUES
(1, 'Spring Boot'), (1, 'React'), (1, 'MySQL'), (1, 'Redis'),
(2, 'Java'), (2, 'Vue.js'), (2, 'WebSocket'), (2, 'PostgreSQL'),
(3, 'Spring Boot'), (3, 'Thymeleaf'), (3, 'MySQL'), (3, 'Bootstrap');