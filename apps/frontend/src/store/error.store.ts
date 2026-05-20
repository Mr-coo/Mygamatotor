import { create } from "zustand";

type ErrorStore = {
  message: string | null;
  showError: (message: string) => void;
  clearError: () => void;
};

export const useErrorStore = create<ErrorStore>((set) => ({
  message: null,
  showError: (message) => set({ message }),
  clearError: () => set({ message: null }),
}));
