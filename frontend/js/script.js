// 现代化JavaScript - 哒哒的个人网站

// DOM元素
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const navItems = document.querySelectorAll('.nav-item');
const backToTopBtn = document.querySelector('.back-to-top');

// 主题切换功能
function initThemeToggle() {
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        updateThemeIcon(true);
    }

    // 主题切换事件
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            
            // 保存主题设置
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // 更新图标
            updateThemeIcon(isLight);
            
            // 添加切换动画
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
}

// 更新主题图标
function updateThemeIcon(isLight) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// 导航栏滚动效果
function initNavigation() {
    // 平滑滚动
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 更新活动状态
                updateActiveNav(item);
            }
        });
    });

    // 滚动时更新导航状态
    window.addEventListener('scroll', throttle(updateNavOnScroll, 100));
}

// 更新活动导航项
function updateActiveNav(activeItem) {
    navItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');
}

// 滚动时更新导航状态
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            const activeNav = document.querySelector(`.nav-item[href="#${sectionId}"]`);
            if (activeNav) {
                updateActiveNav(activeNav);
            }
        }
    });
}

// 数字计数动画
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2秒
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };

    // 使用Intersection Observer来触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// 打字机效果
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid';
        element.style.animation = 'blink 1s infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }
        };
        
        // 延迟开始打字效果
        setTimeout(typeWriter, 1000);
    });
}

// 滚动动画
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        if (element.classList.contains('fade-in-up')) {
            element.style.transform = 'translateY(30px)';
        } else if (element.classList.contains('fade-in-left')) {
            element.style.transform = 'translateX(-30px)';
        } else if (element.classList.contains('fade-in-right')) {
            element.style.transform = 'translateX(30px)';
        }
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// 返回顶部按钮
function initBackToTop() {
    if (!backToTopBtn) {
        // 创建返回顶部按钮
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(btn);
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 滚动显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });
    }
}

// 联系表单处理
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // 显示加载状态
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            try {
                // 模拟发送请求
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // 显示成功消息
                showNotification('消息发送成功！我会尽快回复您。', 'success');
                contactForm.reset();
                
            } catch (error) {
                console.error('发送失败:', error);
                showNotification('发送失败，请稍后重试。', 'error');
            } finally {
                // 恢复按钮状态
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 样式
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    // 根据类型设置背景色
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 卡片悬停效果
function initCardEffects() {
    const cards = document.querySelectorAll('.media-card, .product-card, .course-card, .source-card, .opensource-card, .article-card, .group-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 粒子背景效果
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            ctx.fill();
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// 工具函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 懒加载图片
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 滚动指示器
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#media');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // 滚动时隐藏指示器
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// 技能标签动画
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('fade-in-up');
    });
}

// 媒体卡片统计动画
function initMediaStats() {
    const mediaCards = document.querySelectorAll('.media-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const followers = entry.target.querySelector('.followers');
                if (followers && !followers.classList.contains('animated')) {
                    followers.classList.add('animated');
                    
                    // 添加数字增长动画
                    const text = followers.textContent;
                    const number = parseFloat(text.replace(/[^\d.]/g, ''));
                    const unit = text.replace(/[\d.]/g, '');
                    
                    let current = 0;
                    const increment = number / 50;
                    
                    const animate = () => {
                        current += increment;
                        if (current < number) {
                            followers.textContent = current.toFixed(1) + unit;
                            requestAnimationFrame(animate);
                        } else {
                            followers.textContent = text;
                        }
                    };
                    
                    animate();
                }
            }
        });
    }, { threshold: 0.5 });
    
    mediaCards.forEach(card => observer.observe(card));
}

// 媒体模块展开/收起功能
function initMediaToggle() {
    const mediaToggle = document.getElementById('mediaToggle');
    const mediaGrid = document.querySelector('.media-grid');
    
    if (mediaToggle && mediaGrid) {
        // 检查媒体卡片数量
        const mediaCards = mediaGrid.querySelectorAll('.media-card');
        
        if (mediaCards.length <= 14) {
            // 如果卡片数量不超过14个，隐藏切换按钮
            mediaToggle.style.display = 'none';
            mediaGrid.classList.remove('collapsed');
            return;
        }
        
        // 初始状态设为收起
        mediaGrid.classList.add('collapsed');
        
        mediaToggle.addEventListener('click', () => {
            const isCollapsed = mediaGrid.classList.contains('collapsed');
            const toggleText = mediaToggle.querySelector('span');
            const toggleIcon = mediaToggle.querySelector('i');
            
            if (isCollapsed) {
                // 展开
                mediaGrid.classList.remove('collapsed');
                mediaGrid.classList.add('expanded');
                toggleText.textContent = '收起平台';
                toggleIcon.style.transform = 'rotate(180deg)';
                mediaToggle.classList.add('expanded');
            } else {
                // 收起
                mediaGrid.classList.remove('expanded');
                mediaGrid.classList.add('collapsed');
                toggleText.textContent = '查看全部平台';
                toggleIcon.style.transform = 'rotate(0deg)';
                mediaToggle.classList.remove('expanded');
                
                // 滚动到媒体区域顶部
                document.querySelector('#media').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// 初始化所有功能
function init() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    try {
        initThemeToggle();
        initNavigation();
        initCounterAnimation();
        initTypewriterEffect();
        initScrollAnimations();
        initBackToTop();
        initContactForm();
        initCardEffects();
        initParticleBackground();
        initLazyLoading();
        initScrollIndicator();
        initSkillTags();
        initMediaStats();
        initMediaToggle();
        
        console.log('🎉 网站初始化完成！');
    } catch (error) {
        console.error('初始化错误:', error);
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// 导出函数供其他脚本使用
window.PortfolioApp = {
    showNotification,
    updateTheme: (theme) => {
        if (theme === 'light') {
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
        }
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme === 'light');
    }
};