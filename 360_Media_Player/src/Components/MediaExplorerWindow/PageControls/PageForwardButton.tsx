import { Image, Container } from "@coconut-xr/koestlich";
import IconButton from "../../IconButton.tsx";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import pageForwardImage_base64 from '../../../Images/pageForward_base64.json'
import { updatePageNumber } from "../../../Slices/DirectorySlice.tsx";
import { getDirectories } from "../../../Api/ExplorerApi.tsx";

function PageForwardButton() {

  let pageNumber: number = useSelector((state: any) => state.directory.pageNumber);
  let isGetDirectoriesLocked: boolean = useSelector((state: any) => state.directory.isGetDirectoriesLocked);
  let totalPageCount: number = useSelector((state: any) => state.directory.totalPageCount);
  const dispatch = useDispatch();
  const imageType = 'data:image/png;base64,';
  const pageForwardImage = pageForwardImage_base64.image;

  async function handleClick() {
    (pageNumber < totalPageCount && isGetDirectoriesLocked == false) ? nextPageNumber() : null;
  }

  function nextPageNumber() {
    const nextPageNumber: number = pageNumber++;
    dispatch(updatePageNumber(nextPageNumber))
    getDirectories(dispatch, isGetDirectoriesLocked, pageNumber)
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
          url={`${imageType}${pageForwardImage}`}
          height={40}
          width={40}
          borderRadius={8}
        />
      </IconButton>
    </Container>
  )
}

export default PageForwardButton;