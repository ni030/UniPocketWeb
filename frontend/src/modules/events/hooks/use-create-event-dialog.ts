import { create } from "zustand";

interface CreateEventStateProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateEventDialog = create<CreateEventStateProps>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);