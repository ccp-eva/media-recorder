import { startStream } from './startStream';

export const startRecorder = (
  constraintObject = {
    audio: true,
    video: { facingMode: 'user' },
    frameRate: 15,
  },
) => {
  // check if there is an active stream, if not start one
  if (!('localStream' in window && window.localStream.active)) {
    startStream(constraintObject);
  }
  // todo use a promise here instead of timeout
  setTimeout(() => {
    let options = { mimeType: 'video/webm;codecs=vp9,opus' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not supported`);
      options = { mimeType: 'video/webm;codecs=vp8,opus' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        options = { mimeType: 'video/webm' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error(`${options.mimeType} is not supported`);
          options = { mimeType: '' };
        }
      }
    }
    // recrod stream
    window.mediaRecorder = new MediaRecorder(window.localStream, options);
    window.dataChunks = [];
    window.mediaRecorder.start();
    console.log(window.mediaRecorder.state);
    window.mediaRecorder.ondataavailable = (e) =>
      window.dataChunks.push(e.data);
  }, 2000);
};
