import { Container } from "@coconut-xr/koestlich";
import FastForwardButton from "./FastForwardButton.tsx";
import PausePlayButton from "./PausePlayButton.tsx"
import RewindButton from "./RewindButton.tsx";

function MediaControls() {

  return (
    <Container
      positionType="absolute"
      positionLeft={0}
      positionRight={0}
      positionBottom={36}
      flexDirection="row"
      justifyContent="center"
    >
      <RewindButton />
      <PausePlayButton />
      <FastForwardButton />
    </Container>
  );
}

export default MediaControls;
