// Add page transitions
function setupPageTransitions() {
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetUrl = link.href;

      const transitionOut = gsap.timeline({
        onComplete: () => {
          window.location.href = targetUrl;
        },
      });

      transitionOut.to("body", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  // Transition in
  gsap.fromTo(
    "body",
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: "power2.out" }
  );
}

// Call setupPageTransitions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  setupPageTransitions();
});
