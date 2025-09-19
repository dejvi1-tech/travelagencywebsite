import { create } from 'zustand';
import type { User } from '@/types';
import { config } from '@/config';
import { getAuth, saveAuth, clearAuth } from '@/utils/storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Simple demo authentication
    if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
      const user: User = { email, role: 'admin' };
      set({ user, isAuthenticated: true });
      saveAuth(user);
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    clearAuth();
  },

  checkAuth: () => {
    const savedAuth = getAuth();
    if (savedAuth) {
      set({ user: savedAuth, isAuthenticated: true });
    }
  },
}));