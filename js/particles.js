/**
 * Particle System
 * Creates a drifting space dust effect on a canvas.
 */
export class ParticleSystem {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "particle-canvas";
    this.ctx = this.canvas.getContext("2d");

    // Style to sit behind everything
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.zIndex = "-1"; // Behind everything
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.background =
      "radial-gradient(circle at center, #141922 0%, #0F1217 100%)"; // Deep Charcoal

    document.body.prepend(this.canvas);

    this.particles = [];
    this.particleCount = 100; // number of particles
    this.resize();

    window.addEventListener("resize", () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.2, // Drift slowly
        speedY: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#5AA2FF"; // Calm Azure Dust

    this.particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around screen
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Twinkle effect
      const alpha = p.alpha + (Math.random() - 0.5) * 0.05;
      this.ctx.globalAlpha = Math.max(0.1, Math.min(0.8, alpha));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}
