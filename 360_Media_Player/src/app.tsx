import { useEffect } from "react";
import { XRCanvas } from "@coconut-xr/natuerlich/defaults";
import { NonImmersiveCamera } from "@coconut-xr/natuerlich/react";
import EnterARButton from "./Components/ImmersiveOptions/EnterARButton.tsx";
import EnterVRButton from "./Components/ImmersiveOptions/EnterVRButton.tsx";
import SkySphere from "./Components/SkySphere.tsx";
import MediaPlayer from "./Components/MediaPlayer.tsx";
import ImmersiveSession from "./Components/ImmersiveOptions/ImmersiveSession.tsx";
import { getDirectories } from './Api/ExplorerApi.tsx';
import { useDispatch } from 'react-redux';
import { Gamepad } from "./Components/ControllerInput/Gamepad.tsx";
import { useSelector } from 'react-redux';

export default function Index() {
  const isMenuHidden = useSelector((state: any) => state.menuSlice.isHidden);
  const defaultTree = useSelector((state: any) => state.directory.defaultTree);
  const currentTree = useSelector((state: any) => state.directory.currentTree);
  let isGetDirectoriesLocked: boolean = useSelector((state: any) => state.directory.isGetDirectoriesLocked);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataIfNeeded(defaultTree, currentTree, dispatch);
  }, []);

  const fetchDataIfNeeded = (defaultTree: any, currentTree: any, dispatch: any) => {
    if (typeof currentTree[0].isDefaultTree !== undefined && currentTree[0].isDefaultTree === true) {
      console.log("getting directories")
      getDirectories(dispatch, isGetDirectoriesLocked);
    }
  };

  const buttonContainerStyle = {
    position: 'absolute' as const,
    top: '10px',
    left: '10px',
    zIndex: 1
  };

  return (
    <>
      <div style={buttonContainerStyle}>
        <EnterARButton />
        <EnterVRButton />
      </div>

      <XRCanvas
        dpr={window.devicePixelRatio}
        gl={{ localClippingEnabled: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ImmersiveSession />
        <NonImmersiveCamera position={[0, 1.5, 0.5]} />

        <Gamepad />

        <directionalLight position={[-2, 2, 2]} intensity={0.8} />
        <SkySphere />

        {isMenuHidden === false ? <MediaPlayer /> : null}
      </XRCanvas>
    </>
  );
}
