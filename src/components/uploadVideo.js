import { modalContent } from './modalContent';
// upload the blobvid
// default filename (fname) is ISO 8601 timestamp (character-adjusted due to filename limitations)
export const uploadVideo = (modalObj, endpointPath = 'upload_video.php') => {
  // only continue if there something if there is a video blobvid
  if (window.blobvid) {
    // // prevent browser to close
    // window.onbeforeunload = (e) => {
    //   // Cancel the event
    //   // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    //   e.preventDefault();
    //   // Chrome requires returnValue to be set
    //   e.returnValue = '';
    // };

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
    // define explicit endpoint as string (defaults to: "upload_video.php")
    const endpoint = endpointPath;
    // Create a FormData object
    const formData = new FormData();
    // append the video file (i.e., the recorded blobvid)
    formData.append('vidfile', window.blobvid, modalObject.fname);
    // post the file using fetch
    fetch(endpoint, {
      method: 'POST',
      body: formData, // formData
    })
      .then(() => {
        // release closing lock
        // window.onbeforeunload = null;
        modalContent(modalObject.successContent, modalObject.successColor);
      })
      .catch(console.error);
  } else {
    // if no blobvid is in window show warning:
    modalContent('<h1>No recording was found 😔</h1>', 'PeachPuff');
  }
};
