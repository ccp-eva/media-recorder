import { injectShell } from './injectShell';

// UTILITY FUNCTIONS
export const toggleModal = () => {
  // check for injected modal components
  if (!document.getElementById('greeting-modal')) {
    injectShell();
  }
  window.location.href =
    window.location.href.indexOf('#greeting-modal') !== -1
      ? '#'
      : '#greeting-modal';
};
