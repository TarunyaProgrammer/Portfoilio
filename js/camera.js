/**
 * Camera Module
 * Handles webcam initialization and stream management.
 */

export class CameraModule {
  constructor() {
    this.videoElement = document.getElementById("input-video");
    if (!this.videoElement) {
      console.error("CameraModule: 'input-video' element not found.");
    }
  }

  /**
   * Initializes the webcam stream.
   * @returns {Promise<HTMLVideoElement>} The video element with active stream.
   */
  async startCamera() {
    try {
      // Constraints: Prefer user-facing camera, simplified resolution for performance
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = stream;

      return new Promise((resolve) => {
        this.videoElement.onloadedmetadata = () => {
          this.videoElement.play();
          console.log("CameraModule: Webcam started successfully.");
          resolve(this.videoElement);
        };
      });
    } catch (error) {
      console.error("CameraModule: Error accessing webcam.", error);
      alert(
        "Camera access denied or not available. Please allow camera access to use AirScroll."
      );
      throw error;
    }
  }

  stopCamera() {
    const stream = this.videoElement.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      this.videoElement.srcObject = null;
    }
  }
}
