// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

let marqueeTween;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    setupMarqueeAnimation();
    animateContentSections();
    animateNavbar();
    setupButtonInteractions();
});

// Function to set up infinite marquee animation
function setupMarqueeAnimation() {
    const marqueeContent = document.querySelector('.marquee-content');
    if (!marqueeContent) return;

    // Calculate width for seamless looping
    const textWidth = marqueeContent.offsetWidth / 2;

    // Kill previous tween if exists to prevent duplicates
    if (marqueeTween) marqueeTween.kill();

    marqueeTween = gsap.to('.marquee-content', {
        x: -textWidth,
        duration: 20,
        ease: 'linear',
        repeat: -1
    });
}

// Animate content sections on scroll using ScrollTrigger
function animateContentSections() {
    gsap.utils.toArray('.content-section').forEach(section => {
        const heading = section.querySelector('h2');
        const paragraph = section.querySelector('p');

        if (heading) {
            gsap.fromTo(heading, 
                { y: 50, opacity: 0 }, 
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        if (paragraph) {
            gsap.fromTo(paragraph, 
                { y: 50, opacity: 0 }, 
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });
}

// Animate navbar background and padding on scroll
function animateNavbar() {
    gsap.to('nav', {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '15px 50px',
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.hero',
            start: 'bottom 80px',
            toggleActions: 'play none none reverse'
        }
    });
}

// Setup Join Us button click and keyboard interactions
function setupButtonInteractions() {
    const buttons = document.querySelectorAll('.btn.font-button3');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Join Us button clicked!');
            // Replace alert with your actual action (e.g., open modal, navigate)
        });

        button.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}

// Restart marquee animation on window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        setupMarqueeAnimation();
    }, 200);
});

// Animate wellness image with clipPath on scroll
function animateWellnessImage() {
    const wellnessImage = document.querySelector('.image img');
    if (!wellnessImage) return;

    gsap.to(".image img", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power1.out",
        duration: 1.5,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".wellness-image",
            start: "top 80%",
            end: "top 30%",
            scrub: true,
        },
    });
}

// Call the function to initialize the animation
animateWellnessImage();