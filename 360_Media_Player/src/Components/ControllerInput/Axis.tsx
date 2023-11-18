import { FC, useState } from "react";
import { ButtonState, useXRGamepadReader } from "@coconut-xr/natuerlich/react";
import { useFrame, useThree } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { toggeIlsHidden, updateMenuPosition, updateMenuRotation } from "../../Slices/MenuSlice.tsx";
import * as THREE from 'three';

export const Axis: FC<{ inputSource: XRInputSource; button: string }> = ({ button, inputSource }) => {
  const reader = useXRGamepadReader(inputSource);
  const [value, setValue] = useState(0);
  const [state, setState] = useState<ButtonState | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const camera = useThree((state) => state.camera);

  const dispatch = useDispatch();

  const setNewMenuPositionAndRotation = (cameraPosition: any, cameraRotation: any) => {
    const distance = 1;
    const height = 0;

    // Calculate the menu's position based on the camera's position and direction
    const directionVector = new THREE.Vector3(0, 0, -1);
    directionVector.applyEuler(cameraRotation);
    const objectPosition = new THREE.Vector3().copy(cameraPosition).add(directionVector.multiplyScalar(distance));
    objectPosition.y += height;

    // Calculate the menu's rotation using a quaternion to face the camera
    const menuQuaternion = new THREE.Quaternion();
    menuQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), cameraRotation.y);

    const objectPositionVectorsOnly = [objectPosition.x, objectPosition.y, objectPosition.z];
    const objectRotationVectorsOnly = [cameraRotation.x, cameraRotation.y, cameraRotation.z];

    dispatch(updateMenuPosition(objectPositionVectorsOnly));
    dispatch(updateMenuRotation(objectRotationVectorsOnly));
  };


  useFrame(() => {
    const buttonValue = reader.readButtonValue(button);
    const buttonState = reader.readButtonState(button);

    if (previousValue === null) {
      setPreviousValue(buttonValue);
    }

    if (button === 'a-button' && buttonValue !== 0 && buttonValue !== previousValue) {
      setPreviousValue(buttonValue);
      dispatch(toggeIlsHidden());
      setNewMenuPositionAndRotation(camera.position, camera.rotation);
    } else if (button === 'a-button' && buttonValue === 0 && buttonValue !== previousValue) {
      setPreviousValue(buttonValue);
    }

    setState(buttonState);
    setValue(buttonValue);
  });

  return (
    <></>
  );
};
