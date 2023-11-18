import { useEnterXR } from "@coconut-xr/natuerlich/react";

const EnterVRButton = () => {
  const sessionOptions: XRSessionInit = {
    requiredFeatures: ["local-floor", "hand-tracking"],
  };

  const enterVR = useEnterXR("immersive-vr", sessionOptions);

  const buttonStyles: React.CSSProperties = {
    padding: "1rem",
    position: "absolute",
    top: "1rem",
    left: "1rem",
  };

  return (
    <button style={buttonStyles} onClick={enterVR}>
      VR
    </button>
  );
};

export default EnterVRButton;
