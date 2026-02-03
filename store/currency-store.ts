import { create } from "zustand";

export const useCurrencyStore = create<{
  currency: keyof typeof import("@/lib/currencies").currencies;
  rates: Record<string, number>;
  setCurrency: (c: any) => void;
  setRates: (r: any) => void;
}>((set) => ({
  currency: "PKR",
  rates: { PKR: 1 },
  setCurrency: (currency) => set({ currency }),
  setRates: (rates) => set({ rates }),
}));
