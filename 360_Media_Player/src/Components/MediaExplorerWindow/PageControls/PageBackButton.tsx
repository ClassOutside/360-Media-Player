import { Image, Container } from "@coconut-xr/koestlich";
import IconButton from "../../IconButton.tsx";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import pageBackImage_base64 from '../../../Images/pageBackward_base64.json'
import { updatePageNumber } from "../../../Slices/DirectorySlice.tsx";
import { getDirectories } from "../../../Api/ExplorerApi.tsx";
import { arrayToDirectoryString } from "../../../Utilities/DirectoryUtility.tsx";

function PageBackButton() {

  let pageNumber: number = useSelector((state: any) => state.directory.pageNumber);
  let isGetDirectoriesLocked: boolean = useSelector((state: any) => state.directory.isGetDirectoriesLocked);
  let directoryHistory: any = useSelector((state: any) => state.directory.directoryHistory);
  const dispatch = useDispatch();
  const imageType = 'data:image/png;base64,';
  const pageBackImage = pageBackImage_base64.image;

  async function handleClick() {
    (pageNumber > 1 && isGetDirectoriesLocked == false) ? previousPageNumber() : null;
  }

  function previousPageNumber() {
    const previousPageNumber: number = pageNumber--;
    const subDirectoryString = arrayToDirectoryString(directoryHistory);
    dispatch(updatePageNumber(previousPageNumber))
    getDirectories(dispatch, isGetDirectoriesLocked, pageNumber, subDirectoryString)
  }

  return (
    <Container
      paddingLeft={8}
      paddingRight={8}
    >
      <IconButton
        onClick={handleClick}
      >
        <Image
          url={`${imageType}${pageBackImage}`}
          height={40}
          width={40}
          borderRadius={8}
        />
      </IconButton>
    </Container>
  )
}

export default PageBackButton;