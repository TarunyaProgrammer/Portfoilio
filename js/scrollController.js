/**
 * Scroll Controller Module
 * Handles the mapping of gesture data to page scrolling using physics.
 */

export class ScrollController {
  constructor() {
    this.currentSpeed = 0;
    this.targetSpeed = 0;
    this.isScrolling = false;

    // Physics Configuration
    this.lerpFactor = 0.08; // Lower = smoother/heavier, Higher = more responsive
    this.stopThreshold = 0.1;

    // Start the physics loop
    this.update();
  }

  /**
   * Sets the target scroll speed.
   * @param {number} speed - Pixels per frame (Positive = Down, Negative = Up)
   */
  setTargetSpeed(speed) {
    this.targetSpeed = speed;
  }

  /**
   * Main Physics Loop
   */
  update() {
    // 1. Interpolate current speed towards target speed (LERP)
    this.currentSpeed +=
      (this.targetSpeed - this.currentSpeed) * this.lerpFactor;

    // 2. Apply Scroll if significant
    if (Math.abs(this.currentSpeed) > this.stopThreshold) {
      window.scrollBy({
        top: this.currentSpeed,
        behavior: "auto", // We handle smoothing, browser does instant updates
      });
    } else {
      // Snap to 0 if very small to save resources, unless target is non-zero
      if (this.targetSpeed === 0) {
        this.currentSpeed = 0;
      }
    }

    // Loop
    requestAnimationFrame(this.update.bind(this));
  }
}
