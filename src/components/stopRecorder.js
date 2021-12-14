import { stopStream } from './stopStream';

export const stopRecorder = () => {
  if ('MediaRecorder' in window && window.MediaRecorder.state === 'recording') {
    window.MediaRecorder.stop();
    console.log(window.MediaRecorder.state);
    window.MediaRecorder.onstop = () => {
      window.blobvid = new Blob(window.dataChunks, { type: 'video/webm' });
      // reset dataChunks (for consecutive videos)
      window.dataChunks = [];
      window.videoURL = window.URL.createObjectURL(window.blobvid);
      // tack to the videoPlayback element
      const videoPlayback = document.getElementById('video-playback');
      videoPlayback.src = window.videoURL;
    };
  }
  stopStream();
};
