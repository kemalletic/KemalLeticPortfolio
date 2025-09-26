// Section Transition Animation - Paper Slide Effect
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const about = document.querySelector('.about');
    
    if (!hero || !about) return;
    
    // Set initial state for about section
    about.classList.add('initial');
    
    let isTransitioning = false;
    let transitionThreshold = 100; // pixels from about section to trigger transition
    
    function handleScrollTransition() {
        const heroRect = hero.getBoundingClientRect();
        const aboutRect = about.getBoundingClientRect();
        
        // Check if we're scrolling down and approaching the about section
        if (window.scrollY > heroRect.height - transitionThreshold && !isTransitioning) {
            isTransitioning = true;
            
            // Add slide-up class to hero
            hero.classList.add('slide-up');
            
            // Remove initial class and add slide-in class to about
            setTimeout(() => {
                about.classList.remove('initial');
                about.classList.add('slide-in');
            }, 200);
            
        } 
        // Check if we're scrolling back up to hero section
        else if (window.scrollY < heroRect.height - transitionThreshold * 2 && isTransitioning) {
            isTransitioning = false;
            
            // Remove slide-up class from hero
            hero.classList.remove('slide-up');
            
            // Add initial class back to about
            about.classList.remove('slide-in');
            about.classList.add('initial');
        }
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScrollTransition, 10);
    });
    
    // Initial check
    handleScrollTransition();
});

// Particle System for Hero Section
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 20) + 's';
        
        // Random size variation
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Add click event handler for hamburger button
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    } else {
        console.warn('Navigation elements not found:', { navToggle, navMenu });
    }
});

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target) && 
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = 80; // Height of the fixed navbar
            const targetTop = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.body.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Progress Indicator - Fresh Implementation
document.addEventListener('DOMContentLoaded', () => {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #7c3aed);
        transform-origin: left;
        transform: scaleX(0);
        z-index: 10000;
        transition: transform 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    // Scroll progress function
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (scrollHeight <= 0) {
            progressBar.style.transform = 'scaleX(0)';
            return;
        }
        
        const scrollPercent = scrollTop / scrollHeight;
        const clampedPercent = Math.min(Math.max(scrollPercent, 0), 1);
        
        progressBar.style.transform = `scaleX(${clampedPercent})`;
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initial call
    updateScrollProgress();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .contact-info');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Submit to Formspree
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Smart typing animation that handles HTML tags properly
function smartTypeWriter(element, htmlText, speed = 100) {
    // Extract the text content without HTML tags for typing
    const textContent = htmlText.replace(/<[^>]*>/g, '');
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < textContent.length) {
            // Build the current text with HTML structure
            let currentText = textContent.substring(0, i + 1);
            
            // Reconstruct the HTML with highlighting
            if (currentText.includes('Kemal Letić')) {
                const beforeName = currentText.substring(0, currentText.indexOf('Kemal Letić'));
                const namePart = currentText.substring(currentText.indexOf('Kemal Letić'));
                const nameLength = Math.min(namePart.length, 'Kemal Letić'.length);
                const typedName = 'Kemal Letić'.substring(0, nameLength);
                
                element.innerHTML = beforeName + `<span class="highlight">${typedName}</span>`;
            } else {
                element.innerHTML = currentText;
            }
            
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Typing animation disabled - text displays immediately
        // const originalText = heroTitle.innerHTML;
        // setTimeout(() => {
        //     smartTypeWriter(heroTitle, originalText, 50);
        // }, 1000);
    }
});

// Add project functionality
document.addEventListener('DOMContentLoaded', () => {
    const addProjectCard = document.querySelector('.add-project');
    
    if (addProjectCard) {
        addProjectCard.addEventListener('click', () => {
            const projectTitle = prompt('Enter project title:');
            if (projectTitle) {
                const projectDescription = prompt('Enter project description:');
                const projectTech = prompt('Enter technologies (comma-separated):');
                
                if (projectDescription && projectTech) {
                    addNewProject(projectTitle, projectDescription, projectTech.split(',').map(tech => tech.trim()));
                }
            }
        });
    }
});

function addNewProject(title, description, technologies) {
    const projectsGrid = document.querySelector('.projects-grid');
    const addProjectCard = document.querySelector('.add-project');
    
    const newProjectCard = document.createElement('div');
    newProjectCard.className = 'project-card';
    newProjectCard.innerHTML = `
        <div class="project-image">
            <div class="project-placeholder">
                <i class="fas fa-image"></i>
            </div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${title}</h3>
            <p class="project-description">${description}</p>
            <div class="project-tech">
                ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="#" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href="#" class="project-link">
                    <i class="fab fa-github"></i> Source Code
                </a>
            </div>
        </div>
    `;
    
    // Insert before the add project card
    projectsGrid.insertBefore(newProjectCard, addProjectCard);
    
    // Animate the new card
    newProjectCard.style.opacity = '0';
    newProjectCard.style.transform = 'translateY(30px)';
    setTimeout(() => {
        newProjectCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        newProjectCard.style.opacity = '1';
        newProjectCard.style.transform = 'translateY(0)';
    }, 100);
    
    showNotification('Project added successfully!', 'success');
}

