// script.js
gsap.registerPlugin(ScrollTrigger);

// Hero text fade-in
gsap.to(".hero-text", {
    opacity: 1,
    duration: 2,
    scrollTrigger: {
        trigger: ".video-hero",
        start: "top center",
        toggleActions: "play none none reverse"
    }
});

// Parallax effect on scroll
gsap.to(".parallax-image", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: ".content-section",
        scrub: true
    }
});

// Video play on hover (from source [2])
document.getElementById("bg-video").addEventListener("mouseover", () => {
    document.getElementById("bg-video").play();
});
document.getElementById("bg-video").addEventListener("mouseout", () => {
    document.getElementById("bg-video").pause();
});
