import { create } from 'zustand';

type AddLinkModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useAddLinkModalStore = create<AddLinkModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useAddLinkModalStore;
