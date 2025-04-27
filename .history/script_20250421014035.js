gsap.registerPlugin(ScrollTrigger);

// Hero Text Animation
gsap.to(".hero-title", {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.3,
  ease: "power2.out"
});

gsap.to(".hero-sub", {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.6,
  ease: "power2.out"
});

// Pin Section Animations
gsap.from(".pin-image", {
  scrollTrigger: {
    trigger: ".pin-section",
    start: "top center",
  },
  y: 50,
  opacity: 0,
  duration: 1
});

gsap.from(".pin-text", {
  scrollTrigger: {
    trigger: ".pin-section",
    start: "top center+=100",
  },
  y: 20,
  opacity: 0,
  duration: 1
});

// Gallery Scroll Animation
gsap.utils.toArray(".gallery-item").forEach((item, i) => {
  gsap.to(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: i * 0.2
  });
});

// Background color change on CTA
ScrollTrigger.create({
  trigger: ".cta",
  start: "top center",
  onEnter: () => document.body.style.backgroundColor = "#222",
  onLeaveBack: () => document.body.style.backgroundColor = "#f4f4f4"
});
