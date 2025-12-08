import * as faceapi from "face-api.js";

export function drawBoundingBox(videoEl, canvasEl, detections) {
  const displaySize = {
    width: videoEl.videoWidth,
    height: videoEl.videoHeight,
  };

  faceapi.matchDimensions(canvasEl, displaySize);

  const resized = faceapi.resizeResults(detections, displaySize);

  const ctx = canvasEl.getContext("2d");
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  faceapi.draw.drawDetections(canvasEl, resized);
  faceapi.draw.drawFaceLandmarks(canvasEl, resized);
}
