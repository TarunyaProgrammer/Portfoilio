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
    const heroTl = gsap.timeline();

    // Scramble Name
    gsap.to(".scramble-text", {
      duration: 2,
      text: {
        value: "Tarunya<br>Kesharwani",
        delimiter: "",
      },
      ease: "none",
      onStart: () => {
        document.querySelector(".scramble-text").innerHTML = "INIT_SYSTEM...";
      },
    });

    // Typewriter Subtitle
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

    // --- 3. SKILLS: Orbit System ---
    const planets = document.querySelectorAll(".skill-planet");
    const radius = 250; // Distance from core

    planets.forEach((planet, index) => {
      const total = planets.length;
      const angle = (index / total) * Math.PI * 2;
      const speed = parseFloat(planet.dataset.speed) || 1;

      // Random start position
      gsap.set(planet, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });

      // continuous orbit
      gsap.to(planet, {
        duration: 20 / speed,
        rotation: 360,
        transformOrigin: `${-Math.cos(angle) * radius}px ${
          -Math.sin(angle) * radius
        }px`, // Complex math for GSAP rotation origin relative to center?
        // Simpler approach: Animate the angle in a custom object and update x/y
        repeat: -1,
        ease: "none",
        // This is a bit tricky with pure CSS rotation. Let's use a motion path proxy approach simpler for reliability.
      });
    });

    // Re-implementing Orbit using a timeline and simple circular path motion
    planets.forEach((planet, i) => {
      // Distribute them initially
      const angle = (i / planets.length) * Math.PI * 2;

      // We animate a 'val' from 0 to 2PI
      let obj = { val: angle };

      gsap.to(obj, {
        val: angle + Math.PI * 2,
        duration: 15 + Math.random() * 10,
        repeat: -1,
        ease: "none",
        onUpdate: () => {
          const cx = 0;
          const cy = 0;
          planet.style.transform = `translate(${
            Math.cos(obj.val) * radius
          }px, ${Math.sin(obj.val) * radius}px)`;
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
    magBtns.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3, // Magnetic strength
          y: y * 0.3,
          duration: 0.3,
        });

        // Expand cursor
        document.getElementById("custom-cursor").classList.add("magnet-active");
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
        document
          .getElementById("custom-cursor")
          .classList.remove("magnet-active");
      });
    });

    ScrollTrigger.refresh();
  });
}
