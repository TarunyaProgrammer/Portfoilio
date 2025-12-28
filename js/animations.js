/**
 * Animations Module
 * Handles all GSAP ScrollTrigger animations.
 */

export function initAnimations() {
  // Wait for everything to load to ensure correct dimensions
  window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger);

    console.log("Airfolio: Initializing Animations (Load Complete)");

    // REFRESH SCROLLTRIGGER to ensure start/end positions are correct
    ScrollTrigger.refresh();

    // 1. Hero Reveal
    const heroTl = gsap.timeline();
    heroTl
      .from(".hero-title .line", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      })
      .from(
        ".hero-subtitle",
        {
          y: 20,
          opacity: 0,
          duration: 1,
        },
        "-=1"
      );

    // 2. About Section Parallax
    gsap.to(".portrait-card", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // 3. Skills Stagger Grid
    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: ".skills",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // 4. Horizontal Scroll for Projects
    const track = document.querySelector(".project-track");
    const wrapper = document.querySelector(".projects-wrapper");

    if (track && wrapper) {
      // Function to calculate how far to move left
      // We want to move (Total Width - Viewport Width) to the left
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount, // Use function for dynamic resize support
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          // "end" defines the vertical scroll distance over which the animation plays.
          // A larger value means "slower" horizontal scroll relative to vertical scroll keyframes.
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }

    // 5. Experience & Education Timeline
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleClass: "active",
        },
      });
    });

    // 6. Contact Pulse
    gsap.from(".cta-button", {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 80%",
      },
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // Final refresh to lock everything in
    ScrollTrigger.refresh();
  });
}
