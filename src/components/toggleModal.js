// UTILITY FUNCTIONS
export const toggleModal = () => {
  window.location.href =
    window.location.href.indexOf('#greeting-modal') !== -1
      ? '#'
      : '#greeting-modal';
};
