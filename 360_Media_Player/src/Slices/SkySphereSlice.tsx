import { createSlice } from '@reduxjs/toolkit';
import config from '../../application.json'

const initialState = {
  "skySphereImage": config.defaultThumbnail,
  "isVideo": false,
  "isPlaying": true,
  "isTimeUpdateLocked": false,
  "VideoDirectory": "",
  "duration": "0",
  "currentPlayThroughTime": "0",
  "timeToSkipTo": "0"
};

const SkySphereSlice = createSlice({
  name: 'skySphere',
  initialState,
  reducers: {
    setSkySphereImage: (state, action) => { return { ...state, skySphereImage: action.payload } },
    setIsVideo: (state, action) => { return { ...state, isVideo: action.payload } },
    setVideoDirectory: (state, action) => { return { ...state, VideoDirectory: action.payload } },
    setPlaying: (state) => { return { ...state, isPlaying: true } },
    setPaused: (state) => { return { ...state, isPlaying: false } },
    setVideoDuration: (state, action) => { return { ...state, duration: action.payload } },
    setCurrentPlayThroughTime: (state, action) => { return { ...state, currentPlayThroughTime: action.payload } },
    setIsTimeUpdateLocked: (state, action) => { return { ...state, isTimeUpdateLocked: action.payload } },
    setTimeToSkipTo: (state, action) => { return { ...state, timeToSkipTo: action.payload } },
  }
});

export const { setSkySphereImage, setIsVideo, setVideoDirectory, setPlaying, setPaused, setVideoDuration, setCurrentPlayThroughTime, setIsTimeUpdateLocked, setTimeToSkipTo } = SkySphereSlice.actions;
export default SkySphereSlice;