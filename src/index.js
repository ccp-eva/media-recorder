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

// window.injectShell = injectShell;
// window.toggleModal = toggleModal;

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
