// Elegant Fusion Foodie Restaurant JavaScript

$(document).ready(function() {
    // Hero Carousel Functionality (Auto-slide only)
    let currentSlide = 0;
    const slides = $('.hero-slide');
    const totalSlides = slides.length;
    let autoSlideInterval;
    
    function showSlide(index) {
        // Remove active classes
        slides.removeClass('active prev next');
        
        // Add active class to current slide
        slides.eq(index).addClass('active');
        
        // Add transition classes for smooth effect
        const prevIndex = (index - 1 + totalSlides) % totalSlides;
        const nextIndex = (index + 1) % totalSlides;
        
        slides.eq(prevIndex).addClass('prev');
        slides.eq(nextIndex).addClass('next');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Initialize carousel
    showSlide(0);
    startAutoSlide();
    
    // Pause auto-slide on hover
    $('.hero-section').hover(
        function() {
            stopAutoSlide();
        },
        function() {
            startAutoSlide();
        }
    );
    
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });
    
    // Hero scroll indicator
    $('.hero-scroll-indicator').on('click', function() {
        $('html, body').animate({
            scrollTop: $(window).height()
        }, 800);
    });
    
    // Elegant button hover effects
    $('.btn-primary, .btn-secondary').hover(
        function() {
            $(this).css('transform', 'translateY(-3px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
    
    // Image gallery interactions
    $('.main-image, .small-image').on('click', function() {
        const img = $(this).find('img');
        const overlay = $(this).find('.image-overlay');
        
        // Simple zoom effect
        img.css('transform', 'scale(1.1)');
        overlay.css('opacity', '1');
        
        setTimeout(() => {
            img.css('transform', 'scale(1)');
            overlay.css('opacity', '0');
        }, 1500);
    });
    
    // Animated counters for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.text(Math.floor(current) + '+');
        }, 20);
    }
    
    // Trigger counter animation when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = $(entry.target).find('.stat-number');
                const target = parseInt(statNumber.text());
                animateCounter(statNumber, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    $('.stat-item').each(function() {
        observer.observe(this);
    });
    
    // Dish card hover effects
    $('.dish-card').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-8px)',
                'box-shadow': '0 15px 35px rgba(0, 0, 0, 0.2)'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0)',
                'box-shadow': 'none'
            });
        }
    );
    
    // Menu category hover effects
    $('.menu-category').hover(
        function() {
            $(this).css('transform', 'translateY(-3px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
    
    // Featured dishes carousel initialization
    $('.featured-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });
    
    // Sticky navigation
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
    
    // Mobile menu toggle - Fixed functionality
    $('#nav-toggle').click(function() {
        $('.nav-links').toggleClass('active');
        $(this).toggleClass('active');
        $('body').toggleClass('nav-open'); // Prevent scrolling when menu is open
    });
    
    // Close mobile menu when clicking on a link
    $('.nav-links a').click(function() {
        $('.nav-links').removeClass('active');
        $('#nav-toggle').removeClass('active');
        $('body').removeClass('nav-open');
    });
    
    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.nav-links').removeClass('active');
            $('#nav-toggle').removeClass('active');
            $('body').removeClass('nav-open');
        }
    });
    
    // Handle window resize
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('.nav-links').removeClass('active');
            $('#nav-toggle').removeClass('active');
            $('body').removeClass('nav-open');
        }
    });
    
    // Fade in animations on scroll
    const fadeElements = $('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
            }
        });
    });
    
    fadeElements.each(function() {
        fadeObserver.observe(this);
    });
});
