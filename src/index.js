import { injectShell } from './components/injectShell';
import { toggleModal } from './components/toggleModal';
import { logMediaDevices } from './components/logMediaDevices';
import { modalContent } from './components/modalContent';
import { startStream } from './components/startStream';
import { stopStream } from './components/stopStream';
import { startRecorder } from './components/startRecorder';
import { stopRecorder } from './components/stopRecorder';
import { uploadVideo } from './components/uploadVideo';
import {
  toggleVideoPreview,
  toggleVideoPlayback,
} from './components/toggleStream';

injectShell();
logMediaDevices();

// window.injectShell = injectShell;
// window.toggleModal = toggleModal;

export {
  injectShell,
  toggleModal,
  toggleVideoPreview,
  toggleVideoPlayback,
  startStream,
  stopStream,
  startRecorder,
  stopRecorder,
  uploadVideo,
  modalContent,
};
