$(document).ready(function() {
    // Mobile Navigation Toggle
    $('#nav-toggle').click(function() {
        $(this).toggleClass('active');
        $('#nav-menu').toggleClass('active');
        $('body').toggleClass('menu-open');
    });

    // Close mobile menu when clicking on a link
    $('.nav-link').click(function() {
        $('#nav-toggle').removeClass('active');
        $('#nav-menu').removeClass('active');
        $('body').removeClass('menu-open');
    });

    // Hero section animations and effects
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Initialize typing effect when hero comes into view
                const typingElement = document.querySelector('.typing-text');
                if (typingElement) {
                    typeWriter(typingElement, 'Culinary Journey Awaits', 150);
                }
                heroObserver.unobserve(entry.target);
            }
        });
    });

    const heroElement = document.querySelector('.menu-hero');
    if (heroElement) {
        heroObserver.observe(heroElement);
    }

    // Filter Functionality
    $('.filter-btn').click(function() {
        const category = $(this).data('category');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter menu categories
        if (category === 'all') {
            $('.menu-category').fadeIn(300);
        } else {
            $('.menu-category').fadeOut(300);
            $(`.menu-category[data-category="${category}"]`).fadeIn(300);
        }
    });

    // Menu Item Hover Effects
    $('.menu-item').hover(
        function() {
            $(this).addClass('hovered');
            $(this).find('.item-image').addClass('hover-effect');
        },
        function() {
            $(this).removeClass('hovered');
            $(this).find('.item-image').removeClass('hover-effect');
        }
    );
    
    // Menu Item Click Effects
    $('.menu-item').click(function() {
        $(this).addClass('clicked');
        showToast('Dish selected!');
        
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 300);
    });

    // Toast Notification Function
    function showToast(message) {
        // Remove existing toast
        $('.toast').remove();
        
        // Create new toast
        const toast = $(`
            <div class="toast">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `);
        
        // Add toast styles
        toast.css({
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'linear-gradient(45deg, var(--atomic-tangerine), var(--portland-orange))',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'Schoolbell, cursive',
            fontSize: '1rem',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        // Add to body
        $('body').append(toast);
        
        // Animate in
        setTimeout(() => {
            toast.css('transform', 'translateX(0)');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            toast.css('transform', 'translateX(100%)');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Smooth Scrolling for Navigation Links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Parallax Effect for Floating Spices
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const rate = scrolled * -0.5;
        $('.floating-spices').css('transform', `translateY(${rate}px)`);
    });

    // Category Entrance Animation
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
                categoryObserver.unobserve(entry.target);
            }
        });
    });

    $('.menu-category').each(function() {
        categoryObserver.observe(this);
    });

    // Order Online Button Click
    $('#order-online-btn').click(function(e) {
        e.preventDefault();
        showToast('Redirecting to order platform...');
        // Add your order platform redirect logic here
    });

    // Typing Effect for Subtitle
    function typeWriter(element, text, speed = 100) {
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

    // Initialize typing effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        typeWriter(typingElement, 'Culinary Journey Awaits', 150);
    }

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .menu-category {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .menu-category.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .dish-image {
            width: 80px;
            height: 60px;
            border-radius: 8px;
            overflow: hidden;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .item-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.3s ease;
            border-radius: 8px;
        }
        
        .item-image.hover-effect {
            transform: scale(1.1);
            filter: brightness(1.2);
            box-shadow: 0 5px 15px rgba(245, 155, 120, 0.4);
        }
        
        .menu-item {
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .menu-item.hovered {
            transform: translateX(5px);
            background: rgba(246, 221, 191, 0.05);
            border-radius: 8px;
            padding: 10px;
        }
        
        .menu-item.clicked {
            transform: scale(0.98);
            background: rgba(245, 155, 120, 0.1);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
});

// Additional CSS for navbar scroll effect
const navbarStyle = document.createElement('style');
navbarStyle.textContent = `
    .navbar.scrolled {
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(navbarStyle);
