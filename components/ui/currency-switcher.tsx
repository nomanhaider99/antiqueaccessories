"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { currencies } from "@/lib/currencies";
import { useCurrency } from "@/store/currency-store";

export default function CurrencySwitcher() {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  const handleSelect = async (code: string) => {
    if (code === "PKR") {
      setCurrency("PKR", 1);
      setOpen(false);
      return;
    }

    const res = await fetch(`/api/exchange?to=${code}`);
    const { rate } = await res.json();

    setCurrency(code, rate);
    setOpen(false);
  };

  return (
    <div className="fixed md:bottom-12 md:right-12 bottom-6 right-6 z-50">
      {open && (
        <div className="mb-2 w-72 rounded-xl bg-white shadow-xl border overflow-hidden">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => handleSelect(c.code)}
              className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left"
            >
              <span className="text-xl">{c.flag}</span>

              <div className="text-sm">
                <p className="font-medium">{c.label}</p>
                <p className="text-gray-500">{c.code}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg border"
      >
        <span className="text-xl">
          {currencies.find(c => c.code === currency)?.flag}
        </span>
        <span className="text-sm font-medium">{currency}</span>
        <ChevronUp
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
