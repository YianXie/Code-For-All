document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle - handle both navigation structures
    const menuToggle = document.querySelector('.menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    
    // Handle original navigation structure
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Handle login page navigation structure
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Authentication System
    class AuthSystem {
        constructor() {
            this.users = JSON.parse(localStorage.getItem('codeforall_users')) || [];
            this.currentUser = JSON.parse(localStorage.getItem('codeforall_currentuser')) || null;
            this.initializeAuth();
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

        if (authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Check if we're in register mode (using the global variable from login.html)
                if (typeof isRegisterMode !== 'undefined' && isRegisterMode) {
                    this.handleRegister(e);
                } else {
                    this.handleLogin(e);
                }
            });
        }
    }

        handleLogin(e) {
            e.preventDefault();
            
            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;
            
            // Find user
            const user = this.users.find(u => u.email === email && u.password === password);
            
            if (user) {
                this.currentUser = { ...user };
                localStorage.setItem('codeforall_currentuser', JSON.stringify(this.currentUser));
                
                this.showMessage('Login successful! Welcome back, ' + user.name, 'success');
                
                // Update navigation
                this.updateNavigation();
                
                // Redirect to home page after short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // Call the login failure handler if it exists
                if (typeof handleLoginFailure === 'function') {
                    handleLoginFailure();
                } else {
                    this.showMessage('Invalid email or password. Please try again.', 'error');
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

            // Create new user
            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                joinDate: new Date().toISOString()
            };

            this.users.push(newUser);
            localStorage.setItem('codeforall_users', JSON.stringify(this.users));
            
            this.showMessage('Account created successfully! You can now log in.', 'success');
            
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
            // Handle both navigation structures
            const navMenu = document.querySelector('nav ul');
            const loginPageNavMenu = document.querySelector('.nav-menu');
            
            // Update main navigation (index.html, events.html, etc.)
            if (navMenu) {
                const loginLink = navMenu.querySelector('a[href="login.html"]');
                
                if (this.currentUser && loginLink) {
                    // Replace login link with user menu
                    const loginItem = loginLink.parentElement;
                    loginItem.innerHTML = `
                        <div class="user-menu">
                            <span class="user-name">Hi, ${this.currentUser.name.split(' ')[0]}</span>
                            <button onclick="authSystem.logout()" class="logout-btn">Logout</button>
                        </div>
                    `;
                } else if (!this.currentUser && !loginLink) {
                    // Restore login link if user logged out
                    const lastItem = navMenu.querySelector('li:last-child');
                    if (lastItem && lastItem.querySelector('.user-menu')) {
                        lastItem.innerHTML = '<a href="login.html">Login</a>';
                    }
                }
            }
            
            // Update login page navigation
            if (loginPageNavMenu) {
                const loginLink = loginPageNavMenu.querySelector('a[href="login.html"]');
                
                if (this.currentUser && loginLink) {
                    // Replace login link with user menu
                    const loginItem = loginLink.parentElement;
                    loginItem.innerHTML = `
                        <div class="user-menu">
                            <span class="user-name">Hi, ${this.currentUser.name.split(' ')[0]}</span>
                            <button onclick="authSystem.logout()" class="logout-btn">Logout</button>
                        </div>
                    `;
                } else if (!this.currentUser && !loginLink) {
                    // Restore login link if user logged out
                    const lastItem = loginPageNavMenu.querySelector('li:last-child');
                    if (lastItem && lastItem.querySelector('.user-menu')) {
                        lastItem.innerHTML = '<a href="login.html" class="nav-link active">Login</a>';
                    }
                }
            }
        }

        isProtectedRoute() {
            // Add routes that require authentication here
            const protectedRoutes = [];
            return protectedRoutes.some(route => window.location.pathname.includes(route));
        }

        checkProtectedRoutes() {
            if (this.isProtectedRoute() && !this.currentUser) {
                this.showMessage('Please log in to access this page.', 'error');
                setTimeout(() => {
                    window.location.href = 'login.html';
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
    window.authSystem = new AuthSystem();

    // Add CSS animations for messages
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
        `;
        document.head.appendChild(style);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        // Handle original navigation structure
        if (nav && menuToggle) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnMenuToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnMenuToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
        
        // Handle login page navigation structure
        if (navMenu && hamburger) {
            const isClickInsideNavMenu = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNavMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuToggle) {
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
    
    // Add active class to nav items based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Add/remove header background on scroll
        const header = document.querySelector('header');
        if (header) {
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
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
});