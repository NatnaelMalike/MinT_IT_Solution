import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('auth-storage'); // ✅ Clear persisted auth
      },
    }),
    {
      name: 'auth-storage', // Key in localStorage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useAuthStore;