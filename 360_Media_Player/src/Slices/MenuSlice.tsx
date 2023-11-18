import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  "isHidden": false,
  "menuPosition": [],
  "menuRotation": [],
}

const MenuSlice = createSlice({
  name: 'menuSlice',
  initialState,
  reducers: {
    toggeIlsHidden: (state) => { return { ...state, isHidden: !state.isHidden } },
    updateMenuPosition: (state, action) => { return { ...state, menuPosition: action.payload } },
    updateMenuRotation: (state, action) => { return { ...state, menuRotation: action.payload } },
  }
});

export const { toggeIlsHidden, updateMenuPosition, updateMenuRotation } = MenuSlice.actions;
export default MenuSlice;