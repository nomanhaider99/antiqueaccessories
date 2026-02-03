// components/price.tsx
"use client";

import { currencies } from "@/lib/currencies";
import { useCurrencyStore } from "@/store/currency-store";

export default function Price({ amountPKR }: { amountPKR: number }) {
  const { currency, rates } = useCurrencyStore();

  const rate = rates[currency] ?? 1;
  const converted =
    currency === "PKR"
      ? amountPKR
      : Math.round(amountPKR * rate * 100) / 100;

  return (
    <span className="text-lg font-medium">
      {currencies[currency].symbol}{" "}
      {converted.toLocaleString()}
    </span>
  );
}
