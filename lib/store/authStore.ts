import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      // Store token in memory only; do NOT persist it to localStorage. Server should set HttpOnly cookie for auth.
      login: (token, user) => set({ user, token, role: user.role, isAuthenticated: true }),
      logout: () => {
        set({ user: null, token: null, role: null, isAuthenticated: false });
        // Ask backend to clear the auth cookie (best-effort, backend may not exist in this demo)
        if (typeof window !== 'undefined') {
          fetch('/api/auth/session', { method: 'DELETE', credentials: 'include' }).catch(() => {});
        }
      },
    }),
    {
      name: 'auth-storage',
      // Persist only minimal non-sensitive state. Token and user object are intentionally excluded.
      partialize: (state) => ({ role: state.role }),
    }
  )
);
