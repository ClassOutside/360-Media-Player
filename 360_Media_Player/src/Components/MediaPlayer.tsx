import { FontFamilyProvider, RootContainer } from "@coconut-xr/koestlich";
import { useThree } from "@react-three/fiber";
import { Suspense } from "react";
import MediaExplorer from "./MediaExplorerWindow/Window/MediaExplorer.tsx";
import Timeline from "./MediaControls/Timeline.tsx";
import config from "../../application.json";
import React from "react";
import { useSelector } from "react-redux";

function MediaPlayer() {
  const menuPosition = useSelector((state: any) => state.menuSlice.menuPosition);
  const menuRotation = useSelector((state: any) => state.menuSlice.menuRotation);
  const defaultMenuPosition = [0, 1.5, -1]
  const defaultMenuRotation = [0, 0, 0];

  const aspectRatio = useThree(({ size }) => size.width / size.height);
  const mediaProviderURL = config.mediaProviderURL;
  const mediaProviderPort = config.mediaProviderPort;

  const defaultScale = Math.min(1, aspectRatio * 0.7) / 1200

  return (
    <group
      position={(menuPosition.length === 0) ? defaultMenuPosition : menuPosition}
      rotation={(menuRotation.length === 0) ? defaultMenuRotation : menuRotation}
      scale={defaultScale}
    >
      <FontFamilyProvider
        fontFamilies={{
          medium: [`https://${mediaProviderURL}:${mediaProviderPort}/Fonts/`, "inter.json"],
          bold: [`https://${mediaProviderURL}:${mediaProviderPort}/Fonts/`, "inter-bold.json"],
        }}
        defaultFontFamily="medium"
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
            alignItems="stretch"
          >
            <MediaExplorer />
            <Timeline />
          </RootContainer>
        </Suspense>
      </FontFamilyProvider>
    </group>
  );
}

export default React.memo(MediaPlayer); //React.memo stops the component from re-rendering, and flashing, when only the underlying components are what re-render. 
