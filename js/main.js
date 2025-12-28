/**
 * Main Entry Point
 * Integrates all modules to start AirScroll.
 */

import { CameraModule } from "./camera.js";
import { UIModule } from "./ui.js";
import { ScrollController } from "./scrollController.js";
import { GestureEngine } from "./gestureEngine.js";

// Custom Cursor Logic
const cursor = document.getElementById("custom-cursor");
if (cursor) {
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out",
    });
  });
}

async function initApp() {
  console.log("AirScroll: Initializing...");

  // 1. Initialize UI
  const ui = new UIModule();

  // 2. Initialize Camera
  // We start camera first to ensure permissions before heavy ML loading
  const cameraModule = new CameraModule();

  try {
    const videoElement = await cameraModule.startCamera();

    // 3. Initialize Scroll Controller
    const scrollController = new ScrollController();

    // 4. Initialize Gesture Engine
    const gestureEngine = new GestureEngine(videoElement, ui, scrollController);
    await gestureEngine.initialize();

    console.log("AirScroll: Running!");
  } catch (error) {
    console.error("AirScroll: Initialization failed.", error);
    alert(
      "Failed to initialize AirScroll. Please check camera permissions and reload."
    );
  }
}

// Start the app when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
