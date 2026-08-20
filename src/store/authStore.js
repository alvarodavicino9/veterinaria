import { create } from "zustand";
import { persist } from "zustand/middleware";

// Mock auth for the vendor panel prototype.
// Swap for real Supabase auth later — same shape (isAuthenticated, user, login, logout).
export const DEMO_CREDENTIALS = { user: "admin@dsvet.com", pass: "dsvet2026" };

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, password) => {
        if (email === DEMO_CREDENTIALS.user && password === DEMO_CREDENTIALS.pass) {
          set({ isAuthenticated: true, user: { email, name: "Equipo DS Vet" } });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: "dsvet-auth" }
  )
);
