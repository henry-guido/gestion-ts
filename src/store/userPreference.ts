import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'dark' | 'light' | 'system' | string;

interface State {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useUserPreference = create<State>()(
  persist((set) => {

    return {
      theme: 'system',
      setTheme: (theme) => {
        set(() => ({ theme }));
      },
    };
  }, { name: 'userPreference' })
);
