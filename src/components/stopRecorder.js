import { stopStream } from './stopStream';

export const stopRecorder = () => {
  if ('mediaRecorder' in window && window.mediaRecorder.state === 'recording') {
    window.mediaRecorder.stop();
    console.log(window.mediaRecorder.state);
    window.mediaRecorder.onstop = () => {
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
