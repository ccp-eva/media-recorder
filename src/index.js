import { injectShell } from './components/injectShell';
import { logMediaDevices } from './components/logMediaDevices';
import { toggleModal } from './components/toggleModal';
import {
  toggleVideoPreview,
  toggleVideoPlayback,
} from './components/toggleStream';
import { modalContent } from './components/modalContent';
import { startStream } from './components/startStream';
import { stopStream } from './components/stopStream';
import { startRecorder } from './components/startRecorder';
import { stopRecorder } from './components/stopRecorder';
import { uploadVideo } from './components/uploadVideo';

injectShell();
logMediaDevices();

// Attaching functions to window object for development!
if (process.env.NODE_ENV !== 'production') {
  console.log('functions exposed to window object');
  window.injectShell = injectShell;
  window.logMediaDevices = logMediaDevices;
  window.toggleModal = toggleModal;
  window.toggleVideoPreview = toggleVideoPreview;
  window.toggleVideoPlayback = toggleVideoPlayback;
  window.modalContent = modalContent;
  window.startStream = startStream;
  window.stopStream = stopStream;
  window.startRecorder = startRecorder;
  window.stopRecorder = stopRecorder;
  window.uploadVideo = uploadVideo;
}

export {
  injectShell,
  logMediaDevices,
  toggleModal,
  toggleVideoPreview,
  toggleVideoPlayback,
  modalContent,
  startStream,
  stopStream,
  startRecorder,
  stopRecorder,
  uploadVideo,
};
