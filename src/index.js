import { injectShell } from './components/injectShell';
import { logMediaDevices } from './components/logMediaDevices';
import { toggleModal } from './components/toggleModal';
import { openVideoPreview, openVideoPlayback } from './components/openStream';
import { modalContent } from './components/modalContent';
import { startStream } from './components/startStream';
import { stopStream } from './components/stopStream';
import { startRecorder } from './components/startRecorder';
import { stopRecorder } from './components/stopRecorder';
import { uploadVideo } from './components/uploadVideo';
import { downloadVideo } from './components/downloadVideo';

// always injectShell
injectShell();

// Attaching functions to window object for development!
if (process.env.NODE_ENV !== 'production') {
  console.log(
    'You are not in production. mrec functions are exposed within global mrec object',
  );
  window.mrec = {
    logMediaDevices,
    toggleModal,
    openVideoPreview,
    openVideoPlayback,
    modalContent,
    startStream,
    stopStream,
    startRecorder,
    stopRecorder,
    uploadVideo,
    downloadVideo,
  };
}

export {
  logMediaDevices,
  toggleModal,
  openVideoPreview,
  openVideoPlayback,
  modalContent,
  startStream,
  stopStream,
  startRecorder,
  stopRecorder,
  uploadVideo,
  downloadVideo,
};
