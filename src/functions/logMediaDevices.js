// logs all Audio/Video IO connections:
export const logMediaDevices = (
  showDeviceKind = true,
  showDeviceLabel = true,
  showDeviceId = false,
) => {
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        console.log(
          `${showDeviceKind && device.kind.toUpperCase()}, ${
            showDeviceLabel && device.label
          }, ${showDeviceId && device.deviceId}`,
        );
      });
    })
    .catch((err) => {
      console.log(err.name, err.message);
    });
};
