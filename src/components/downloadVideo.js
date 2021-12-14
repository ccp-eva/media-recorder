export const downloadVideo = (fileName = 'video.webm') => {
  // check if blobvidvid is in window object
  if (window.blobvid) {
    console.log(fileName);

    // create link
    const link = document.createElement('a');
    link.href = window.videoURL;
    link.download = fileName;
    link.click();

    // remove link
    link.remove();
  } else {
    console.log('Not video found in window object');
  }
};
