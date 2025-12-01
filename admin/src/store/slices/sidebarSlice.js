import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: true,
    isMobileOpen: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileOpen = !state.isMobileOpen;
    },
    closeMobileSidebar: (state) => {
      state.isMobileOpen = false;
    },
  },
});

export const { toggleSidebar, toggleMobileSidebar, closeMobileSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;