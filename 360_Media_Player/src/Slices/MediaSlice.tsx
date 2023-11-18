import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  "currentItemName": ""
}

const mediaSlice = createSlice({
  name: 'mediaSlice',
  initialState,
  reducers: {
    setCurrentItemName: (state, action) => { return { ...state, currentItemName: action.payload } },
  }
});

export const { setCurrentItemName } = mediaSlice.actions;
export default mediaSlice;