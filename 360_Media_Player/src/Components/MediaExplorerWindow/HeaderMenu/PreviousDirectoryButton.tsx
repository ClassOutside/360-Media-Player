import { Container, Text, Image } from "@coconut-xr/koestlich";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { directoryHistoryPop, updatePageNumber } from '../../../Slices/DirectorySlice.tsx'
import { getDirectories } from "../../../Api/ExplorerApi.tsx";
import { arrayToDirectoryString } from "../../../Utilities/DirectoryUtility.tsx"
import { useState } from "react";

function PreviousDirectoryButton() {

  let isGetDirectoriesLocked: boolean = useSelector((state: any) => state.directory.isGetDirectoriesLocked);
  const directoryHistory = useSelector((state: any) => state.directory.directoryHistory);
  const [hoverCount, setHoverCount] = useState(0);
  const dispatch = useDispatch();

  const startingPageNumber = 1;

  function returnToPreviousDirectory() {
    if (directoryHistory.length > 0) {
      const previousDirectory = directoryHistory[directoryHistory.length - 1]
      const subDirectoryString = arrayToDirectoryString(previousDirectory);

      updatePageNumber(startingPageNumber);
      getDirectories(dispatch, isGetDirectoriesLocked, startingPageNumber, subDirectoryString);
      dispatch(directoryHistoryPop())
    }
  }
  return directoryHistory.length > 0 ? (
    <Container
      padding={8}
      flexBasis={65}
      flexGrow={1}
      flexDirection="column"
      onPointerEnter={() => setHoverCount((current) => current + 1)}
      onPointerLeave={() => setHoverCount((current) => current - 1)}
      onClick={returnToPreviousDirectory}
      backgroundColor="white"
      backgroundOpacity={hoverCount > 0 ? 0.1 : 0}
      borderRadius={8}
    >
      <Text fontSize={26} color="white" fontFamily="bold" paddingLeft={8}>
        Click For Recent Folder
      </Text>
    </Container>
  ) : null;
}

export default PreviousDirectoryButton;