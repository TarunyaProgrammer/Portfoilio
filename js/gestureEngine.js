/**
 * Gesture Engine
 * Uses MediaPipe Hands to detect features and calculate gestures.
 */

export class GestureEngine {
  constructor(videoElement, uiModule, scrollController) {
    this.videoElement = videoElement;
    this.ui = uiModule;
    this.scrollControl = scrollController;
    this.hands = null;
    this.camera = null;

    // State
    this.lastY = null;
    this.isPinching = false;

    // Configuration
    this.pinchThreshold = 0.03; // Stricter threshold to prevent accidental pinch at edges
  }

  async initialize() {
    this.hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    this.hands.onResults(this.onResults.bind(this));

    // Initialize Camera Utils
    this.camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.hands.send({ image: this.videoElement });
      },
      width: 640,
      height: 480,
    });

    this.camera.start();
    console.log("GestureEngine: MediaPipe Hands initialized.");
  }

  onResults(results) {
    this.ui.clearCanvas();

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];

      // Key Landmarks
      // 4: Thumb Tip
      // 8: Index Finger Tip
      const thumbTip = landmarks[4];
      const indexTip = landmarks[8];

      // 1. Calculate Pinch Distance (Euclidean)
      // Note: depth (z) is also available but x,y is usually sufficient for this logic
      const distance = Math.hypot(
        indexTip.x - thumbTip.x,
        indexTip.y - thumbTip.y
      );

      // 2. Determine State
      const wasPinching = this.isPinching;
      this.isPinching = distance < this.pinchThreshold;

      // 3. UI Updates
      // Draw tracking dot at Index Finger
      this.ui.drawCursor(indexTip.x, indexTip.y, this.isPinching);
      this.ui.updateStatus(this.isPinching);

      // 4. Scroll Logic (Zone Based)
      if (this.isPinching) {
        const y = indexTip.y; // 0 (Top) to 1 (Bottom)

        let scrollSpeed = 0;
        const baseSpeed = 40; // Increased speed for faster scrolling

        // Top Zone (< 20%) -> Scroll UP
        if (y < 0.2) {
          // Calculate how deep into the zone we are (0.2 -> 0.0)
          // Normalize 0.2->0 to 0->1 strength
          const strength = (0.2 - y) / 0.2;
          scrollSpeed = -baseSpeed * strength; // Negative for UP
        }
        // Bottom Zone (> 80%) -> Scroll DOWN
        else if (y > 0.8) {
          // Normalize 0.8->1.0 to 0->1 strength
          const strength = (y - 0.8) / 0.2;
          scrollSpeed = baseSpeed * strength; // Positive for DOWN
        } else {
          // Middle Zone - Stop
          scrollSpeed = 0;
        }

        // Apply Scroll Speed to Controller (Physics will handle smoothing)
        this.scrollControl.setTargetSpeed(scrollSpeed);
      }
    } else {
      // No hands detected or released pinch
      this.isPinching = false;
      this.ui.updateStatus(false);

      // Stop scrolling smoothly
      this.scrollControl.setTargetSpeed(0);
    }
  }
}
