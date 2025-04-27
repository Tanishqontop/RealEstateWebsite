// Page Transitions
function setupPageTransitions() {
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) return; // Skip anchor links
      if (!href || href === window.location.href) return; // Skip current page

      e.preventDefault();

      // Create a transition timeline
      const transitionTimeline = gsap.timeline({
        onComplete: () => {
          window.location.href = href; // Navigate to the new page
        },
      });

      // Add animations to the timeline
      transitionTimeline.to("body", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  // Fade in the page on load
  gsap.fromTo(
    "body",
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: "power2.out" }
  );
}

// Initialize page transitions
document.addEventListener("DOMContentLoaded", () => {
  setupPageTransitions();
});
