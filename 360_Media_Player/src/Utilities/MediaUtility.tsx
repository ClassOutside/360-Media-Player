import { setCurrentItemName } from "../Slices/MediaSlice.tsx";
import { setSkySphereImage } from "../Slices/SkySphereSlice.tsx";
import { loadFullResolutionImage } from "./ImageUtility.tsx";
import { loadVideo } from "./VideoUtility.tsx";

export const loadPreviousItem = (dispatch: any, currentTree: any, currentItemName: any) => {
  const nextItem = getPreviousITem(currentTree, currentItemName);
  (nextItem !== null) ? loadMediaItem(dispatch, nextItem.thumbnail, nextItem.isImage, nextItem.name, nextItem.path, nextItem.isVideo, nextItem.duration) : null;
}

export const loadNextItem = (dispatch: any, currentTree: any, currentItemName: any) => {
  const nextItem = getNextItem(currentTree, currentItemName);
  (nextItem !== null) ? loadMediaItem(dispatch, nextItem.thumbnail, nextItem.isImage, nextItem.name, nextItem.path, nextItem.isVideo, nextItem.duration) : null;
}

export const getPreviousITem = (currentTree: any, currentItemName: any) => {
  const currentIndex = currentTree.findIndex((item: { name: any; }) => item.name === currentItemName);

  if (currentIndex !== -1 && currentIndex > 0 && (typeof currentTree[currentIndex - 1].isFolder !== 'undefined') && currentTree[currentIndex - 1].isFolder === false) {
    return currentTree[currentIndex - 1];
  } else {
    console.log("No next item found or currentIndex out of range.");
    return null;
  }
}

function getNextItem(currentTree: any, currentItemName: any) {
  const currentIndex = currentTree.findIndex((item: { name: any; }) => item.name === currentItemName);

  if (currentIndex !== -1 && currentIndex < currentTree.length - 1 && (typeof currentTree[currentIndex + 1].isFolder !== 'undefined') && currentTree[currentIndex + 1].isFolder === false) {
    return currentTree[currentIndex + 1];
  } else {
    console.log("No next item found or currentIndex out of range.");
    return null;
  }
}

export const loadMediaItem = (dispatch: any, thumbnail: any, isImage: any, name: any, path: any, isVideo: any, duration: any) => {
  dispatch(setSkySphereImage(thumbnail)); //Immediately set the skyshpere to the low resolution thumbnail
  dispatch(setCurrentItemName(name));
  if (isImage) {
    loadFullResolutionImage(dispatch, name, path);
  } else if (isVideo) {
    loadVideo(dispatch, path, duration)
  }
}