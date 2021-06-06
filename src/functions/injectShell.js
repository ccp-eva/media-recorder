export const injectShell = () => {
  // MODAL CSS STYLE
  const modalStyle = document.createElement('style');
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
  #greeting-modal #modal {
    opacity: 0;
    transform: translateY(-1rem);
    transition: all 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
    transition-delay: 0.1s;
  }
  
  /* Greeting Modal - when open */
  #greeting-modal:target #modal {
  transform: translateY(0);
  opacity: 1;
  }
  
  /* Modal Container Styles for flex box */
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
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
  #modal {
    z-index: 1;
    background-color: white;
    width: max-content; /* 500px */
    padding: 1rem;
    border-radius: 8px;
  }
  
  #modal .close {
    position: absolute;
    right: -16px;
    top: -16px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
  }
  #modal .close:hover {
    opacity: 1;
  }

  #modal .close:before, .close:after {
    position: absolute;
    left: 16px;
    content: ' ';
    height: 34px;
    width: 3px;
    background-color: #333;
  }
  #modal .close:before {
    transform: rotate(45deg);
  }
  #modal .close:after {
    transform: rotate(-45deg);
  }
  
  
`;

  // attach modal css style to head
  document.head.appendChild(modalStyle);

  // MODAL & VIDEO DOM FRAGMENTS
  const modalDOM = document.createRange().createContextualFragment(`
  <!-- Modal container -->
  <div class="modal-container" id="greeting-modal">

    <!-- Modal  -->
    <div id="modal">
      <video id="video-preview" muted style="display: none;"></video>
      <video id="video-playback" controls style="display: none"></video>
      <div id="modal-content"></div>
      <a href="#" class="close">
    </div>

    <!-- Background, click to close -->
    <a href="#" class="modal-bg"></a>
  </div>
`);

  // attach modal DOM fragment to body
  document.body.appendChild(modalDOM);
};
