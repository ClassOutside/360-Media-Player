import { Container, Text } from "@coconut-xr/koestlich";
import { GreyPanel } from '../../GreyPanel.tsx'
import MediaGrid from "./MediaGrid.tsx";
import PageControls from "../PageControls/PageControls.tsx";
import { HeaderMenu } from "../HeaderMenu/HeaderMenu.tsx";

function MediaExplorer() {
  return (
    <GreyPanel
      flexGrow={1}
      flexShrink={1}
      borderRadiusTopRight={32}
      borderRadiusBottomRight={32}
      borderRadiusTopLeft={32}
      borderRadiusBottomLeft={32}
    >
      <Container
        flexGrow={1}
        flexShrink={1}
        flexDirection="column"
        alignItems="stretch"
        paddingX={24}
        gapRow={16}
      >
        <HeaderMenu />
        <MediaGrid />
        <PageControls />
      </Container>
    </GreyPanel>
  );
}

export default MediaExplorer;
