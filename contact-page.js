// Contact Page JavaScript

$(document).ready(function() {
    // Initialize all contact page functionality
    initNavbar();
    initContactCards();
    initMapInteractions();
    initReviewCarousel();
    initScrollAnimations();
    initFloatingElements();
    initContactForm();
    
    // Show toast notification
    function showToast(message, type = 'success') {
        const toast = $(`
            <div class="toast toast-${type}">
                <div class="toast-content">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                    <span>${message}</span>
                </div>
                <button class="toast-close">&times;</button>
            </div>
        `);
        
        $('body').append(toast);
        
        setTimeout(() => {
            toast.addClass('show');
        }, 100);
        
        setTimeout(() => {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
        
        toast.find('.toast-close').click(function() {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        });
    }
    
    // Navbar functionality
    function initNavbar() {
        const navbar = $('#navbar');
        const navToggle = $('#nav-toggle');
        const navMenu = $('#nav-menu');
        
        // Mobile menu toggle
        navToggle.click(function() {
            $(this).toggleClass('active');
            navMenu.toggleClass('active');
        });
        
        // Close mobile menu when clicking outside
        $(document).click(function(e) {
            if (!$(e.target).closest('.navbar').length) {
                navToggle.removeClass('active');
                navMenu.removeClass('active');
            }
        });
        
        // Navbar scroll effect
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                navbar.addClass('scrolled');
            } else {
                navbar.removeClass('scrolled');
            }
        });
        
        // Order online button click
        $('#order-online-btn').click(function() {
            showToast('Redirecting to order page...', 'success');
            // Add actual redirect logic here
        });
    }
    
    // Contact cards interactions
    function initContactCards() {
        $('.contact-action-btn').click(function() {
            const action = $(this).data('action');
            const $btn = $(this);
            
            // Add loading state
            $btn.addClass('loading').prop('disabled', true);
            
            setTimeout(() => {
                $btn.removeClass('loading').prop('disabled', false);
                
                switch(action) {
                    case 'location':
                        showToast('Opening Google Maps...', 'success');
                        window.open('https://maps.app.goo.gl/GifPZvav2oJnkpbh7', '_blank');
                        break;
                    case 'call':
                        showToast('Opening phone dialer...', 'success');
                        window.location.href = 'tel:+971525224030';
                        break;
                    case 'email':
                        showToast('Opening email client...', 'success');
                        window.location.href = 'mailto:fusionfoodie2025@gmail.com';
                        break;
                    case 'hours':
                        showToast('Viewing detailed schedule...', 'success');
                        break;
                }
            }, 1000);
        });
        
        // Card hover effects
        $('.contact-card').hover(
            function() {
                $(this).find('.contact-icon').addClass('bounce');
            },
            function() {
                $(this).find('.contact-icon').removeClass('bounce');
            }
        );
    }
    
    // Map interactions
    function initMapInteractions() {
        const $map = $('#restaurant-map');
        const $pin = $('.map-pin');
        
        // Map click interaction
        $map.click(function() {
            $(this).addClass('clicked');
            $pin.addClass('active');
            
            setTimeout(() => {
                $(this).removeClass('clicked');
                $pin.removeClass('active');
            }, 1000);
            
            showToast('Click and drag to explore the map!', 'success');
        });
        
        // Map button interactions
        $('#get-directions').click(function() {
            showToast('Opening directions in Google Maps...', 'success');
            // window.open('https://maps.google.com/dir//123+Fusion+Street+Delhi', '_blank');
        });
        
        $('#street-view').click(function() {
            showToast('Loading street view...', 'success');
            // Add street view functionality
        });
        
        // Highlight items hover effect
        $('.highlight-item').hover(
            function() {
                $(this).find('i').addClass('bounce');
            },
            function() {
                $(this).find('i').removeClass('bounce');
            }
        );
    }
    
    // Contact form functionality with Web3Forms
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const btnTextSpan = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        const resultEl = document.getElementById('result');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (!submitBtn) {
                return;
            }

            const originalBtnText = btnTextSpan ? btnTextSpan.textContent : submitBtn.textContent;

            // Reset previous state
            if (resultEl) {
                resultEl.textContent = '';
                resultEl.style.color = '';
            }
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            if (btnTextSpan) {
                btnTextSpan.textContent = 'Sending...';
            } else {
                submitBtn.textContent = 'Sending...';
            }

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action || 'https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    if (resultEl) {
                        resultEl.textContent = 'Success! Your message has been sent.';
                        resultEl.style.color = '#27ae60';
                    } else {
                        alert('Success! Your message has been sent.');
                    }
                    form.reset();
                } else {
                    const errorMessage = data && data.message ? data.message : 'Something went wrong. Please try again.';
                    if (resultEl) {
                        resultEl.textContent = 'Error: ' + errorMessage;
                        resultEl.style.color = '#e74c3c';
                    } else {
                        alert('Error: ' + errorMessage);
                    }
                }
            } catch (error) {
                if (resultEl) {
                    resultEl.textContent = 'Something went wrong. Please try again.';
                    resultEl.style.color = '#e74c3c';
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                if (btnTextSpan) {
                    btnTextSpan.textContent = originalBtnText;
                } else {
                    submitBtn.textContent = originalBtnText;
                }
            }
        });
    }
    
    // Review carousel functionality
    function initReviewCarousel() {
        let currentReview = 0;
        const $reviews = $('.review-card');
        const $dots = $('.dot');
        const $prevBtn = $('#prev-review');
        const $nextBtn = $('#next-review');
        const totalReviews = $reviews.length;
        
        function showReview(index) {
            $reviews.removeClass('active');
            $dots.removeClass('active');
            
            $reviews.eq(index).addClass('active');
            $dots.eq(index).addClass('active');
            
            currentReview = index;
        }
        
        function nextReview() {
            const next = (currentReview + 1) % totalReviews;
            showReview(next);
        }
        
        function prevReview() {
            const prev = (currentReview - 1 + totalReviews) % totalReviews;
            showReview(prev);
        }
        
        // Navigation buttons
        $nextBtn.click(nextReview);
        $prevBtn.click(prevReview);
        
        // Dot navigation
        $dots.click(function() {
            const index = $(this).data('review');
            showReview(index);
        });
        
        // Auto-advance reviews
        setInterval(nextReview, 5000);
        
        // Pause on hover
        $('.review-carousel').hover(
            function() {
                clearInterval(this.autoAdvance);
            },
            function() {
                this.autoAdvance = setInterval(nextReview, 5000);
            }
        );
    }
    
    // Scroll animations
    function initScrollAnimations() {
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        function handleScrollAnimations() {
            // Contact cards animation
            $('.contact-card').each(function() {
                if (isElementInViewport(this)) {
                    $(this).addClass('animate-in');
                }
            });
            
            // Social cards animation
            $('.social-card').each(function() {
                if (isElementInViewport(this)) {
                    $(this).addClass('animate-in');
                }
            });
            
            // Form sections animation
            $('.form-intro, .contact-form-wrapper').each(function() {
                if (isElementInViewport(this)) {
                    $(this).addClass('animate-in');
                }
            });
            
            // Map section animation
            if (isElementInViewport($('.map-section')[0])) {
                $('.map-wrapper').addClass('animate-in');
                $('.location-highlights').addClass('animate-in');
            }
        }
        
        $(window).scroll(handleScrollAnimations);
        handleScrollAnimations(); // Initial check
    }
    
    // Floating elements animation
    function initFloatingElements() {
        const $elements = $('.float-contact-element');
        
        // Add random movement to floating elements
        $elements.each(function(index) {
            const $el = $(this);
            const delay = index * 1200;
            
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                
                $el.css({
                    'transform': `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 10 - 5}deg)`
                });
                
                setTimeout(() => {
                    $el.css('transform', '');
                }, 2000);
                
            }, 6000 + delay);
        });
        
        // Mouse interaction with floating elements
        $('.contact-hero').mousemove(function(e) {
            const mouseX = e.pageX;
            const mouseY = e.pageY;
            
            $elements.each(function() {
                const $el = $(this);
                const rect = this.getBoundingClientRect();
                const elementX = rect.left + rect.width / 2;
                const elementY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
                );
                
                if (distance < 100) {
                    const moveX = (mouseX - elementX) * 0.1;
                    const moveY = (mouseY - elementY) * 0.1;
                    
                    $el.css({
                        'transform': `translate(${moveX}px, ${moveY}px) scale(1.1)`,
                        'opacity': '1'
                    });
                } else {
                    $el.css({
                        'transform': '',
                        'opacity': ''
                    });
                }
            });
        });
    }
    
    // Social media interactions
    $('.social-card').click(function() {
        const platform = $(this).hasClass('instagram') ? 'Instagram' : 
                        $(this).hasClass('facebook') ? 'Facebook' : 'Twitter';
        
        showToast(`Opening ${platform} in new tab...`, 'success');
        
        // Add actual social media links here
        // window.open('https://instagram.com/fusionfoodie', '_blank');
    });
    
    // Performance optimization
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        // Update any continuous animations here
        ticking = false;
    }
    
    $(window).scroll(requestTick);
    
    // Add loading states for buttons
    $('.contact-action-btn, .map-btn').click(function() {
        const $btn = $(this);
        const originalText = $btn.text();
        
        $btn.addClass('loading').text('Loading...');
        
        setTimeout(() => {
            $btn.removeClass('loading').text(originalText);
        }, 1500);
    });
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    
    // Add CSS for additional animations
    const additionalCSS = `
        <style>
        .contact-card.animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        .social-card.animate-in {
            animation: fadeInScale 0.5s ease-out forwards;
        }
        
        .form-intro.animate-in,
        .contact-form-wrapper.animate-in {
            animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .map-wrapper.animate-in {
            animation: slideInRight 0.8s ease-out forwards;
        }
        
        .location-highlights.animate-in {
            animation: slideInUp 0.6s ease-out 0.3s forwards;
        }
        
        .contact-icon.bounce {
            animation: bounce 0.6s ease-in-out;
        }
        
        .highlight-item i.bounce {
            animation: bounce 0.4s ease-in-out;
        }
        
        .submit-btn.success {
            background: linear-gradient(135deg, #27ae60, #2ecc71) !important;
        }
        
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #e74c3c;
            background: rgba(231, 76, 60, 0.05);
        }
        
        .form-group.focused .form-icon {
            color: #f59b78;
            transform: translateY(-50%) scale(1.1);
        }
        
        .checkmark.checked {
            animation: checkmarkPop 0.3s ease-out;
        }
        
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .toast.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .toast-success {
            border-left: 4px solid #27ae60;
        }
        
        .toast-error {
            border-left: 4px solid #e74c3c;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .toast-success .toast-content i {
            color: #27ae60;
        }
        
        .toast-error .toast-content i {
            color: #e74c3c;
        }
        
        .toast-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 10px;
            color: #7f8c8d;
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes bounce {
            0%, 20%, 60%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            80% {
                transform: translateY(-5px);
            }
        }
        
        @keyframes checkmarkPop {
            0% {
                transform: scale(0.8);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        </style>
    `;
    
    $('head').append(additionalCSS);
});
