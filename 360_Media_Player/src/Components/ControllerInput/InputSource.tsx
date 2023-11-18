import { FC } from "react";
import { Axes } from "./Axes.tsx";
import { Axis } from "./Axis.tsx";
import { Container } from "@coconut-xr/koestlich";

export const InputSource: FC<{ inputSource: XRInputSource }> = ({ inputSource }) => {
  const axes = [
    ...(inputSource.handedness === "left"
      ? ["x-button", "y-button"]
      : ["a-button", "b-button"]),
    "xr-standard-trigger",
    "xr-standard-squeeze",
    "thumbrest"
  ];
  return (
    <Container gapRow={10}>
      <Axes inputSource={inputSource} />
      {axes.map((ax) => (
        <Axis key={ax} inputSource={inputSource} button={ax} />
      ))}
    </Container>
  );
};
