/**
 * Animations Module
 * Handles all GSAP ScrollTrigger animations for the Living Portfolio.
 */

export function initAnimations() {
  window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    ScrollTrigger.refresh();
    console.log("Airfolio: Living Experience Initialized");

    // --- 1. HERO: The Awakening (Text Scramble) ---
    gsap.to(".scramble-text", {
      duration: 2,
      text: {
        value: "Tarunya<br>Kesharwani",
        delimiter: "",
      },
      ease: "none",
      onStart: () => {
        const el = document.querySelector(".scramble-text");
        if (el) el.innerHTML = "INIT_SYSTEM...";
      },
    });

    gsap.to(".typewriter-text", {
      duration: 1.5,
      text: "Software Developer (Web & Auto) // Open Source Enthusiast",
      delay: 1.5,
      ease: "none",
    });

    // --- 2. ABOUT: Curiosity Engine (Parallax) ---
    gsap.to(".portrait-card", {
      yPercent: 30,
      rotation: 5,
      ease: "none",
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // --- 3. SKILLS: Orbit System (Responsive & Dynamic) ---
    const planets = document.querySelectorAll(".skill-planet");
    const orbitSystem = document.querySelector(".orbit-system");

    let radius = 350; // Default fallback

    function updateOrbitRadius() {
      if (orbitSystem) {
        // Use 45% of the container width (keeping it inside the 50% radius border)
        radius = (orbitSystem.offsetWidth / 2) * 0.9;
      }
    }
    updateOrbitRadius();
    window.addEventListener("resize", updateOrbitRadius);

    planets.forEach((planet, i) => {
      // Distribute them evenly
      const angle = (i / planets.length) * Math.PI * 2;
      let obj = { val: angle };

      gsap.to(obj, {
        val: angle + Math.PI * 2,
        duration: 25 + Math.random() * 10,
        repeat: -1,
        ease: "none",
        onUpdate: () => {
          const x = Math.cos(obj.val) * radius;
          const y = Math.sin(obj.val) * radius;
          // KEY FIX: xPercent/yPercent handles the centering offset (-50%)
          gsap.set(planet, { x: x, y: y, xPercent: -50, yPercent: -50 });
        },
      });
    });

    // --- 4. PROJECTS: Creation Chamber (Tunnel) ---
    const track = document.querySelector(".project-track");
    const wrapper = document.querySelector(".projects-wrapper");

    if (track && wrapper) {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }

    // --- 5. EDUCATION: System Upgrade (Stacking) ---
    gsap.from(".stack-card", {
      scrollTrigger: {
        trigger: ".education",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      rotateX: -45,
      stagger: 0.2,
      duration: 1,
      ease: "power4.out",
    });

    // --- 6. MAGNETIC BUTTONS (Mouse Interaction) ---
    const magBtns = document.querySelectorAll(".magnetic-btn");
    const cursor = document.getElementById("custom-cursor");

    magBtns.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
        });

        if (cursor) cursor.classList.add("magnet-active");
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
        if (cursor) cursor.classList.remove("magnet-active");
      });
    });

    ScrollTrigger.refresh();
  });
}
