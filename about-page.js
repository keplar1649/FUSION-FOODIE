// About Page JavaScript - Fusion Foodie

$(document).ready(function() {
    
    // ===== NAVBAR FUNCTIONALITY =====
    // Mobile menu toggle
    $('#nav-toggle').click(function() {
        $('#nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // ===== ANIMATIONS ON SCROLL =====
    function animateOnScroll() {
        $('.timeline-item, .value-card, .team-member').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }

    // Initial animation check
    animateOnScroll();

    // Animation on scroll
    $(window).scroll(function() {
        animateOnScroll();
    });

    // ===== TIMELINE ANIMATIONS =====
    $('.timeline-item').each(function(index) {
        $(this).css('animation-delay', (index * 0.2) + 's');
    });

    // ===== VALUE CARDS HOVER EFFECTS =====
    $('.value-card').hover(
        function() {
            $(this).find('.value-icon').addClass('bounce-effect');
        },
        function() {
            $(this).find('.value-icon').removeClass('bounce-effect');
        }
    );

    // ===== TEAM MEMBER INTERACTIONS =====
    $('.team-member').hover(
        function() {
            $(this).find('.member-image img').addClass('zoom-effect');
        },
        function() {
            $(this).find('.member-image img').removeClass('zoom-effect');
        }
    );

    // ===== FLOATING ELEMENTS ANIMATION =====
    function randomFloat() {
        $('.float-element').each(function() {
            var randomX = Math.random() * 100 - 50;
            var randomY = Math.random() * 100 - 50;
            var randomRotation = Math.random() * 360;
            
            $(this).css({
                'transform': `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`,
                'transition': 'transform 3s ease-in-out'
            });
        });
    }

    // Start floating animation
    setInterval(randomFloat, 4000);

    // ===== PARALLAX EFFECT FOR HERO =====
    $(window).scroll(function() {
        var scrolled = $(this).scrollTop();
        var parallax = $('.floating-elements');
        var speed = scrolled * 0.5;
        
        parallax.css('transform', 'translateY(' + speed + 'px)');
    });

    // ===== COUNTER ANIMATION (if needed for stats) =====
    function animateCounter(element, target) {
        var current = 0;
        var increment = target / 100;
        var timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.text(Math.floor(current));
        }, 20);
    }

    // ===== SECTION REVEAL ANIMATIONS =====
    function revealSections() {
        $('.section-header').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('revealed');
            }
        });
    }

    $(window).scroll(revealSections);
    revealSections(); // Initial check

    // ===== SMOOTH ENTRANCE ANIMATIONS =====
    function addEntranceAnimations() {
        // Timeline items
        $('.timeline-item').each(function(index) {
            $(this).css({
                'opacity': '0',
                'transform': 'translateY(50px)',
                'transition': 'all 0.6s ease',
                'animation-delay': (index * 0.2) + 's'
            });
        });

        // Value cards
        $('.value-card').each(function(index) {
            $(this).css({
                'opacity': '0',
                'transform': 'translateY(30px) scale(0.9)',
                'transition': 'all 0.5s ease',
                'animation-delay': (index * 0.1) + 's'
            });
        });

        // Team members
        $('.team-member').each(function(index) {
            $(this).css({
                'opacity': '0',
                'transform': 'translateY(40px)',
                'transition': 'all 0.6s ease',
                'animation-delay': (index * 0.15) + 's'
            });
        });
    }

    // Apply entrance animations
    addEntranceAnimations();

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.timeline-item, .value-card, .team-member').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== DYNAMIC CSS ANIMATIONS =====
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) scale(1) !important;
            }
            
            .bounce-effect {
                animation: bounceIcon 0.6s ease-in-out;
            }
            
            @keyframes bounceIcon {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            .zoom-effect {
                transform: scale(1.1) !important;
            }
            
            .revealed .section-title {
                animation: titleReveal 0.8s ease-out forwards;
            }
            
            @keyframes titleReveal {
                0% {
                    opacity: 0;
                    transform: translateY(30px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .hero-content {
                animation: heroFadeIn 1.5s ease-out;
            }
            
            @keyframes heroFadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(50px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Apply dynamic styles
    addDynamicStyles();

    // ===== ORDER ONLINE BUTTON FUNCTIONALITY =====
    $('#order-online-btn').click(function(e) {
        e.preventDefault();
        
        // Add click animation
        $(this).addClass('clicked');
        
        // Show toast notification
        showToast('Redirecting to order page...', 'info');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            $(this).removeClass('clicked');
            // Here you can redirect to actual ordering page
            // window.location.href = 'order.html';
        }, 300);
    });

    // ===== TOAST NOTIFICATION SYSTEM =====
    function showToast(message, type = 'success') {
        // Remove existing toast
        $('.toast').remove();
        
        // Create toast element
        const toast = $(`
            <div class="toast toast-${type}">
                <div class="toast-content">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                    <span>${message}</span>
                </div>
            </div>
        `);
        
        // Add toast styles
        const toastStyles = `
            .toast {
                position: fixed;
                top: 120px;
                right: 20px;
                background: var(--atomic-tangerine);
                color: var(--white);
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            }
            
            .toast.show {
                opacity: 1;
                transform: translateX(0);
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .toast-info {
                background: #3498db;
            }
        `;
        
        // Add styles if not already added
        if (!$('#toast-styles').length) {
            $('<style id="toast-styles">').text(toastStyles).appendTo('head');
        }
        
        // Add toast to page
        $('body').append(toast);
        
        // Show toast
        setTimeout(() => toast.addClass('show'), 100);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ===== LOADING ANIMATION =====
    $(window).on('load', function() {
        // Hide any loading spinner if present
        $('.loading-spinner').fadeOut();
        
        // Start hero animations
        $('.hero-content').addClass('loaded');
    });

    // ===== RESPONSIVE MENU HANDLING =====
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('#nav-menu').removeClass('active');
            $('#nav-toggle').removeClass('active');
        }
    });

    // Close mobile menu when clicking on a link
    $('.nav-link').click(function() {
        if ($(window).width() <= 768) {
            $('#nav-menu').removeClass('active');
            $('#nav-toggle').removeClass('active');
        }
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Throttle scroll events
    let scrollTimer = null;
    $(window).scroll(function() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            // Scroll-dependent functions here
        }, 10);
    });

    console.log('🍽️ About page loaded successfully!');
});
