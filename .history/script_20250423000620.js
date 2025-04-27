// Register GSAP ScrollTrigger plugin

import slides from "./slides";
import gsap from "gsap";
import { ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin (ScrollTrigger);
document.addEventListener("DOMContentLoaded", ( ) ⇒ {
const lenis = new Lenis ( );
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
lenis.raf (time * 1000);
});
gsap.ticker.lagSmoothing(0);


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
// Animate image reveal on scroll using clip-path and ScrollTrigger
function animateImageReveal() {
    const imageSection = document.querySelector('.image img');
    if (!imageSection) return;

    gsap.fromTo(imageSection, 
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }, 
        {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.image',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Call the function to animate the image reveal
animateImageReveal();

function animateHeaderText() {
    const headerSpans = document.querySelectorAll(".title");
    if (headerSpans.length > 0) {
        gsap.fromTo(headerSpans, 
            { opacity: 0, y: 20 }, 
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".story-page",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
}

function animateWellnessDescription() {
    const wellnessDescriptions = document.querySelectorAll(".masking-text");
    if (wellnessDescriptions.length > 0) {
        gsap.fromTo(wellnessDescriptions, 
            { opacity: 0, y: 20 }, 
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".story-page",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
}

function animateIcons() {
    const icons = document.querySelectorAll(".icon");
    if (icons.length > 0) {
        gsap.fromTo(icons, 
            { opacity: 0, y: 20 }, 
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".story-page",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
}

function animateBorder() {
    const borders = document.querySelectorAll(".border");
    if (borders.length > 0) {
        gsap.fromTo(borders, 
            { width: "0%" }, 
            {
                width: "100%",
                duration: 1.5,
                ease: "power2.out"
            }
        );
    }
}

function animateMaskingText1() {
    const maskingText1 = document.querySelectorAll(".masking-text1");
    if (maskingText1.length > 0) {
        gsap.fromTo(maskingText1, 
            { opacity: 0, y: 20 }, 
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out"
            }
        );
    }

    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
        gsap.fromTo(heroVideo, 
            { opacity: 0 }, 
            {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out"
            }
        );
    }
}

// Call the functions to animate the header text, wellness description, icons, border, and masking-text1
animateHeaderText();
animateWellnessDescription();
animateIcons();
animateBorder();
animateMaskingText1();

const slideImages = document.querySelector('.slide-images');
const titleElement = document.querySelector('.title-text');
const exploreLink = document.querySelector('.slide-link a');

const totalSlides = slides.length;
const stripsCount = 25; // Number of strips to create
let currentTitleIndex = 0; // Current title index
let queuedTitleIndex = null; // Queued title index
const titleChangeThreshold = 0.5; // Threshold for title change
let isAnimating = false; // Flag to prevent multiple animations

const firstSlideImg = document.querySelector("#img-1 img");
firstSlideImg.style.transform = "scale(1.25)";

for(let i = 1; i<totalSlides; i++) {
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    imgContainer.id = `img-container-${i+1}`;
    imgContainer.style.opacity = "0";

    for(let j = 0; j < stripsCount; j++) {
       const strip = document.createElement("img");
       img.src = slides[i].image;
       img.alt = slides[i].title;
       img.style.transform = "scale(1.25)";
       

       const stripPositionFromBottom = stripsCount - j -1;
       const stripLowerBound = 
         (stripPositionFromBottom + 1) * (100 / stripsCount);
        const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);

        strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${
         stripUpperBound - 0.1
    }%, 0% ${stripUpperBound - 0.1}%)`;

    strip.appendChild(img);
    imgContainer.appendChild(strip);
    }

    slideImages.appendChild(imgContainer);
}

const transitionCount = totalSlides - i;
const scrollDistancePerTransition = 1000;
const initialScrollDelay = 300;

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
    let imageProgress = 0;

    if (scrollProgress < transitionRanges[0].startPercent) {
        return 0;
    }

    if (
        scrollProgress > transitionRanges[transitionRanges.length - 1].endPercent
    ) {
      return transitionRanges.length;
    }

    for (let i = 0; i < transitionRanges.length; i++) {
        const range = transitionRanges[i];
        
        if (
            scrollProgress > range.startPercent &&
            scrollProgress < range.endPercent
        ) {
            const rangeSize = range.endPercent - range.startPercent;
            const normalizedProgress = 
            (scrollProgress - range.startPercent) / rangeSize;
            imageProgress = i + normalizedProgress;
            break;
        } else if (scrollProgress > range.endPercent) {
            imageProgress = i + 1;
         }
        }

    return imageProgress;   
    }


function getScaleForImage(imageIndex, currentImageIndex, progress) {
    if(imageIndex > currentImageIndex) return 1.25;
    if(imageIndex < currentImageIndex - 1) return 1;

    let totalProgress = 
       imageIndex === currentImageIndex ? progress : 1 + progress;
    return 1.25 - (0.25 * totalProgress) / 2;
}

function animateTitleChange(index, direction) {
    if (index === currentTitleIndex) return;

    if (index < 0 || index > slides.length) return;

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

    gsap.to (titleElement, {
        y: outY,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
        titleElement.textContent = newTitle;
        gsap.set(titleElement, {y: inY });
        gsap.to (titleElement, {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
        currentTitleIndex = index;
        isAnimating = false;

        if (
            queuedTitleIndex !== null &&
            queuedTitleIndex !== currentTitleIndex
            ) {
            const nextIndex = queuedTitleIndex;
            queuedTitleIndex = null;
            animateTitleChange (nextIndex, direction);
            }
        },
    });
    },
    });
    }
    
    function getTitleIndexForProgress (imageProgress) {
        const imageIndex = Math.floor(imageProgress);
        const imageSpecificProgress = imageProgress - imageIndex;
        if (imageSpecificProgress > titleChangeThreshold) {
        return Math.min(imageIndex + 1, slides.length - 1);
        } else {
        return imageIndex;
        }
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
                const scrollDirection =
                imageProgress > lastImageProgress ? "down" : "up";
                const currentImageIndex = Math.floor(imageProgress);
                const imageSpecificProgress = imageProgress - currentImageIndex;
                const correctTitleIndex = getTitleIndexForProgress (imageProgress);
                if (correctTitleIndex !== currentTitleIndex) {
                queuedTitleIndex = correctTitleIndex;
                if (!isAnimating) {
                animateTitleChange (correctTitleIndex, scrollDirection);
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

    const imgContainer = document.getElementById(
        `img-container-${imgIndex}`
    );
    if (!imgContainer) continue;
    imgContainer.style.opacity = "1";
    const strips = imgContainer.querySelectorAll(".strip");
    const images = imgContainer.querySelectorAll("img");
    if (transitionIndex < currentImageIndex) {
        strips.forEach((strip, stripIndex) => {
            const stripPositionFromBottom = stripsCount - stripIndex - 1;
            const stripUpperBound =
                stripPositionFromBottom * (100 / stripsCount);
            const stripLowerBound =
                (stripPositionFromBottom + 1) * (100 / stripsCount);
            const stripDelay = (stripIndex / stripsCount) * 0.5;
            const adjustedProgress = Math.max(
                0,
                Math.min(1, (imageSpecificProgress - stripDelay) * 2)
            );
const currentstripUpperBound =
stripLowerBound -
(stripLowerBound - (stripUpperBound = 0.1)) * adjustedProgress;
strip.style.clipPath = `polygon (0% ${stripLowerBound} %, 100% ${stripLowerBound} %, 100% $
{currentstripUpperBound}%, 0% ${currentstripUpperBound}%)`;
});
 } else {
    strips.forEach((strip, stripIndex) => {
        const stripPositionFromBottom = stripsCount - stripIndex - 1;
        const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
        
            const currentstripUpperBound =
                stripLowerBound - ((stripLowerBound - stripUpperBound + 0.1) * adjustedProgress);

            strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${currentstripUpperBound}%, 0% ${currentstripUpperBound}%)`;
;
    });
    }
    const imgScale = getScaleForImage(
        transitionIndex,
        currentImageIndex,
        imageSpecificProgress
    );

    images.forEach((img) => {
        img.style.transform = `scale(${imgScale})`;
    });
}
   lastImageProgress = imageProgress;
    }
  },
});