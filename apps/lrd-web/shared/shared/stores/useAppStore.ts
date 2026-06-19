import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isDarkMode: boolean;
  sidebarOpen: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      sidebarOpen: true,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'app-storage',
    }
  )
);
