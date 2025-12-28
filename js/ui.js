/**
 * UI Module
 * Handles the canvas overlay and status updates.
 */

export class UIModule {
  constructor() {
    this.canvas = document.getElementById("gesture-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.statusCard = document.getElementById("status-card");
    this.statusIcon = document.getElementById("status-icon");
    this.statusText = document.getElementById("status-text");

    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Updates the status card state.
   * @param {boolean} isScrollingEnabled
   */
  updateStatus(isScrollingEnabled) {
    if (isScrollingEnabled) {
      if (this.statusText.innerText !== "Scroll Active") {
        this.statusIcon.innerText = "⚪"; // White circle
        this.statusText.innerText = "Scroll Active";
        this.statusText.style.color = "#FFFFFF";
      }
    } else {
      if (this.statusText.innerText !== "Pinch to Scroll") {
        this.statusIcon.innerText = "○"; // Empty circle
        this.statusText.innerText = "Pinch to Scroll";
        this.statusText.style.color = "#8A8A93"; // Muted text
      }
    }
  }

  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the tracking dot at the specified coordinates.
   * @param {number} x - Normalized X coordinate (0-1)
   * @param {number} y - Normalized Y coordinate (0-1)
   * @param {boolean} isPinching - Whether the user is currently pinching
   */
  drawCursor(x, y, isPinching) {
    // Mirror X because webcam is mirrored
    const screenX = (1 - x) * this.canvas.width;
    const screenY = y * this.canvas.height;

    // Draw Zone Lines (Extremely subtle)
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    this.ctx.lineWidth = 1;

    // Top Line (20%)
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.height * 0.2);
    this.ctx.lineTo(this.canvas.width, this.canvas.height * 0.2);
    this.ctx.stroke();

    // Bottom Line (80%)
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.height * 0.8);
    this.ctx.lineTo(this.canvas.width, this.canvas.height * 0.8);
    this.ctx.stroke();

    // Cursor
    this.ctx.beginPath();
    this.ctx.arc(screenX, screenY, isPinching ? 12 : 6, 0, 2 * Math.PI);
    this.ctx.fillStyle = isPinching ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)";
    this.ctx.fill();

    // Add a gentle white glow on pinch
    if (isPinching) {
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
      this.ctx.stroke();
      this.ctx.shadowBlur = 0; // Reset
    }
  }
}
