import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrencyState = {
  currency: string;
  rate: number;
  setCurrency: (currency: string, rate: number) => void;
};

export const useCurrency = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: "PKR",
      rate: 1,
      setCurrency: (currency, rate) =>
        set({ currency, rate }),
    }),
    {
      name: "currency-storage",
    }
  )
);
