import { setVideoDuration, setIsVideo, setVideoDirectory } from "../Slices/SkySphereSlice.tsx";

export const loadVideo = async (dispatch: any, path: any, duration: any) => {
    dispatch(setVideoDuration(duration))
    dispatch(setIsVideo(true));
    dispatch(setVideoDirectory(path))
}