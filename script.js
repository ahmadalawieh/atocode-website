// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and info cards
document.querySelectorAll('.service-card, .info-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.style.opacity = '0.7';

    // Get form data
    const formData = new FormData(contactForm);

    try {
        // Send form data to PHP backend
        const response = await fetch('contact-form.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            // Show success message
            submitButton.textContent = '✓ Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            // Reset form
            contactForm.reset();

            // Optional: Show a more prominent success message
            alert(result.message || 'Thank you for your message! We will get back to you soon.');

        } else {
            // Show error message
            submitButton.textContent = '✗ Error';
            submitButton.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

            alert(result.message || 'Sorry, there was an error. Please try again.');
        }

    } catch (error) {
        // Network or other error
        submitButton.textContent = '✗ Error';
        submitButton.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

        alert('Sorry, there was an error sending your message. Please try again later or email us directly at hello@atocode.com');
        console.error('Form submission error:', error);
    }

    // Reset button after 3 seconds
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.style.background = '';
        submitButton.style.opacity = '';
    }, 3000);
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Animate numbers in stats
function animateValue(element, start, end, duration, decimals = 0) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        const value = (progress * (end - start) + start).toFixed(decimals);
        element.textContent = value + (element.dataset.suffix || '');

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const number = entry.target.querySelector('.stat-number');
            const originalText = number.textContent;

            // Extract the numeric part (including decimals) and the suffix
            const match = originalText.match(/([\d.]+)(.*)/);

            if (match) {
                const value = parseFloat(match[1]);
                const suffix = match[2];

                // Determine number of decimal places
                const decimalMatch = match[1].match(/\.(\d+)/);
                const decimals = decimalMatch ? decimalMatch[1].length : 0;

                if (!isNaN(value)) {
                    number.dataset.suffix = suffix;
                    animateValue(number, 0, value, 2000, decimals);
                    entry.target.classList.add('animated');
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--color-accent-1)';
        }
    });
});
