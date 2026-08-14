import { create } from "zustand";
import { persist } from "zustand/middleware";

// Mock auth for the vendor panel prototype.
// Swap for real Supabase auth later — same shape (isAuthenticated, user, login, logout).
export const DEMO_CREDENTIALS = { user: "admin@27vet.com", pass: "27vet2026" };

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, password) => {
        if (email === DEMO_CREDENTIALS.user && password === DEMO_CREDENTIALS.pass) {
          set({ isAuthenticated: true, user: { email, name: "Equipo 27 Vet" } });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: "27vet-auth" }
  )
);
