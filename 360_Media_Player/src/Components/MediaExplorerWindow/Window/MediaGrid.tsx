import { Container, noAnimation } from "@coconut-xr/koestlich";
import MediaItem from "./MediaItem.tsx";
import { useSelector } from "react-redux";


function MediaGrid() {
  const mediaItems = useSelector((state: any) => state.directory.currentTree)

  return (
    <Container
      flexShrink={1}
      width="100%"
    >
      <Container
        flexGrow={1}
        flexDirection="row"
        gapColumn={8}
        gapRow={8}
        flexWrap="wrap"
        width="100%"
        overflow="scroll"
        animation={noAnimation}
      >
        {mediaItems.map((mediaItem: any, index: any) => (
          <MediaItem key={index} {...mediaItem} />
        ))}
      </Container>
    </Container>
  );
}

export default MediaGrid;
