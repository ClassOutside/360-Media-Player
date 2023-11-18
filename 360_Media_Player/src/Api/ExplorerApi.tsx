import axios from 'axios';
import { setCurrentTree, setCompleteTree, directoryHistoryPush, updatePageNumber, updateTotalPageCount, lockGetDirectories, unLockGetDirectories, setDefaultTree } from '../Slices/DirectorySlice.tsx';
import { setSkySphereImage } from '../Slices/SkySphereSlice.tsx';
import config from '../../application.json'

const mediaProviderURL = config.mediaProviderURL;
const mediaProviderPort = config.mediaProviderPort;

export async function getDirectories(dispatch: any, isGetDirectoriesLocked: any, pageNumber: number = 1, subdirectory: string = '') {
  try {
    if (isGetDirectoriesLocked === false) {
      dispatch(lockGetDirectories());
      dispatch(setDefaultTree());
      const response = await axios.get(`https://${mediaProviderURL}:${mediaProviderPort}/getDirectories?pageNumber=${pageNumber}&subdirectory=${subdirectory}`);
      if (response.status === 200) {
        dispatch(setCurrentTree(response.data.directoryItemList));
        dispatch(setCompleteTree(response.data.directoryItemList));
        dispatch(updateTotalPageCount(response.data.pageCount));
        dispatch(updatePageNumber(pageNumber));
      } else {
        console.log(`Request failed with status code: ${response.status}`);
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
  dispatch(unLockGetDirectories());
}

export async function getFullResolutionImageFromPath(path: any, dispatch: any) {
  try {
    const response = await axios.get(`https://${mediaProviderURL}:${mediaProviderPort}/getFullResolutionImage?path=${path}`);
    dispatch(setSkySphereImage(response.data));
  } catch (error: any) {
    console.error(error.message);
  }
}