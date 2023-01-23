import { create } from 'zustand';

type AddLinkModalStore = {
  isOpen: boolean;
  modalId: string;
  open: (id: string) => void;
  close: () => void;
};

const useEditLinkModalStore = create<AddLinkModalStore>((set) => ({
  isOpen: false,
  modalId: '',
  open: (id) => set({ isOpen: true, modalId: id }),
  close: () => set({ isOpen: false }),
}));

export default useEditLinkModalStore;
