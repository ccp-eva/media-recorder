export const startRecorder = (
  constraintObject = {
    audio: true,
    video: { facingMode: 'user' },
    frameRate: 15,
  },
) => {
  let options = { mimeType: 'video/webm;codecs=vp9,opus' };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.error(`${options.mimeType} is not supported, using vp8`);
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

  // create a new stream
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

      // recrod stream
      window.MediaRecorder = new MediaRecorder(window.localStream, options);
      window.dataChunks = [];
      window.MediaRecorder.start();
      console.log(window.MediaRecorder.state);
      window.MediaRecorder.ondataavailable = (e) =>
        window.dataChunks.push(e.data);
    })
    .catch((err) => console.log(err.name, err.message));
};
