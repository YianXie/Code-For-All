// Function to set active navigation based on current page
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Remove active class from all nav links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Set active class based on current page
    if (currentPage === 'index.html' || currentPage === '' || currentPath === '/') {
        const homeLink = document.querySelector('nav ul li a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    } else if (currentPage === 'events.html') {
        const eventsLink = document.querySelector('nav ul li a[href="events.html"]');
        if (eventsLink) eventsLink.classList.add('active');
    } else if (currentPage === 'contact.html') {
        const contactLink = document.querySelector('nav ul li a[href="contact.html"]');
        if (contactLink) contactLink.classList.add('active');
    } else if (currentPage === 'team.html') {
        const teamLink = document.querySelector('nav ul li a[href="team.html"]');
        if (teamLink) teamLink.classList.add('active');
    } else if (currentPage === 'login.html') {
        const loginLink = document.querySelector('nav ul li a[href="login.html"]');
        if (loginLink) loginLink.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation based on current page
    setActiveNavigation();
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const navMenu = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger');

    // Toggle mobile menu
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    


    // Authentication System
    class AuthSystem {
        constructor() {
            this.users = [];
            this.currentUser = JSON.parse(localStorage.getItem('codeforall_currentuser')) || null;
            this.loadUsers();
            this.initializeAuth();
        }

        async loadUsers() {
            try {
                const response = await fetch('users.json');
                const data = await response.json();
                this.users = data.users || [];
            } catch (error) {
                console.log('Could not load users from database, using localStorage fallback');
                this.users = JSON.parse(localStorage.getItem('codeforall_users')) || [];
            }
        }

        initializeAuth() {
            // Check if we're on the login page
            if (window.location.pathname.includes('login.html')) {
                this.setupLoginForms();
            }
            
            // Update navigation based on login status
            this.updateNavigation();
            
            // Redirect if trying to access protected content
            this.checkProtectedRoutes();
        }

        setupLoginForms() {
        const authForm = document.getElementById('authForm');
        console.log('Setting up login forms, authForm found:', !!authForm);

        if (authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Form submitted, isRegisterMode:', typeof isRegisterMode !== 'undefined' ? isRegisterMode : 'undefined');
                
                // Check if we're in register mode (using the global variable from login.html)
                if (typeof isRegisterMode !== 'undefined' && isRegisterMode) {
                    console.log('Calling handleRegister');
                    this.handleRegister(e);
                } else {
                    console.log('Calling handleLogin');
                    this.handleLogin(e);
                }
            });
            
            // Show role assignment field if admin is logged in
            this.updateRoleAssignmentVisibility();
        }
    }
    
    updateRoleAssignmentVisibility() {
        const roleAssignmentGroup = document.getElementById('role-assignment-group');
        const currentUser = this.getCurrentUser();
        
        if (roleAssignmentGroup) {
            if (currentUser && currentUser.role === 'admin') {
                roleAssignmentGroup.style.display = 'block';
            } else {
                roleAssignmentGroup.style.display = 'none';
            }
        }
    }

        async handleLogin(e) {
            e.preventDefault();
            
            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;
            
            console.log('Login attempt:', { email, password });
            
            // Reload users to get latest data
            await this.loadUsers();
            
            console.log('Loaded users:', this.users);
            console.log('Looking for user with email/username:', email, 'and password:', password);
            
            // Find user by email/username and password
            const user = this.users.find(u => {
                console.log('Checking user:', u.email, u.username, 'password match:', u.password === password);
                return (u.email === email || u.username === email) && u.password === password;
            });
            
            console.log('Found user:', user);
            
            if (user) {
                this.currentUser = { ...user };
                // Update last login
                this.currentUser.last_login = new Date().toISOString();
                localStorage.setItem('codeforall_currentuser', JSON.stringify(this.currentUser));
                
                const welcomeName = user.username || user.name || user.email;
                this.showMessage('Login successful! Welcome back, ' + welcomeName, 'success');
                
                // Update navigation
                this.updateNavigation();
                
                // Redirect based on role
                setTimeout(() => {
                    if (user.role === 'admin') {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }, 1500);
            } else {
                // Call the login failure handler if it exists
                if (typeof handleLoginFailure === 'function') {
                    handleLoginFailure();
                } else {
                    this.showMessage('Invalid username/email or password. Please try again.', 'error');
                }
            }
        }

        handleRegister(e) {
            e.preventDefault();
            
            const name = document.getElementById('authName').value;
            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validation
            if (password !== confirmPassword) {
                this.showMessage('Passwords do not match!', 'error');
                return;
            }

            if (password.length < 6) {
                this.showMessage('Password must be at least 6 characters long!', 'error');
                return;
            }

            // Check if user already exists
            if (this.users.find(u => u.email === email)) {
                this.showMessage('An account with this email already exists!', 'error');
                return;
            }

            // Get role assignment (only if admin is creating the user)
            const currentUser = this.getCurrentUser();
            const userRoleSelect = document.getElementById('userRole');
            let assignedRole = 'user'; // Default role for security
            
            // SECURITY: Only allow role assignment if current user is admin
            // This prevents privilege escalation attacks
            if (currentUser && currentUser.role === 'admin' && userRoleSelect && userRoleSelect.style.display !== 'none') {
                assignedRole = userRoleSelect.value;
            } else {
                // Force user role for non-admin registrations
                assignedRole = 'user';
            }

            // Create new user
            const newUser = {
                id: Date.now(),
                username: name,
                name,
                email,
                password,
                role: assignedRole,
                created_at: new Date().toISOString(),
                last_login: null
            };

            this.users.push(newUser);
            localStorage.setItem('codeforall_users', JSON.stringify(this.users));
            
            // Save to users.json file
            this.saveUserToDatabase(newUser);
            
            const roleMessage = assignedRole === 'admin' ? ' with administrator privileges' : '';
            this.showMessage(`Account created successfully${roleMessage}! You can now log in.`, 'success');
            
            // Switch to login form
            setTimeout(() => {
                if (typeof switchToLogin === 'function') {
                    switchToLogin();
                }
                document.getElementById('authEmail').value = email;
            }, 1500);
        }

        logout() {
            this.currentUser = null;
            localStorage.removeItem('codeforall_currentuser');
            this.updateNavigation();
            this.showMessage('You have been logged out successfully.', 'success');
            
            // Redirect to home if on protected page
            if (this.isProtectedRoute()) {
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        }

        updateNavigation() {
            // Handle navigation structure (now consistent across all pages)
            const adminLink = document.querySelector('.admin-link');
            
            if (navMenu) {
                const loginLink = navMenu.querySelector('a[href="login.html"]');
                
                if (this.currentUser && loginLink) {
                    // Replace login link with user menu
                    const loginItem = loginLink.parentElement;
                    loginItem.innerHTML = `
                        <div class="user-menu">
                            <span class="user-name">Hi, ${this.currentUser.username}</span>
                            <button onclick="authSystem.logout()" class="logout-btn">Logout</button>
                        </div>
                    `;
                    
                    // Show admin link only for admin users
                    if (adminLink) {
                        if (this.currentUser.role === 'admin') {
                            adminLink.style.display = 'block';
                        } else {
                            adminLink.style.display = 'none';
                        }
                    }
                } else if (!this.currentUser && !loginLink) {
                    // Restore login link if user logged out
                    const lastItem = navMenu.querySelector('li:last-child');
                    if (lastItem && lastItem.querySelector('.user-menu')) {
                        const isLoginPage = window.location.pathname.includes('login.html');
                        const activeClass = isLoginPage ? ' class="active"' : '';
                        lastItem.innerHTML = `<a href="login.html"${activeClass}>Login</a>`;
                    }
                    
                    // Hide admin link for non-logged in users
                    if (adminLink) {
                        adminLink.style.display = 'none';
                    }
                }
            }
        }

        isProtectedRoute() {
            // Add routes that require authentication here
            const protectedRoutes = ['admin.html'];
            return protectedRoutes.some(route => window.location.pathname.includes(route));
        }

        isAdminRoute() {
            // Routes that require admin access
            const adminRoutes = ['admin.html'];
            return adminRoutes.some(route => window.location.pathname.includes(route));
        }

        hasAdminAccess() {
            return this.currentUser && this.currentUser.role === 'admin';
        }

        getCurrentUser() {
            return this.currentUser;
        }

        async saveUserToDatabase(newUser) {
            try {
                // Update the users.json file
                const updatedData = {
                    users: this.users,
                    sessions: []
                };
                
                // Since we can't directly write to files from frontend,
                // we'll use a simple approach with a server endpoint
                const response = await fetch('/save-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                });
                
                if (!response.ok) {
                    console.log('Could not save to database, using localStorage only');
                }
            } catch (error) {
                console.log('Database save failed, using localStorage fallback:', error);
            }
        }

        checkProtectedRoutes() {
            if (this.isProtectedRoute() && !this.currentUser) {
                this.showMessage('Please log in to access this page.', 'error');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else if (this.isAdminRoute() && !this.hasAdminAccess()) {
                this.showMessage('Access denied. Admin privileges required.', 'error');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        }

        showMessage(message, type = 'info') {
            // Remove existing messages
            const existingMessages = document.querySelectorAll('.auth-message');
            existingMessages.forEach(msg => msg.remove());

            // Create message element
            const messageDiv = document.createElement('div');
            messageDiv.className = `auth-message ${type}`;
            messageDiv.textContent = message;
            
            // Style the message
            messageDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                z-index: 10000;
                max-width: 300px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideIn 0.3s ease;
            `;
            
            // Set background color based on type
            if (type === 'success') {
                messageDiv.style.backgroundColor = '#27ae60';
            } else if (type === 'error') {
                messageDiv.style.backgroundColor = '#e74c3c';
            } else {
                messageDiv.style.backgroundColor = '#3498db';
            }
            
            document.body.appendChild(messageDiv);
            
            // Auto remove after 4 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => messageDiv.remove(), 300);
                }
            }, 4000);
        }
    }

    // Initialize authentication system
    console.log('Creating AuthSystem...');
    window.authSystem = new AuthSystem();
    console.log('AuthSystem created:', window.authSystem);

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });

    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-box h3');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        });
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.impact');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Add CSS animations for messages and mobile menu
    if (!document.querySelector('#auth-animations')) {
        const style = document.createElement('style');
        style.id = 'auth-animations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .user-menu {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .user-name {
                color: #3498db;
                font-weight: 600;
            }
            .logout-btn {
                background: #e74c3c;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                transition: background 0.3s ease;
            }
            .logout-btn:hover {
                background: #c0392b;
            }
            body.menu-open {
                overflow: hidden;
            }
            .scroll-reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Scroll reveal animation
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

    // Observe elements with scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        // Handle navigation structure (now consistent across all pages)
        if (nav && menuToggle) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnMenuToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnMenuToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.classList.remove('active');
                        const icon = menuToggle.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
                
                // Close login page mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Add active class to nav items based on scroll position (only for same-page navigation)
    window.addEventListener('scroll', function() {
        // Only apply scroll-based highlighting on the home page
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            const scrollPosition = window.scrollY;
            
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('nav ul li a').forEach(link => {
                        // Only remove active from same-page links (starting with #)
                        if (link.getAttribute('href').startsWith('#')) {
                            link.classList.remove('active');
                        }
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    });
    
    // Simple testimonial slider (if multiple testimonials exist)
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Create navigation dots
        const sliderNav = document.createElement('div');
        sliderNav.className = 'slider-nav';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => showTestimonial(index));
            sliderNav.appendChild(dot);
        });
        
        document.querySelector('.testimonial-slider').appendChild(sliderNav);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
            
            document.querySelectorAll('.slider-nav .dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentTestimonial = index;
        }
        
        // Initialize: hide all except first
        showTestimonial(0);
    }
    
    // Initialize scroll reveal for specific elements only (not main sections)
    document.querySelectorAll('.feature-card, .stat-box, .testimonial').forEach(el => {
        el.classList.add('scroll-reveal');
    });
    
    // Initialize enhanced reactive button effects
    initReactiveButtons();
});

// Enhanced Mouse-Reactive Button Functionality with GSAP
function initReactiveButtons() {
    const buttons = document.querySelectorAll('.btn');
    const navLinks = document.querySelectorAll('nav a');
    
    buttons.forEach(button => {
        // Mouse move tracking for highlight effect
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            button.style.setProperty('--mouse-x', `${x}%`);
            button.style.setProperty('--mouse-y', `${y}%`);
        });
        
        // Reset position when mouse leaves
        button.addEventListener('mouseleave', function() {
            button.style.setProperty('--mouse-x', '50%');
            button.style.setProperty('--mouse-y', '50%');
        });
        
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            // Remove any existing ripples first
            const existingRipples = button.querySelectorAll('.ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x - 10}px`;
            ripple.style.top = `${y - 10}px`;
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Enhanced hover glow effect with GSAP
        button.addEventListener('mouseenter', function() {
            // Determine glow color based on button type
            let glowColor = 'rgba(26, 35, 50, 0.7)';
            if (button.classList.contains('btn-light')) {
                glowColor = 'rgba(116, 185, 255, 0.7)';
            } else if (button.classList.contains('btn-outline')) {
                glowColor = 'rgba(26, 35, 50, 0.7)';
            }
            
            if (typeof gsap !== 'undefined') {
                gsap.to(button, {
                    boxShadow: `0 20px 50px ${glowColor}`,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', function() {
            // Reset glow based on button type
            let resetGlow = '0 8px 25px rgba(26, 35, 50, 0.4)';
            if (button.classList.contains('btn-light')) {
                resetGlow = '0 8px 25px rgba(255, 255, 255, 0.4)';
            } else if (button.classList.contains('btn-outline')) {
                resetGlow = '0 8px 25px rgba(26, 35, 50, 0.3)';
            }
            
            if (typeof gsap !== 'undefined') {
                gsap.to(button, {
                    boxShadow: resetGlow,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Add mouse tracking for navigation links
    navLinks.forEach(navLink => {
        // Mouse move tracking for navigation highlight effect
        navLink.addEventListener('mousemove', function(e) {
            const rect = navLink.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            navLink.style.setProperty('--mouse-x', `${x}%`);
            navLink.style.setProperty('--mouse-y', `${y}%`);
        });
        
        // Reset position when mouse leaves
        navLink.addEventListener('mouseleave', function() {
            navLink.style.setProperty('--mouse-x', '50%');
            navLink.style.setProperty('--mouse-y', '50%');
        });
    });
}

// Prevent body scroll when mobile menu is open (additional fallback)
const preventBodyScroll = document.createElement('style');
preventBodyScroll.textContent = `
    body.menu-open {
        overflow: hidden !important;
    }
`;
document.head.appendChild(preventBodyScroll);

// Ensure body doesn't have menu-open class on page load
document.body.classList.remove('menu-open');