// Add page transitions
function setupPageTransitions() {
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetUrl = link.href;

      // Create a transition animation
      const tl = gsap.timeline({
        onComplete: () => {
          window.location.href = targetUrl; // Navigate to the target page after animation
        },
      });

      tl.to(".page-transition", {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 0.5,
        ease: "power3.inOut",
      });
    });
  });

  // Animate the transition out when the page loads
  window.addEventListener("load", () => {
    gsap.to(".page-transition", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.5,
      ease: "power3.inOut",
    });
  });
}

// Add a page transition element to your HTML
document.addEventListener("DOMContentLoaded", () => {
  const transitionDiv = document.createElement("div");
  transitionDiv.className = "page-transition";
  document.body.appendChild(transitionDiv);

  // Style the page transition element
  const style = document.createElement("style");
  style.textContent = `
    .page-transition {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      transform: scaleY(0);
      transform-origin: top;
      z-index: 9999;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  setupPageTransitions();
});
