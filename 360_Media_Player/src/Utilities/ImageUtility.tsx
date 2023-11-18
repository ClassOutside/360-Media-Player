import { getFullResolutionImageFromPath } from "../Api/ExplorerApi.tsx";
import { setCurrentItemName } from "../Slices/MediaSlice.tsx";
import { setIsVideo } from "../Slices/SkySphereSlice.tsx";

export const loadFullResolutionImage = async (dispatch: any, name: any, path: any) => {
  try {
    console.log("Getting full resolution")
    dispatch(setIsVideo(false));
    dispatch(setCurrentItemName(name));
    await getFullResolutionImageFromPath(path, dispatch);
  } catch (error) {
    console.error("Error fetching full-resolution image:", error);
  }
}