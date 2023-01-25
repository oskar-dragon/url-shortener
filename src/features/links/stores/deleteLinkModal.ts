import { create } from 'zustand';

type DeleteLinkModal = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useDeleteLinkModalStore = create<DeleteLinkModal>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useDeleteLinkModalStore;
