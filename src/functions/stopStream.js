export const stopStream = () => {
  if ('localStream' in window) {
    window.localStream.getTracks().forEach((track) => track.stop());
  }
};
