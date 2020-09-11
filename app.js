// MEDIA CONSTRAINT OBJECT
// NB https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
const constraintObj = {
  audio: true,
  video: true,
  // video: {
  //   facingMode: "user",
  //   width: { min: 640, ideal: 1280, max: 1920 },
  //   height: { min: 480, ideal: 720, max: 1080 }
  // }

  // Other useful props:
  // width: 1280, height: 720  -- preference only
  // facingMode: {exact: "user"} // forcing to be user camera
  // facingMode: "environment"
};

// MODAL CSS STYLE
const modalStyle = document.createElement("style");
modalStyle.innerHTML = `
/* Greeting Modal Container */
#greeting-modal {
visibility: hidden;
opacity: 0;
transition: all 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

/* Greeting Modal Container - when open */
#greeting-modal:target {
visibility: visible;
opacity: 1;
}

/* Greeting Modal */
#greeting-modal .modal {
opacity: 0;
transform: translateY(-1rem);
transition: all 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
transition-delay: 0.1s;
}

/* Greeting Modal - when open */
#greeting-modal:target .modal {
transform: translateY(0);
opacity: 1;
}

/* Modal Container Styles */
.modal-container {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
justify-content: center;
align-items: center;
}

/* Modal Background Styles */
.modal-bg {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.3);
backdrop-filter: blur(5px);
}

/* Modal Body Styles */
.modal {
z-index: 1;
background-color: white;
width: min-content;
padding: 1rem;
border-radius: 8px;
}
`;
// attach modal css style to head
// todo: tidy-up the positions
document.head.appendChild(modalStyle);

// MODAL & VIDEO DOM FRAGMENTS
const modalDOM = document.createRange().createContextualFragment(`
<!-- Modal container -->
<div class="modal-container" id="greeting-modal">
<!-- Modal  -->
<div class="modal">
<video id="video-preview" muted></video>
<video id="video-playback" controls style="display: none"></video>
</div>

<!-- Background, click to close -->
<a href="#" class="modal-bg"></a>
</div>
`);
// attach modal DOM fragment to body
// todo: tidy-up the position
document.body.appendChild(modalDOM);

// FUNCTIONS
// handle older browsers that might implement getUserMedia in some way
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
  navigator.mediaDevices.getUserMedia = function (constraintObj) {
    const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!getUserMedia) {
      return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
    }
    return new Promise(function (resolve, reject) {
      getUserMedia.call(navigator, constraintObj, resolve, reject);
    });
  };
} else {
  // this logs all Audio/Video IO connections:
  navigator.mediaDevices
    .enumerateDevices()
    .then(devices => {
      devices.forEach(device => {
        console.log(device.kind.toUpperCase(), device.label);
        //, device.deviceId
      });
    })
    .catch(err => {
      console.log(err.name, err.message);
    });
}

const toggleModal = () =>
  window.location.href.indexOf("#greeting-modal") !== -1
    ? (window.location.href = "#")
    : (window.location.href = "#greeting-modal");

const startWebcamStream = () => {
  navigator.mediaDevices
    .getUserMedia(constraintObj)
    .then(stream => {
      window.localStream = stream;
      const video = document.querySelector("#video-preview");

      if ("srcObject" in video) {
        video.srcObject = stream;
      } else {
        // legacy version
        video.src = window.URL.createObjectURL(stream);
      }

      // Display stream
      video.onloadedmetadata = () => video.play();
    })
    .catch(err => console.log(err.name, err.message));
};

const stopWebcamStream = () => {
  if ("localStream" in window) {
    localStream.getTracks().forEach(track => track.stop());
  }
};

const startWebcamRecorder = () => {
  // check if there is an active stream, if not start one
  if (!("localStream" in window && localStream.active)) {
    startWebcamStream();
  }
  // todo use promise here instead of timeout
  setTimeout(() => {
    // recrod stream
    window.mediaRecorder = new MediaRecorder(localStream);
    window.dataChunks = [];
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    mediaRecorder.ondataavailable = e => dataChunks.push(e.data);
  }, 2000);
};

const stopWebcamRecorder = () => {
  if ("mediaRecorder" in window && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    mediaRecorder.onstop = () => {
      window.blob = new Blob(dataChunks, { type: "video/mp4;" });
      // reset dataChunks (for consecutive videos)
      dataChunks = [];
      let videoURL = window.URL.createObjectURL(blob);
      // tack to the videoPlayback element
      const videoPlayback = document.getElementById("video-playback");
      videoPlayback.src = videoURL;
    };
  }
  stopWebcamStream();
};

const playbackRecording = () => {
  // check if there is something to playback within the video-playback element
  if (!!document.querySelector("#video-playback").src) {
    // hide the preview element
    document.querySelector("#video-preview").style.display = "none";
    // show the playback element
    document.querySelector("#video-playback").style.display = "block";
    // show the modal
    toggleModal();
  }
};