// Parallax effect for hero section - DISABLED
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         const rate = scrolled * -0.5;
//         hero.style.transform = `translateY(${rate}px)`;
//     }
// });

// Skills animation on scroll
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        const skillItems = category.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
        skillsObserver.observe(category);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Dark Mode Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);

    // Update theme toggle icon
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    // Initialize theme icon
    updateThemeIcon(currentTheme);

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Update navbar background immediately
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            if (newTheme === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (newTheme === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
        
        // Add a subtle animation to the toggle button
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        // Close mobile menu when clicking on theme toggle
        if (window.innerWidth <= 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // Detect system theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (!localStorage.getItem('theme')) {
            body.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Media Modal Functionality (Images & Videos)
let currentImageIndex = 0;
let imageGallery = [];

// Define the image gallery for Student Mental Health Tracker
const studentMentalHealthImages = [
    {
        src: 'images/StudentMentalHealthTracker.png',
        caption: 'Student Mental Health Tracker - Main Dashboard',
        type: 'image'
    },
    {
        src: 'images/login.png',
        caption: 'Student Mental Health Tracker - Login Interface',
        type: 'image'
    },
    {
        src: 'images/studentdashboard2.png',
        caption: 'Student Mental Health Tracker - Student Dashboard',
        type: 'image'
    },
    {
        src: 'images/psychodashboard1.png',
        caption: 'Student Mental Health Tracker - Psychologist Dashboard',
        type: 'image'
    },
    {
        src: 'images/psychodashboard2.png',
        caption: 'Student Mental Health Tracker - Psychologist Dashboard View 2',
        type: 'image'
    },
    {
        src: 'images/psychodashboard3.png',
        caption: 'Student Mental Health Tracker - Psychologist Dashboard View 3',
        type: 'image'
    },
    {
        src: 'images/chat1.png',
        caption: 'Student Mental Health Tracker - Chat Interface',
        type: 'image'
    },
    {
        src: 'images/chat2.png',
        caption: 'Student Mental Health Tracker - Chat Interface View 2',
        type: 'image'
    },
    {
        src: 'images/call1.png',
        caption: 'Student Mental Health Tracker - Video Call Interface',
        type: 'image'
    },
    {
        src: 'images/call2.png',
        caption: 'Student Mental Health Tracker - Video Call Interface View 2',
        type: 'image'
    },
    {
        src: 'images/call3.png',
        caption: 'Student Mental Health Tracker - Video Call Interface View 3',
        type: 'image'
    },
    {
        src: 'images/studentdashboard1.png',
        caption: 'Student Mental Health Tracker - Student Dashboard View 1',
        type: 'image'
    }
];

// Define the image gallery for HopeChain
const hopechainImages = [
    {
        src: 'images/hopechain1.png',
        caption: 'HopeChain - Main Interface',
        type: 'image'
    },
    {
        src: 'images/hopechain11.png',
        caption: 'HopeChain - Campaign Dashboard',
        type: 'image'
    },
    {
        src: 'images/hopechain111.png',
        caption: 'HopeChain - Additional Interface',
        type: 'image'
    }
];

// Define the image gallery for SSSD
const sssdImages = [
    {
        src: 'images/sssd.png',
        caption: 'SSSD - Main Dashboard',
        type: 'image'
    },
    {
        src: 'images/sssd1.png',
        caption: 'SSSD - Authentication Interface',
        type: 'image'
    },
    {
        src: 'images/sssd2.png',
        caption: 'SSSD - Security Features',
        type: 'image'
    }
];

// Define the image gallery for Book Review Application
const bookreviewImages = [
    {
        src: 'images/bookreview1.png',
        caption: 'Book Review - Main Dashboard',
        type: 'image'
    },
    {
        src: 'images/bookreview2.png',
        caption: 'Book Review - Book Details',
        type: 'image'
    },
    {
        src: 'images/bookreview3.png',
        caption: 'Book Review - User Profile',
        type: 'image'
    },
    {
        src: 'images/bookreview4.png',
        caption: 'Book Review - Authentication',
        type: 'image'
    },
    {
        src: 'images/bookreview5.png',
        caption: 'Book Review - Search & Filter',
        type: 'image'
    },
    {
        src: 'images/bookreview6.png',
        caption: 'Book Review - Admin Dashboard',
        type: 'image'
    }
];

function openMediaModal(src, caption, type) {
    const modal = document.getElementById('mediaModal');
    const modalMedia = document.getElementById('modalMedia');
    const modalCaption = document.getElementById('modalCaption');
    
    // Determine which project this image belongs to and set the correct gallery
    if (src.includes('hopechain')) {
        imageGallery = hopechainImages;
    } else if (src.includes('sssd')) {
        imageGallery = sssdImages;
    } else if (src.includes('bookreview')) {
        imageGallery = bookreviewImages;
    } else {
        imageGallery = studentMentalHealthImages;
    }
    currentImageIndex = imageGallery.findIndex(item => item.src === src);
    
    // Clear previous content
    modalMedia.innerHTML = '';
    
    if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.style.width = '100%';
        video.style.height = 'auto';
        video.style.maxHeight = '80vh';
        video.style.objectFit = 'contain';
        video.style.borderRadius = '8px';
        video.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
        video.style.background = '#000';
        modalMedia.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = caption;
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.maxHeight = '80vh';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '8px';
        img.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
        modalMedia.appendChild(img);
        
        // Add navigation arrows for images
        addNavigationArrows();
    }
    
    modalCaption.textContent = caption;
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleModalKeydown);
}

function addNavigationArrows() {
    const modalMedia = document.getElementById('modalMedia');
    
    // Left arrow
    const leftArrow = document.createElement('div');
    leftArrow.className = 'modal-nav-arrow modal-nav-left';
    leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
    leftArrow.onclick = () => navigateImage(-1);
    modalMedia.appendChild(leftArrow);
    
    // Right arrow
    const rightArrow = document.createElement('div');
    rightArrow.className = 'modal-nav-arrow modal-nav-right';
    rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
    rightArrow.onclick = () => navigateImage(1);
    modalMedia.appendChild(rightArrow);
}

function navigateImage(direction) {
    if (imageGallery.length === 0) return;
    
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex >= imageGallery.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = imageGallery.length - 1;
    }
    
    const currentImage = imageGallery[currentImageIndex];
    const modalMedia = document.getElementById('modalMedia');
    const modalCaption = document.getElementById('modalCaption');
    
    // Update image
    const img = modalMedia.querySelector('img');
    if (img) {
        img.src = currentImage.src;
        img.alt = currentImage.caption;
    }
    
    // Update caption
    modalCaption.textContent = currentImage.caption;
}

