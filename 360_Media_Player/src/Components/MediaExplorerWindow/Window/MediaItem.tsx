import { Container, Image, Text } from "@coconut-xr/koestlich";
import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { directoryHistoryPush, updatePageNumber } from "../../../Slices/DirectorySlice.tsx";
import { getDirectories } from '../../../Api/ExplorerApi.tsx';
import folderImage from '../../../Images/folder_base64.json'
import { arrayToDirectoryString } from "../../../Utilities/DirectoryUtility.tsx";
import { loadMediaItem } from "../../../Utilities/MediaUtility.tsx"

type MediaItem = {
  name: string;
  dateModified: any
  isFolder: boolean;
  isImage: any;
  isVideo: any;
  thumbnail: any;
  path: any;
  duration: any;
};

function MediaItem({ name, dateModified, isFolder, isImage, isVideo, thumbnail, path, duration }: MediaItem) {
  let isGetDirectoriesLocked: boolean = useSelector((state: any) => state.directory.isGetDirectoriesLocked);
  const [hoverCount, setHoverCount] = useState(0);
  const dispatch = useDispatch();

  const base64ImagePath = 'data:image/jpeg;base64,';
  const startingPageNumber = 1;

  const handleClick = async () => {
    if (isFolder === true) {
      await loadNewDirectory(name);
    } else {
      loadMediaItem(dispatch, thumbnail, isImage, name, path, isVideo, duration);
    }
  };

  const loadNewDirectory = async (name: any) => {
    const subDirectoryString = arrayToDirectoryString([name]);
    updatePageNumber(startingPageNumber); //reset page number
    getDirectories(dispatch, isGetDirectoriesLocked, startingPageNumber, subDirectoryString);
    dispatch(directoryHistoryPush(name));
  }

  const getImageUrl = (isFolder: any, thumbnail: any) => {
    if (isFolder === true) {
      return `${base64ImagePath}${folderImage.image}`;
    } else {
      return `${base64ImagePath}${thumbnail}`
    }
  }

  return (
    <Container
      padding={8}
      flexBasis={180}
      flexGrow={1}
      flexDirection="column"
      onPointerEnter={() => setHoverCount((current) => current + 1)}
      onPointerLeave={() => setHoverCount((current) => current - 1)}
      onClick={handleClick}
      backgroundColor="white"
      backgroundOpacity={hoverCount > 0 ? 0.1 : 0}
      borderRadius={8}
    >
      <Suspense>
        {(typeof thumbnail !== 'undefined' || isFolder == true) ? ( //Contitionally load object otherwise text may appear above image.
          <>
            <Image
              url={getImageUrl(isFolder, thumbnail)}
              maxWidth="65%"
              maxHeight="65%"
              borderRadius={8}

            />
            <Container marginTop={4}>
              <Text fontSize={16} color="white">
                {name}
              </Text>
              <Text fontSize={16} color="white" opacity={0.5}>
                {dateModified}
              </Text>
            </Container>
          </>
        ) : (
          <Text fontSize={16} color="white" opacity={0.5}>
            Loading
          </Text>
        )}
      </Suspense>
    </Container>
  );
}

export default MediaItem;