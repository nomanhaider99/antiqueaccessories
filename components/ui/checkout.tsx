"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCart, CartItem } from "@/lib/cart";
import { useCurrency } from "@/store/currency-store";
import { useCart } from "@/lib/cart-context";

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
];

export default function Checkout() {
  const { cart: cartItems, refresh } = useCart(); // reactive cart
  const { currency, rate } = useCurrency();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [useCustomCity, setUseCustomCity] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "advance">("advance");
  const [form, setForm] = useState({
    customer_name: "",
    city: "",
    country: "",
    custom_city: "",
    house_number: "",
    street_number: "",
    address: "",
    phone: "",
  });

  const finalCity = useCustomCity ? form.custom_city : form.city;

  useEffect(() => {
    if (!finalCity) return;
    if (finalCity.toLowerCase() !== "karachi" && paymentMethod === "cash") {
      setPaymentMethod("advance");
    }
  }, [finalCity, paymentMethod]);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingFee = 350;
  const total = subtotal + shippingFee;
  const convertedSubtotal = subtotal * rate;
  const convertedShipping = shippingFee * rate;
  const convertedTotal = total * rate;
  const formatPrice = (value: number) => `${currency} ${value.toFixed(2)}`;

  const placeOrder = async () => {
    if (cartItems.length === 0) return;

    if (!form.customer_name || !finalCity || !form.address || !form.phone) {
      toast.error("Please fill the required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          city: finalCity,
          currency,
          exchange_rate: rate,
          subtotal: convertedSubtotal,
          shipping_fee: convertedShipping,
          total: convertedTotal,
          shipping_mode: "standard",
          payment_mode:
            paymentMethod === "cash" ? "cash" : "advance",
          items: cartItems.map((i) => ({
            product_id: i.id,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to place order");
        return;
      }

      toast.success("Order placed successfully");

      localStorage.removeItem("cart");
      refresh();

      router.push(`/orders/${data.orderId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-2 py-10 grid lg:grid-cols-[2fr_1px_1fr] gap-8">
      <div className="space-y-8">
        {/* DELIVERY */}
        <Card className="shadow-none border-none">
          <CardHeader>
            <CardTitle>Delivery</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                className="rounded-none"
                value={form.customer_name}
                onChange={(e) =>
                  setForm({ ...form, customer_name: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label>Country</Label>
              <Input
                className="rounded-none"
                value={form.country}
                onChange={(e) =>
                  setForm({ ...form, country: e.target.value })
                }
                placeholder="Enter your country"
              />
            </div>

            <div>
              <Label>City</Label>
              <Select
                onValueChange={(value) => {
                  if (value === "other") {
                    setUseCustomCity(true);
                    setForm({ ...form, city: "" });
                  } else {
                    setUseCustomCity(false);
                    setForm({ ...form, city: value });
                  }
                }}
              >
                <SelectTrigger className="rounded-none w-full">
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>

                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {useCustomCity && (
              <div>
                <Label>Enter City</Label>
                <Input
                  className="rounded-none"
                  value={form.custom_city}
                  onChange={(e) =>
                    setForm({ ...form, custom_city: e.target.value })
                  }
                  placeholder="Enter your city"
                />
              </div>
            )}

            <div>
              <Label>House Number (Optional)</Label>
              <Input
                className="rounded-none"
                value={form.house_number}
                onChange={(e) =>
                  setForm({ ...form, house_number: e.target.value })
                }
                placeholder="Enter your house number"
              />
            </div>

            <div>
              <Label>Street Number (Optional)</Label>
              <Input
                className="rounded-none"
                value={form.street_number}
                onChange={(e) =>
                  setForm({ ...form, street_number: e.target.value })
                }
                placeholder="Enter your street number"
              />
            </div>

            <div>
              <Label>Complete Address</Label>
              <Input
                className="rounded-none"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                placeholder="Enter your complete address"
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                className="rounded-none"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                placeholder="Enter your phone number"
              />
            </div>
          </CardContent>
        </Card>

        {/* PAYMENT METHOD */}
        <Card className="shadow-none border-none">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod === "cash"}
                onChange={() => {
                  if (finalCity.toLowerCase() !== "karachi") {
                    toast.error("Cash on Delivery is only for Karachi");
                    return;
                  }
                  setPaymentMethod("cash");
                }}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod === "advance"}
                onChange={() => setPaymentMethod("advance")}
              />
              Advance Payment
            </label>

            {paymentMethod === "advance" && (
              <div className="bg-zinc-50 p-3 space-y-1">
                <p className="font-medium">Payment Details:</p>
                <p>Bank Transfer (Meezan)</p>
                <p>Account Title: SHAHZAD HASSAN</p>
                <p>Account Number: 99360107843891</p>
                <p>IBAN: PK02MEZN0099360107843891</p>
                <p className="text-red-600">
                  Please transfer the amount and send screenshot to WhatsApp:
                </p>
                <p className="text-blue-600 font-semibold">
                  +92 330 4765054
                </p>
              </div>
            )}

            {paymentMethod === "cash" && (
              <div className="bg-zinc-50 p-3">
                <p>Pay with cash upon delivery.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          onClick={placeOrder}
          disabled={loading || cartItems.length === 0}
          className="w-full h-12 rounded-none"
        >
          {loading ? "Processing..." : "Place Order"}
        </Button>
      </div>

      <div className="hidden lg:block bg-zinc-300" />

      {/* SUMMARY */}
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-3">
              <Image
                src={item.images[0]}
                alt={item.title}
                width={60}
                height={60}
              />
              <div className="flex-1">
                <p>{item.title}</p>
              </div>
              <p>{formatPrice(item.price * item.quantity * rate)}</p>
            </div>
          ))}

          <div className="border-t pt-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(convertedSubtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span>{formatPrice(convertedShipping)}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(convertedTotal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
