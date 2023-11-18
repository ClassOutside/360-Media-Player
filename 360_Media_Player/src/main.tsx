import ReactDOM from "react-dom/client";
import App from "./app.js";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import DirectorySlice from './Slices/DirectorySlice.tsx';
import SkySphereSlice from './Slices/SkySphereSlice.tsx';
import MenuSlice from "./Slices/MenuSlice.tsx";
import MediaSlice from "./Slices/MediaSlice.tsx";

const store = configureStore({
  reducer: {
    directory: DirectorySlice.reducer,
    skySphere: SkySphereSlice.reducer,
    menuSlice: MenuSlice.reducer,
    mediaSlice: MediaSlice.reducer,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);