import { create } from "zustand";

interface CreateFacilityStateProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateFacilityDialog = create<CreateFacilityStateProps>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
