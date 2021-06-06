// upload the blob
// default filename (fname) is ISO 8601 timestamp (character-adjusted due to filename limitations)
export const uploadVideo = (modalObj) => {
  // only continue if there something if there is a video blob
  if ('blob' in window) {
    // prevent browser to close
    window.onbeforeunload = (e) => {
      // Cancel the event
      // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      e.preventDefault();
      // Chrome requires returnValue to be set
      e.returnValue = '';
    };

    const modalObjectDefaults = {
      fname: new Date().toISOString().replaceAll(':', '-').replace('.', '-'),
      uploadContent: '<h1>Uploading</h1>',
      uploadColor: 'coral',
      successContent: '<h1>Successful</h1>',
      successColor: 'cyan',
    };

    // merge modal user object with the default modal object
    const modalObject = { ...modalObjectDefaults, ...modalObj };

    // show uploading dialog
    modalContent(modalObject.uploadContent, modalObject.uploadColor);

    // ☁️ upload process starts here...
    // define endpoint
    const endpoint = 'upload_video.php';
    // Create a FormData object
    const formData = new FormData();
    // append the video file (i.e., the recorded blob)
    formData.append('vidfile', window.blob, modalObject.fname);
    // post the file using fetch
    fetch(endpoint, {
      method: 'POST',
      body: formData, // formData
    })
      .then()
      .then(() => {
        // release closing lock
        window.onbeforeunload = null;
        modalContent(modalObject.successContent, modalObject.successColor);
      })
      .catch(console.error);
  } else {
    // if no blob is in window show warning:
    modalContent('<h1>No recording was found 😔</h1>', 'PeachPuff');
  }
};
