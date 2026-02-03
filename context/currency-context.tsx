"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Currency = "PKR" | "USD" | "CAD" | "SAR";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("PKR");

  useEffect(() => {
    const saved = localStorage.getItem("currency") as Currency | null;
    if (saved) setCurrencyState(saved);
  }, []);

  const setCurrency = (c: Currency) => {
    localStorage.setItem("currency", c);
    setCurrencyState(c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be inside CurrencyProvider");
  return ctx;
}
