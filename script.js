document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
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

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add animation to feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Pre-order button click handling
    const preOrderButtons = document.querySelectorAll('.primary-button, .cta-button');
    preOrderButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Here you would typically redirect to a checkout page
            alert('Thank you for your interest! Pre-orders will be available soon.');
        });
    });

    // Pricing button click handling
    const pricingButtons = document.querySelectorAll('.pricing-button');
    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plan = button.closest('.pricing-card').querySelector('h3').textContent;
            alert(`Thank you for selecting the ${plan} plan! We will contact you shortly.`);
        });
    });

    // Product Image Gallery
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-grid img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Update main image
            mainImage.src = thumb.src;
            mainImage.alt = thumb.alt;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Plan Selection
    function selectPlan(plan) {
        const plans = {
            basic: {
                name: 'Basic',
                price: '$299',
                features: ['AR Display', 'Voice Control', '8-hour Battery', '1080p Camera', 'Basic Support']
            },
            pro: {
                name: 'Pro',
                price: '$499',
                features: ['Enhanced AR Display', 'Advanced Voice Control', '12-hour Battery', '4K Camera', 'Premium Support', 'Extended Warranty']
            },
            enterprise: {
                name: 'Enterprise',
                price: 'Custom',
                features: ['Custom Solutions', 'Dedicated Support', 'API Access', 'Custom Features', 'Training Sessions', 'Priority Updates']
            }
        };

        const selectedPlan = plans[plan];
        
        // Remove active class from all cards
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // Add active class to selected card
        const selectedCard = document.querySelector(`.pricing-card[data-plan="${plan}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
        }

        if (plan === 'enterprise') {
            // Show contact form for enterprise plan
            alert('Thank you for your interest in our Enterprise plan! Our sales team will contact you shortly.');
        } else {
            // Show confirmation for basic and pro plans
            const confirmMessage = `You've selected the ${selectedPlan.name} plan for ${selectedPlan.price}.\n\nFeatures included:\n${selectedPlan.features.join('\n')}\n\nWould you like to proceed with the purchase?`;
            
            if (confirm(confirmMessage)) {
                alert('Thank you for your purchase! You will be redirected to the checkout page.');
            }
        }
    }

    // Add click event listeners to all pricing buttons
    document.querySelectorAll('.pricing-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const plan = button.closest('.pricing-card').dataset.plan;
            selectPlan(plan);
        });
    });

    // Add click event listeners to pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking the button (it has its own handler)
            if (!e.target.classList.contains('pricing-button')) {
                const plan = card.dataset.plan;
                selectPlan(plan);
            }
        });
    });
}); 