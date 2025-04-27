function setupCurtainsTransition() {
  const curtain = document.createElement("div");
  curtain.className = "curtain";
  document.body.appendChild(curtain);

  gsap.set(curtain, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    zIndex: 9999,
    pointerEvents: "none",
  });
}

function playCurtainsTransition(onComplete) {
  const curtain = document.querySelector(".curtain");

  const timeline = gsap.timeline({
    onComplete: () => {
      if (onComplete) onComplete();
    },
  });

  timeline
    .to(curtain, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.8,
      ease: "power2.inOut",
    })
    .to(curtain, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 0.8,
      ease: "power2.inOut",
      delay: 0.2,
    });
}

// Initialize the curtains transition
document.addEventListener("DOMContentLoaded", () => {
  setupCurtainsTransition();

  // Example: Trigger the transition on a link click
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");

      playCurtainsTransition(() => {
        window.location.href = href;
      });
    });
  });
});
