"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "@/store/currency-store";

export default function ExchangeRateProvider() {
  const setRates = useCurrencyStore((s) => s.setRates);

  useEffect(() => {
    fetch("/api/exchange")
      .then((r) => r.json())
      .then((d) => setRates({ PKR: 1, ...d.rates }));
  }, []);

  return null;
}
