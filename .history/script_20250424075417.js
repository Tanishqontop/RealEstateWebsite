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
  const image = document.querySelector(".image img");
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

// Register GSAP ScrollTrigger plugin
import slides from "./slides.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const slideImages = document.querySelector('#img-1');
  const titleElement = document.querySelector('#title-text');
  const exploreLink = document.querySelector('.slide-link a');

  const totalSlides = slides.length;
  const stripsCount = 25;
  let currentTitleIndex = 0;
  let queuedTitleIndex = null;
  const titleChangeThreshold = 0.5;
  let isAnimating = false;

  const firstSlideImg = document.querySelector("#img-1 img");
  firstSlideImg.style.transform = "scale(1.25)";

  for (let i = 1; i < totalSlides; i++) {
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    imgContainer.id = `img-container-${i + 1}`;
    imgContainer.style.opacity = "0";

    for (let j = 0; j < stripsCount; j++) {
      const strip = document.createElement("div");
      strip.className = "strip";

      const img = document.createElement("img");
      img.src = slides[i].image;
      img.alt = slides[i].title;
      img.style.transform = "scale(1.25)";

      const stripPositionFromBottom = stripsCount - j - 1;
      const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
      const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);

      strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${stripUpperBound}%, 0% ${stripUpperBound}%)`;
      strip.appendChild(img);
      imgContainer.appendChild(strip);
    }

    slideImages.appendChild(imgContainer);
  }

  const transitionCount = totalSlides - 1;
  const scrollDistancePerTransition = 1000;
  const initialScrollDelay = 300;
  const finalScrollDelay = 300;

  const totalScrollDistance =
    transitionCount * scrollDistancePerTransition +
    initialScrollDelay +
    finalScrollDelay;

  const transitionRanges = [];
  let currentScrollPosition = initialScrollDelay;

  for (let i = 0; i < transitionCount; i++) {
    const transitionStart = currentScrollPosition;
    const transitionEnd = transitionStart + scrollDistancePerTransition;

    transitionRanges.push({
      transition: i,
      startVh: transitionStart,
      endVh: transitionEnd,
      startPercent: transitionStart / totalScrollDistance,
      endPercent: transitionEnd / totalScrollDistance,
    });

    currentScrollPosition = transitionEnd;
  }

  function calculateImageProgress(scrollProgress) {
    if (scrollProgress < transitionRanges[0].startPercent) return 0;
    if (scrollProgress > transitionRanges[transitionRanges.length - 1].endPercent) return transitionRanges.length;

    for (let i = 0; i < transitionRanges.length; i++) {
      const range = transitionRanges[i];
      if (scrollProgress >= range.startPercent && scrollProgress <= range.endPercent) {
        const rangeSize = range.endPercent - range.startPercent;
        const normalizedProgress = (scrollProgress - range.startPercent) / rangeSize;
        return i + normalizedProgress;
      }
    }

    return 0;
  }

  function getScaleForImage(imageIndex, currentImageIndex, progress) {
    if (imageIndex > currentImageIndex) return 1.25;
    if (imageIndex < currentImageIndex - 1) return 1;
    let totalProgress = imageIndex === currentImageIndex ? progress : 1 + progress;
    return 1.25 - (0.25 * totalProgress) / 2;
  }

  function animateTitleChange(index, direction) {
    if (index === currentTitleIndex || index < 0 || index >= slides.length) return;

    if (isAnimating) {
      queuedTitleIndex = index;
      return;
    }

    isAnimating = true;
    const newTitle = slides[index].title;
    const newUrl = slides[index].url;
    const outY = direction === "down" ? "-120%" : "120%";
    const inY = direction === "down" ? "120%" : "-120%";

    gsap.killTweensOf(titleElement);
    exploreLink.href = newUrl;

    gsap.to(titleElement, {
      y: outY,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        titleElement.textContent = newTitle;
        gsap.set(titleElement, { y: inY });

        gsap.to(titleElement, {
          y: "0%",
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            currentTitleIndex = index;
            isAnimating = false;

            if (queuedTitleIndex !== null && queuedTitleIndex !== currentTitleIndex) {
              const nextIndex = queuedTitleIndex;
              queuedTitleIndex = null;
              animateTitleChange(nextIndex, direction);
            }
          },
        });
      },
    });
  }

  function getTitleIndexForProgress(imageProgress) {
    const imageIndex = Math.floor(imageProgress);
    const imageSpecificProgress = imageProgress - imageIndex;
    return imageSpecificProgress >= titleChangeThreshold
      ? Math.min(imageIndex + 1, slides.length - 1)
      : imageIndex;
  }

  let lastImageProgress = 0;

  ScrollTrigger.create({
    trigger: ".sticky-slider",
    start: "top top",
    end: `+=${totalScrollDistance}vh`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    invalidateOnRefresh: true,

    onUpdate: (self) => {
      const imageProgress = calculateImageProgress(self.progress);

      if (typeof imageProgress === "number") {
      const scrollDirection = imageProgress > lastImageProgress ? "down" : "up";
      const currentImageIndex = Math.floor(imageProgress);
      const imageSpecificProgress = imageProgress - currentImageIndex;
      const correctTitleIndex = getTitleIndexForProgress(imageProgress);
    
      

      if (correctTitleIndex !== currentTitleIndex) {
        queuedTitleIndex = correctTitleIndex;
        if (!isAnimating) {
          animateTitleChange(correctTitleIndex, scrollDirection);
        }
      }

      const firstSlideImgScale = getScaleForImage(
        0,
         currentImageIndex,
          imageSpecificProgress
        );
     
        firstSlideImg.style.transform = `scale(${firstSlideImgScale})`;

      for (let i = 1; i < totalSlides; i++) {
        const imgIndex = i + 1;
        const transitionIndex = imgIndex - 2;
        const imgContainer = document.getElementById(`img-container-${imgIndex}`);
        if (!imgContainer) continue;

        imgContainer.style.opacity = "1";
        const strips = imgContainer.querySelectorAll(".strip");
        const images = imgContainer.querySelectorAll("img");

        if (transitionIndex < currentImageIndex) {
            strips.forEach((strip, stripIndex) => {
                const stripPositionFromBottom = stripsCount - stripIndex - 1;
                const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);
                const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
                const stripDelay = (stripIndex / stripsCount) * 0.5;
                const adjustedProgress = Math.max(
                  0,
                  Math.min(1, (imageSpecificProgress - stripDelay) * 2)
                );
                const currentStripUpperBound =
                  stripLowerBound -
                  (stripLowerBound - (stripUpperBound - 0.1)) * adjustedProgress;
              
                strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${currentStripUpperBound}%, 0% ${currentStripUpperBound}%)`;
              });
        }  else if (transitionIndex === currentImageIndex) {
          strips.forEach((strip, stripIndex) => {
            const stripPositionFromBottom = stripsCount - stripIndex - 1;
            const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);
            const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
            const stripDelay = (stripIndex / stripsCount) * 0.5;
            const adjustedProgress = Math.max(
                0,
                Math.min(1, (imageSpecificProgress - stripDelay) *2)
            );
            const currentStripUpperBound = 
                 stripLowerBound - 
                   (stripLowerBound - (stripUpperBound - 0.1)) * adjustedProgress;
            strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${currentStripUpperBound}%, 0% ${currentStripUpperBound}%)`;
          }); 

        } else {
            strips.forEach((strip, stripIndex) => {
                 const stripPositionFromBottom = stripsCount - stripIndex - 1;
                 const stripLowerBound = 
                  (stripPositionFromBottom + 1) * (100 / stripsCount);
                 strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${stripLowerBound}%, 0% ${stripLowerBound}%)`;
            });
        }

        const imageScale = getScaleForImage(
            transitionIndex,
            currentImageIndex,
            imageSpecificProgress
        );
        images.forEach((img) => {
            img.style.transform = `scale(${imageScale})`;
        });
    }

    lastImageProgress = imageProgress;
}
    },
});
});

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