function handleModalKeydown(event) {
    const modal = document.getElementById('mediaModal');
    if (modal.style.display === 'block') {
        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                navigateImage(-1);
                break;
            case 'ArrowRight':
                event.preventDefault();
                navigateImage(1);
                break;
            case 'Escape':
                event.preventDefault();
                closeMediaModal();
                break;
        }
    }
}

function closeMediaModal() {
    const modal = document.getElementById('mediaModal');
    const modalMedia = document.getElementById('modalMedia');
    
    // Stop any playing videos
    const videos = modalMedia.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
    
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleModalKeydown);
}

// Close modal when clicking outside the media
document.addEventListener('click', (e) => {
    const modal = document.getElementById('mediaModal');
    if (e.target === modal) {
        closeMediaModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMediaModal();
    }
});

// Project Modal Functionality
function openProjectModal(projectName) {
    if (projectName === 'Student Mental Health Tracker') {
        const modal = document.getElementById('projectModal');
        const title = document.getElementById('projectModalTitle');
        const description = document.getElementById('projectModalDescription');
        
        title.textContent = projectName;
        description.textContent = 'Explore the application through screenshots and video demos';
        
        // Initialize image gallery for keyboard navigation
        imageGallery = studentMentalHealthImages;
        currentImageIndex = 0;
        
        modal.style.display = 'block';
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Initialize tab functionality
        initializeTabNavigation();
    } else if (projectName === 'HopeChain') {
        const modal = document.getElementById('hopechainModal');
        const title = document.getElementById('hopechainModalTitle');
        const description = document.getElementById('hopechainModalDescription');
        
        title.textContent = projectName;
        description.textContent = 'Decentralized crowdfunding platform built on Ethereum blockchain';
        
        // Initialize image gallery for keyboard navigation
        imageGallery = hopechainImages;
        currentImageIndex = 0;
        
        modal.style.display = 'block';
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Initialize tab functionality
        initializeTabNavigation();
    } else if (projectName === 'SSSD') {
        const modal = document.getElementById('sssdModal');
        const title = document.getElementById('sssdModalTitle');
        const description = document.getElementById('sssdModalDescription');
        
        title.textContent = 'Secure Software System Development';
        description.textContent = 'Comprehensive security application with multi-factor authentication and advanced protection';
        
        // Initialize image gallery for keyboard navigation
        imageGallery = sssdImages;
        currentImageIndex = 0;
        
        modal.style.display = 'block';
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Initialize tab functionality
        initializeTabNavigation();
    } else if (projectName === 'BookReview') {
        const modal = document.getElementById('bookreviewModal');
        const title = document.getElementById('bookreviewModalTitle');
        const description = document.getElementById('bookreviewModalDescription');
        
        title.textContent = 'Book Review Application';
        description.textContent = 'Full-stack web application for reviewing and discovering books with Spring Boot and React';
        
        // Initialize image gallery for keyboard navigation
        imageGallery = bookreviewImages;
        currentImageIndex = 0;
        
        modal.style.display = 'block';
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Initialize tab functionality
        initializeTabNavigation();
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    const hopechainModal = document.getElementById('hopechainModal');
    const sssdModal = document.getElementById('sssdModal');
    const bookreviewModal = document.getElementById('bookreviewModal');
    
    if (modal) modal.style.display = 'none';
    if (hopechainModal) hopechainModal.style.display = 'none';
    if (sssdModal) sssdModal.style.display = 'none';
    if (bookreviewModal) bookreviewModal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Tab Navigation Functionality
function initializeTabNavigation() {
    // Get the currently visible modal
    const visibleModal = document.querySelector('.modal[style*="block"]');
    if (!visibleModal) return;
    
    // Get tabs and contents within the visible modal only
    const tabs = visibleModal.querySelectorAll('.nav-tab');
    const tabContents = visibleModal.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        // Remove any existing event listeners
        tab.removeEventListener('click', tab.clickHandler);
        
        // Create new event handler
        tab.clickHandler = () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents in this modal
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetContent = visibleModal.querySelector('#' + targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        };
        
        // Add the event listener
        tab.addEventListener('click', tab.clickHandler);
    });
}

