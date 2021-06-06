import { injectShell } from './functions/injectShell';
import { toggleModal } from './functions/toggleModal';
import { logMediaDevices } from './functions/logMediaDevices';
import { modalContent } from './functions/modalContent';
import { startStream } from './functions/startStream';
import { stopStream } from './functions/stopStream';
import { startRecorder } from './functions/startRecorder';
import { stopRecorder } from './functions/stopRecorder';
import { uploadVideo } from './functions/uploadVideo';

injectShell();
logMediaDevices();

// window.injectShell = injectShell;
// window.toggleModal = toggleModal;

export {
  injectShell,
  toggleModal,
  startStream,
  stopStream,
  startRecorder,
  stopRecorder,
  uploadVideo,
  modalContent,
};
