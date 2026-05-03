import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
  AuthState,
  AuthStore,
  DemoAuthSession,
  DemoLoginInput,
} from "../types";

const AUTH_STORAGE_KEY = "shoplite-auth-v1";

function getInitials(email: string): string {
  const firstLetter = email.trim().charAt(0).toUpperCase();

  return firstLetter || "SL";
}

function createDemoSession(input: DemoLoginInput): DemoAuthSession {
  const normalizedEmail = input.email.trim().toLowerCase();

  return {
    user: {
      id: `demo-${Date.now().toString(36)}`,
      fullName: "Demo Customer",
      email: normalizedEmail,
      role: "customer-demo",
      avatarInitials: getInitials(normalizedEmail),
    },
    accessToken: `demo-token-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  };
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      session: null,

      login: (input) => {
        const session = createDemoSession(input);

        set({
          session,
        });

        return session;
      },

      logout: () => {
        set({
          session: null,
        });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state): AuthState => ({
        session: state.session,
      }),
    },
  ),
);

export const selectIsAuthenticated = (state: AuthStore) =>
  Boolean(state.session);