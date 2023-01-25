import { create } from 'zustand';

type DeleteLinkModal = {
  isOpen: boolean;
  id: string;
  open: (id: string) => void;
  close: () => void;
};

const useDeleteLinkModalStore = create<DeleteLinkModal>((set) => ({
  isOpen: false,
  id: '',
  open: (id: string) => set({ isOpen: true, id }),
  close: () => set({ isOpen: false, id: '' }),
}));

export default useDeleteLinkModalStore;
