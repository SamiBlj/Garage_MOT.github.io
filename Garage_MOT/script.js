// Enhanced Parallax effect for hero background
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax');
    let scrollPosition = window.pageYOffset;
    parallax.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)';
});

// Scroll-triggered animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .zoom-in, .tilt, .slide-up').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter .number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// FAQ toggle with smooth animation
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isOpen = answer.style.display === 'block';

        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });

        // Open clicked answer if it was closed
        if (!isOpen) {
            answer.style.display = 'block';
        }
    });
});

// Smooth scrolling for navigation
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

// Sticky navigation background change on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.sticky-nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
        nav.style.background = 'rgba(26, 26, 26, 0.9)';
    }
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navUl = document.querySelector('.nav-container ul');

mobileMenu.addEventListener('click', () => {
    navUl.classList.toggle('show');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navUl.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navUl.classList.remove('show');
        mobileMenu.classList.remove('active');
    }
});

// Timeline progress animation
const timelineSteps = document.querySelectorAll('.step');
const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = Math.random() * 0.5 + 's';
        }
    });
}, { threshold: 0.5 });

timelineSteps.forEach(step => {
    timelineObserver.observe(step);
});

// Chatbot functionality
const chatbotButton = document.getElementById('chatbot-button');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

let chatInitialized = false;

chatbotButton.addEventListener('click', () => {
    chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    if (!chatInitialized) {
        addMessage('bot', 'Hi! Welcome to The Garage MOT Test & Repair Centre. How can I help you with your MOT or vehicle repair needs today?');
        chatInitialized = true;
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage('user', message);
        chatbotInput.value = '';

        // Placeholder bot response - replace with AI later
        setTimeout(() => {
            addMessage('bot', 'Thanks for your message! Our team will get back to you soon. For immediate assistance, please call us at 01225 123456.');
        }, 1000);
    }
}

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Lazy loading for images (though placeholders, for future real images)
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src; // In case we add data-src later
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Enhanced service item hover effects
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.05)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});