// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
        
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust scroll position to account for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image Upload Placeholders functionality
    const teamPlaceholders = document.querySelectorAll('.team-img-placeholder');
    
    teamPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            // In a real app, this would trigger an input type="file"
            alert('This would open a file picker to select a profile picture for the team member.');
        });
    });

    // Contact Form AJAX Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const statusDiv = document.getElementById('form-status');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Loading State
            submitBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Sending...';
            submitBtn.disabled = true;
            statusDiv.style.display = 'none';
            
            fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.success === 'true' || data.success === true || (data.message && data.message.includes('success'))) {
                    statusDiv.innerHTML = '<i class="ph-fill ph-check-circle" style="margin-right: 8px; vertical-align: middle;"></i>Message sent successfully!';
                    statusDiv.style.color = '#D8BB7E';
                    statusDiv.style.borderColor = 'rgba(216, 187, 126, 0.3)';
                    statusDiv.style.backgroundColor = 'rgba(216, 187, 126, 0.1)';
                    statusDiv.style.display = 'block';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                statusDiv.innerHTML = '<i class="ph-fill ph-warning-circle" style="margin-right: 8px; vertical-align: middle;"></i>Oops! There was a problem submitting your form.';
                statusDiv.style.color = '#f44336';
                statusDiv.style.borderColor = 'rgba(244, 67, 54, 0.3)';
                statusDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                statusDiv.style.display = 'block';
            })
            .finally(() => {
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            });
        });
    }
});
