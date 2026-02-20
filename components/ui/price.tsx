// components/price.tsx
"use client";

import { useCurrency } from "@/store/currency-store";

export default function Price({ value }: { value: number }) {
  const { currency, rate } = useCurrency();
  return (
    <p className="text-sm">
      {currency} {(value * rate).toFixed(2)}
    </p>
  );
}