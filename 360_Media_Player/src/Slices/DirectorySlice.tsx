import { createSlice } from '@reduxjs/toolkit';
import loadingImage from '../Images/loading_base64.json'

const completeTree: any = []
const directoryHistory: any = []
const currentTree = [
  {
    "name": "loading",
    "isDefaultTree": true,
    "image": "images/image.jpg",
    "artist": "date here",
    "isFolder": false,
    'thumbnail': loadingImage.image
  },
]
const defaultTree = [
  {
    "name": "loading",
    "isDefaultTree": true,
    "image": "images/image.jpg",
    "artist": "date here",
    "isFolder": false,
    'thumbnail': loadingImage.image
  },
]
const pageNumber = 1;
const totalPageCount = 1;
const isGetDirectoriesLocked = false;

const DirectorySlice = createSlice({
  name: 'directory',
  initialState: {
    currentTree,
    completeTree,
    defaultTree,
    directoryHistory,
    pageNumber,
    totalPageCount,
    isGetDirectoriesLocked,
  },
  reducers: {
    setCurrentTree: (state, action) => { return { ...state, currentTree: action.payload } },
    setCompleteTree: (state, action) => { return { ...state, completeTree: action.payload } }, //Here the state object is not partially modified, it is entirely replaced, so return is needed
    directoryHistoryPush: (state, action) => { state.directoryHistory.push(action.payload) }, //return is not needed because the state is modified, not overwritten
    directoryHistoryPop: (state) => { state.directoryHistory.pop() },
    updatePageNumber: (state, action) => { return { ...state, pageNumber: action.payload } },
    updateTotalPageCount: (state, action) => { return { ...state, totalPageCount: action.payload } },
    lockGetDirectories: (state) => { return { ...state, isGetDirectoriesLocked: true } },
    unLockGetDirectories: (state) => { return { ...state, isGetDirectoriesLocked: false } },
    setDefaultTree: (state) => { return { ...state, currentTree: defaultTree } },
  },
});

export const {
  setCurrentTree, setCompleteTree, directoryHistoryPush, directoryHistoryPop, updatePageNumber, updateTotalPageCount, lockGetDirectories,
  unLockGetDirectories, setDefaultTree
} = DirectorySlice.actions;
export default DirectorySlice;
