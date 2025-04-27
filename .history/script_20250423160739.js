// Initialize Lenis smooth scroll
const lenis = new Lenis({
    smooth: true,
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  // DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    setupMarqueeAnimation();
    animateContentSections();
    animateNavbar();
    setupButtonInteractions();
    animateImageReveal();
    animateHeaderText();
    animateWellnessDescription();
    animateIcons();
    animateBorder();
    animateMaskingText1();
  });
  
  let marqueeTween;
  
  function setupMarqueeAnimation() {
    const marqueeContent = document.querySelector(".marquee-content");
    if (!marqueeContent) return;
  
    const textWidth = marqueeContent.offsetWidth / 2;
    if (marqueeTween) marqueeTween.kill();
  
    marqueeTween = gsap.to(".marquee-content", {
      x: -textWidth,
      duration: 20,
      ease: "linear",
      repeat: -1,
    });
  }
  
  // Debounced resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setupMarqueeAnimation, 200);
  });
  
  function animateContentSections() {
    const sections = document.querySelectorAll(".content-section");
  
    sections.forEach((section) => {
      const heading = section.querySelector("h2");
      const paragraph = section.querySelector("p");
  
      if (heading) gsap.set(heading, { opacity: 0, y: 50 });
      if (paragraph) gsap.set(paragraph, { opacity: 0, y: 50 });
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (heading) {
                gsap.to(heading, {
                  y: 0,
                  opacity: 1,
                  duration: 1,
                  ease: "power3.out",
                });
              }
              if (paragraph) {
                gsap.to(paragraph, {
                  y: 0,
                  opacity: 1,
                  duration: 1,
                  delay: 0.3,
                  ease: "power3.out",
                });
              }
            }
          });
        },
        { threshold: 0.4 }
      );
  
      observer.observe(section);
    });
  }
  
  function animateNavbar() {
    const nav = document.querySelector("nav");
    const hero = document.querySelector(".hero");
  
    window.addEventListener("scroll", () => {
      const triggerPoint = hero.getBoundingClientRect().bottom;
      if (triggerPoint < 80) {
        gsap.to(nav, {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "15px 50px",
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(nav, {
          backgroundColor: "transparent",
          padding: "25px 50px",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  }
  
  function setupButtonInteractions() {
    const buttons = document.querySelectorAll(".btn.font-button3");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        alert("Join Us button clicked!");
      });
  
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          button.click();
        }
      });
    });
  }
  
  function animateImageReveal() {
    const image = document.querySelector(".images img");
    if (!image) return;
  
    gsap.set(image, {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    });
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(image, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power3.out",
          });
        }
      },
      { threshold: 0.5 }
    );
  
    observer.observe(document.querySelector(".image"));
  }
  
  function animateHeaderText() {
    const titles = document.querySelectorAll(".title");
    gsap.set(titles, { opacity: 0, y: 20 });
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(titles, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
          });
        }
      },
      { threshold: 0.5 }
    );
  
    const target = document.querySelector(".story-page");
    if (target) observer.observe(target);
  }
  
  function animateWellnessDescription() {
    const elements = document.querySelectorAll(".masking-text");
    gsap.set(elements, { opacity: 0, y: 20 });
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
          });
        }
      },
      { threshold: 0.5 }
    );
  
    const target = document.querySelector(".story-page");
    if (target) observer.observe(target);
  }
  
  function animateIcons() {
    const icons = document.querySelectorAll(".icon");
    gsap.set(icons, { opacity: 0, y: 20 });
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(icons, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
          });
        }
      },
      { threshold: 0.5 }
    );
  
    const target = document.querySelector(".story-page");
    if (target) observer.observe(target);
  }
  
  function animateBorder() {
    const borders = document.querySelectorAll(".border");
    gsap.set(borders, { width: "0%" });
  
    gsap.to(borders, {
      width: "100%",
      duration: 1.5,
      ease: "power2.out",
    });
  }
  
  function animateMaskingText1() {
    const maskingText1 = document.querySelectorAll(".masking-text1");
    gsap.set(maskingText1, { opacity: 0, y: 20 });
  
    gsap.to(maskingText1, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  
    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
      gsap.fromTo(
        heroVideo,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  }