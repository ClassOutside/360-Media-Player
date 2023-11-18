import { FC, Suspense } from "react";
import { RootContainer } from "@coconut-xr/koestlich";
import { useInputSources } from "@coconut-xr/natuerlich/react";
import { useThree } from "@react-three/fiber";
import { InputSource } from "./InputSource.tsx";

export const Gamepad: FC = () => {
  const aspectRatio = useThree(({ size }) => size.width / size.height);
  const inputSources = useInputSources();
  const left = inputSources.find((s) => s.handedness === "left");
  const right = inputSources.find((s) => s.handedness === "right");

  return (
    <group
      position={[0, 1.5, -0.4]}
      scale={Math.min(1, aspectRatio * 0.7) / 1200}
    >
      <Suspense>
        <RootContainer
          anchorX="center"
          anchorY="center"
          sizeX={1200}
          sizeY={700}
          pixelSize={1}
          positionType="relative"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {left && <InputSource inputSource={left} />}
          {right && <InputSource inputSource={right} />}
        </RootContainer>
      </Suspense>
    </group>
  );
};
