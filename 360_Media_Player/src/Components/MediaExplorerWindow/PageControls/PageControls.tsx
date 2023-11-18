import { Container } from "@coconut-xr/koestlich";
import PageForwardButton from "./PageForwardButton.tsx";
import PageNumber from "./PageNumber.tsx";
import PageBackButton from "./PageBackButton.tsx";

function PageControls() {
  return (
    <Container paddingX={8} paddingY={8}
      positionLeft={0}
      positionRight={0}
      positionBottom={0}
      flexDirection="row"
      justifyContent="center"
    >
      <PageBackButton />
      <PageNumber />
      <PageForwardButton />
    </Container>
  )
}

export default PageControls;