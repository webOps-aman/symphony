import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
  },
});

export default store;