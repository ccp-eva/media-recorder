export const modalContent = (
  htmlContent = '<h1>Hi</h1>',
  backgroundColor = 'deeppink',
) => {
  const getModalContent = document.getElementById('modal-content');
  const getModalBackground = document.getElementById('modal');
  // override default background
  getModalBackground.style.backgroundColor = backgroundColor;

  if (htmlContent === '#video-preview') {
    // make sure to hide #video-playback
    document.getElementById('video-playback').style.display = 'none';
    // make sure the clean residual content in getModalContent
    getModalContent.innerHTML = '';
    // show #video-preview
    document.getElementById('video-preview').style.display = 'block';
  } else if (htmlContent === '#video-playback') {
    // make sure to hide #video-preview
    document.getElementById('video-preview').style.display = 'none';
    getModalContent.innerHTML = '';
    // show #video-playback
    document.getElementById('video-playback').style.display = 'block';
  } else {
    // make sure to hide both
    document.getElementById('video-preview').style.display = 'none';
    document.getElementById('video-playback').style.display = 'none';
    // show provided html cotent
    getModalContent.innerHTML = htmlContent;
  }
  // show modal
  window.location.href = '#greeting-modal';
};
