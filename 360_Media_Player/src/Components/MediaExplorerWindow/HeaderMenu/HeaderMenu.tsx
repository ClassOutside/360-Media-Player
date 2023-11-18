import { Container, Text, Image } from "@coconut-xr/koestlich";
import { Suspense } from "react";
import PreviousDirectoryButton from "./PreviousDirectoryButton.tsx";
import pageBackImage_base64 from '../../../Images/logo_base64.json'

const imageType = 'data:image/png;base64,';
const logoImage = pageBackImage_base64.image;

export function HeaderMenu() {

  return (
    <Container
      flexDirection="row"
      justifyContent="space-between"
      paddingTop={8}
    >
      <Container paddingX={8} paddingY={8}>
        <Suspense>
          <Container
            flexDirection="row"
            justifyContent="space-between"
            paddingTop={8}
          >
            <Image
              url={`${imageType}${logoImage}`}
              height={40}
              width={40}
              borderRadius={8}
              paddingRight={8}
            />
            <Text fontSize={26} color="white" fontFamily="bold" paddingLeft={8}>
              360 Media Player
            </Text>
          </Container>
          <Container
            flexDirection="row"
            justifyContent="space-between"
            paddingTop={8}
          >
            <PreviousDirectoryButton />
          </Container>
        </Suspense>
      </Container>
    </Container>
  )
}