import * as faceapi from "face-api.js";

// detect with bounding box + descriptor
export async function detectFace(videoEl) {

  const result = await faceapi
    .detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!result) return null;

  return {
    detection: result.detection,
    landmarks: result.landmarks,
    descriptor: Array.from(result.descriptor)
  };
}