// Video Player Overlay Functionality
function openVideoPlayer(videoSrc, videoTitle) {
    const overlay = document.getElementById('videoPlayerOverlay');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // Set video source
    videoPlayer.src = videoSrc;
    videoPlayer.load();
    
    // Show overlay
    overlay.style.display = 'flex';
    
    // Play video
    videoPlayer.play().catch(e => {
        console.log('Autoplay prevented:', e);
    });
}

function closeVideoPlayer() {
    const overlay = document.getElementById('videoPlayerOverlay');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // Pause and reset video
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    
    // Hide overlay
    overlay.style.display = 'none';
}

// Close project modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Close video player when clicking outside
document.addEventListener('click', (e) => {
    const overlay = document.getElementById('videoPlayerOverlay');
    if (e.target === overlay) {
        closeVideoPlayer();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close video player first if open
        const overlay = document.getElementById('videoPlayerOverlay');
        if (overlay.style.display === 'flex') {
            closeVideoPlayer();
        } else {
            // Close project modal if video player is not open
            closeProjectModal();
        }
    }
});

// Projects Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Enhanced scroll animations between sections - DISABLED
document.addEventListener('DOMContentLoaded', () => {
    // Scroll animations disabled as requested
    console.log('Scroll animations between sections disabled');
});

// Enhanced Scroll Animations for individual elements
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, scrollObserverOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .contact-info, .hero-badge, .hero-stats, .hero-social');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
    
    // Also observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(title);
    });
});

// Typing Animation for Hero Subtitle
function typeWriterSubtitle() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = [
        'Full-Stack Web Developer',
        'Frontend Specialist',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing after hero loads
    setTimeout(type, 2000);
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    typeWriterSubtitle();
});

// Smooth scroll for hero scroll indicator
document.addEventListener('DOMContentLoaded', () => {
    const heroScrollIndicator = document.querySelector('.hero .scroll-indicator');
    if (heroScrollIndicator) {
        heroScrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const navbarHeight = 80; // Height of the fixed navbar
                const aboutTop = aboutSection.offsetTop - navbarHeight;
                
                // Scroll to exact beginning of about section
                const scrollPosition = Math.max(0, aboutTop);
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Add hover effect
        heroScrollIndicator.addEventListener('mouseenter', () => {
            heroScrollIndicator.style.transform = 'translateX(-50%) translateY(-5px) scale(1.1)';
        });
        
        heroScrollIndicator.addEventListener('mouseleave', () => {
            heroScrollIndicator.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        });
    }
});

// Console welcome message
console.log(`
🚀 Welcome to Kemal Letić's Portfolio!
🌙 Dark mode: Click the moon/sun icon in the navigation
📱 Mobile responsive: Optimized for all devices
🖼️ Click project images to view full screenshots
🎨 Enhanced with modern animations and effects
📧 Contact: letickemal@gmail.com
🔗 GitHub: github.com/kemalletic
💼 Built with HTML, CSS, and JavaScript
`);
