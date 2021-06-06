import { injectShell } from './injectShell';

export const startStream = (
  constraintObject = {
    audio: true,
    video: { facingMode: 'user', frameRate: 15 },
  },
) => {
  if (!document.getElementById('greeting-modal')) {
    injectShell();
  }
  navigator.mediaDevices
    .getUserMedia(constraintObject)
    .then((stream) => {
      window.localStream = stream;
      const video = document.querySelector('#video-preview');

      if ('srcObject' in video) {
        video.srcObject = stream;
      } else {
        // legacy version
        video.src = window.URL.createObjectURL(stream);
      }

      // Attach stream
      video.onloadedmetadata = () => video.play();
    })
    .catch((err) => console.log(err.name, err.message));
};
