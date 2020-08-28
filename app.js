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
// todo: tidy-up the position
document.head.appendChild(modalStyle);

// MODAL DOM FRAGMENT
const modalDOM = document.createRange().createContextualFragment(`
<!-- Modal container -->
<div class="modal-container" id="greeting-modal">
<!-- Modal  -->
<div class="modal">
<video id="video-preview" muted></video>
<video id="video-playback" controls></video>
</div>

<!-- Background, click to close -->
<a href="#" class="modal-bg"></a>
</div>
`);
// attach modal DOM fragment to body
// todo: tidy-up the position
document.body.appendChild(modalDOM);

const toggleModal = () =>
  window.location.href.indexOf("#greeting-modal") !== -1
    ? (window.location.href = "#")
    : (window.location.href = "#greeting-modal");

const constraintObj = { audio: true, video: true };

const startWebcamStream = () => {
  navigator.mediaDevices
    .getUserMedia(constraintObj)
    .then(stream => {
      window.localStream = stream;
      const video = document.querySelector("#video-preview");

      video.srcObject = stream;

      // Display stream
      video.onloadedmetadata = () => video.play();
    })
    .catch(err => console.log(err.name, err.message));
};

const stopWebcamStream = () => localStream.getTracks().forEach(track => track.stop());

const startWebcamRecorder = () => {
  if ("localStream" in window && localStream.active) {
    window.mediaRecorder = new MediaRecorder(localStream);
    window.dataChunks = [];
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    mediaRecorder.ondataavailable = e => dataChunks.push(e.data);
  }
};

const stopWebcamRecorder = () => {
  if ("mediaRecorder" in window && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    mediaRecorder.onstop = () => {
      let blob = new Blob(dataChunks, { type: "video/mp4;" });
      dataChunks = [];
      let videoURL = window.URL.createObjectURL(blob);
      const videoPlayback = document.getElementById("video-playback");
      videoPlayback.src = videoURL;
    };
  }
};

// TODO
const playbackRecording = () => {};

// navigator.mediaDevices
//   .getUserMedia(constraintObj)
//   .then(stream => {
//     window.localStream = stream;
//     const video = document.querySelector("#video-preview");

//     video.srcObject = stream;

//     // Display stream
//     video.onloadedmetadata = () => video.play();

//     // Recording
//     const start = document.getElementById("button-start");
//     const stop = document.getElementById("button-stop");
//     const videoPlayback = document.getElementById("video-playback");

//     const mediaRecorder = new MediaRecorder(stream);
//     let dataChunks = [];

//     // add listeners for start/stop clicks
//     start.addEventListener("click", () => {
//       mediaRecorder.start();
//       console.log(mediaRecorder.state);
//     });
//     stop.addEventListener("click", () => {
//       mediaRecorder.stop();
//       console.log(mediaRecorder.state);
//     });

//     // store data chunks while recording
//     mediaRecorder.ondataavailable = function (ev) {
//       dataChunks.push(ev.data);
//     };

//     // Pressing stop
//     mediaRecorder.onstop = () => {
//       let blob = new Blob(dataChunks, { type: "video/mp4;" });
//       // if there is another recording it is good to reset the data chunks, otherwise this gets appended
//       dataChunks = [];
//       // convert blob into objectURL
//       let videoURL = window.URL.createObjectURL(blob);
//       videoPlayback.src = videoURL;
//     };
//   })
//   .catch(err => {
//     console.log(err.name, err.message);
//   });
