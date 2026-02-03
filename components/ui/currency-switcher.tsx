"use client";

import { useCurrency } from "@/context/currency-context";

const currencies = ["PKR", "USD", "CAD", "SAR"] as const;

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as any)}
      className="border text-xs px-2 py-1 rounded-md bg-white focus:outline-none"
    >
      {currencies.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
