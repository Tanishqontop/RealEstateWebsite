// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Marquee text animation
    setupMarqueeAnimation();
    
    // Content sections animations
    animateContentSections();
    
    // Navbar scroll animation
    animateNavbar();
});

// Function to set up the marquee animation
function setupMarqueeAnimation() {
    const marqueeContent = document.querySelector('.marquee-content');
    
    // Calculate the width of the text for seamless looping
    // We divide by 2 because we duplicated the content in the HTML
    const textWidth = marqueeContent.offsetWidth / 2;
    
    // Create infinite scrolling animation
    gsap.to('.marquee-content', {
        x: -textWidth,
        duration: 20,
        ease: 'linear',
        repeat: -1
    });
}

// Function to animate content sections on scroll
function animateContentSections() {
    gsap.utils.toArray('.content-section').forEach(section => {
        // Animate heading
        gsap.to(section.querySelector('h2'), {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Animate paragraph with delay
        gsap.to(section.querySelector('p'), {
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
        });
    });
}

// Function to animate navbar on scroll
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

// Handle window resize for responsive animations
window.addEventListener('resize', function() {
    // Restart the marquee animation on window resize
    setupMarqueeAnimation();
});

document.querySelectorAll('.btn.font-button3').forEach(button => {
    button.addEventListener('click', () => {
      alert('Join Us button clicked!');
      // Replace alert with your actual action, e.g. open modal, navigate, etc.
    });
  
    button.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
  
