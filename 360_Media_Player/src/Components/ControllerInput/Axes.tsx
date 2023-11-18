import { FC, useState } from "react";
import { useXRGamepadReader } from "@coconut-xr/natuerlich/react";
import { useFrame } from "@react-three/fiber";
import { Vector2 } from "three";
import { loadNextItem, loadPreviousItem } from "../../Utilities/MediaUtility.tsx";
import { useDispatch, useSelector } from "react-redux";

const SIZE = 200;

export const Axes: FC<{ inputSource: XRInputSource }> = ({ inputSource }) => {
  const currentItemName = useSelector((state: any) => state.mediaSlice.currentItemName);
  const currentTree = useSelector((state: any) => state.directory.currentTree);
  const dispatch = useDispatch();
  const reader = useXRGamepadReader(inputSource);
  const [vector] = useState(new Vector2());
  const [x, setX] = useState(0);
  const [optionSelectedLock, setOptionSelectedLock] = useState(false);

  useFrame(() => {
    reader.readAxes("xr-standard-thumbstick", vector);
    setX((vector.x * SIZE) / 2);

    if (x > 80 && optionSelectedLock === false) {
      setOptionSelectedLock(true);
      loadNextItem(dispatch, currentTree, currentItemName);
    } else if (x < -80 && optionSelectedLock === false) {
      setOptionSelectedLock(true);
      loadPreviousItem(dispatch, currentTree, currentItemName);
    } else if (x > -20 && x < 20) {
      setOptionSelectedLock(false);
    }
  });

  return (
    <></>
  );
};
