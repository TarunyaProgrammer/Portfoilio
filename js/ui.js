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
      if (this.statusText.innerText !== "Scroll Enabled") {
        this.statusCard.className = "status-active";
        this.statusIcon.innerText = "🟢";
        this.statusText.innerText = "Scroll Enabled";
      }
    } else {
      if (this.statusText.innerText !== "Pinch to Activate") {
        this.statusCard.className = "status-inactive";
        this.statusIcon.innerText = "🔴";
        this.statusText.innerText = "Pinch to Activate";
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

    // Draw Zone Lines
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
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
    this.ctx.arc(screenX, screenY, isPinching ? 15 : 10, 0, 2 * Math.PI);
    this.ctx.fillStyle = isPinching ? "#00F5FF" : "#ffffff";
    this.ctx.fill();

    // Add a glow effect
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = isPinching ? "#00F5FF" : "#ffffff";
    this.ctx.stroke();
    this.ctx.shadowBlur = 0; // Reset
  }
}
