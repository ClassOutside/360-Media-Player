import { useEnterXR } from "@coconut-xr/natuerlich/react";

const EnterARButton = () => {
  const sessionOptions: XRSessionInit = {
    requiredFeatures: ["local-floor", "hand-tracking"],
  };

  const enterAR = useEnterXR("immersive-ar", sessionOptions);

  const buttonStyles: React.CSSProperties = {
    padding: "1rem",
    position: "absolute",
    top: "5rem",
    left: "1rem",
  };

  return (
    <button style={buttonStyles} onClick={enterAR}>
      AR
    </button>
  );
};

export default EnterARButton;
