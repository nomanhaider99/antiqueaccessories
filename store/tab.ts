import { create } from 'zustand';

interface TabStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  activeTab: 'Manage Orders',
  setActiveTab: (tab) => set({ activeTab: tab }),
  selectedProductId: null,
  setSelectedProductId: (id) => set({ selectedProductId: id }),
}));
