import { stopStream } from './stopStream';

export const stopRecorder = () => {
  if ('MediaRecorder' in window && window.MediaRecorder.state === 'recording') {
    window.MediaRecorder.stop();
    console.log(window.MediaRecorder.state);
    window.MediaRecorder.onstop = () => {
      window.blob = new Blob(window.dataChunks, { type: 'video/webm' });
      // reset dataChunks (for consecutive videos)
      window.dataChunks = [];
      const videoURL = window.URL.createObjectURL(window.blob);
      // tack to the videoPlayback element
      const videoPlayback = document.getElementById('video-playback');
      videoPlayback.src = videoURL;
    };
  }
  stopStream();
};
