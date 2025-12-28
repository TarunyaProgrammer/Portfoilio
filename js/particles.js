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

    // Luxe Radial Gradient (Black -> Charcoal)
    this.canvas.style.background =
      "radial-gradient(circle at top, #1A1A1D 0%, #0B0B0D 100%)";

    document.body.prepend(this.canvas);

    this.particles = [];
    this.particleCount = 80; // Reduced count for minimalism
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
        size: Math.random() * 1.5, // Smaller, finer particles
        speedX: (Math.random() - 0.5) * 0.1, // Even slower
        speedY: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.3 + 0.05, // Faint
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#FFFFFF"; // Pure White Dust

    this.particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around screen
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Subtle Pulse
      const alpha = p.alpha + (Math.random() - 0.5) * 0.02;
      this.ctx.globalAlpha = Math.max(0.05, Math.min(0.4, alpha));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}
