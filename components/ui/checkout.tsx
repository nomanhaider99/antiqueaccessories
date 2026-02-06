"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getCart, CartItem } from "@/lib/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCurrency } from "@/store/currency-store";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const paymentMode = "advance";
  const { currency, rate } = useCurrency();

  const [form, setForm] = useState({
    customer_name: "",
    city: "",
    country: "",
    house_number: "",
    street_number: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const subtotal = cartItems.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  );

  const shippingFee = 199;
  const total = subtotal + shippingFee;

  const router = useRouter();
  const formatPrice = (value: number) =>
    `${currency} ${value.toFixed(2)}`;

  const convertedSubtotal = subtotal * rate;
  const convertedShipping = shippingFee * rate;
  const convertedTotal = total * rate;


  const placeOrder = async () => {
    if (cartItems.length === 0) return;

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          currency,
          exchange_rate: rate,
          subtotal: convertedSubtotal,
          shipping_fee: convertedShipping,
          total: convertedTotal,
          shipping_mode: "standard",
          payment_mode: paymentMode,
          items: cartItems.map((i) => ({
            product_id: i.id,
            quantity: i.quantity,
            size: i.size,
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
      setCartItems([]);

      router.push(`/orders/${data.orderId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-2 py-10 grid lg:grid-cols-[2fr_1px_1fr] gap-8">
      {/* LEFT */}
      <div className="space-y-8">
        {/* DELIVERY */}
        <Card className="shadow-none border-none">
          <CardHeader>
            <CardTitle>Delivery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries({
              "Full Name": "customer_name",
              Country: "country", // ✅ added
              City: "city",
              "House Number (Optional)": "house_number",
              "Street Number (Optional)": "street_number",
              "Complete Address": "address",
              Phone: "phone",
            }).map(([label, key]) => (
              <div key={key}>
                <Label>{label}</Label>
                <Input
                  className="rounded-none"
                  value={(form as any)[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                  placeholder={`Enter your ${label}`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* PAYMENT — ADVANCE ONLY */}
        <Card className="shadow-none border-none px-4">
          <CardHeader>
            <CardTitle>Advance Payment</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3 bg-zinc-50 p-4">
            <p className="font-semibold">Payment Details:</p>

            <div>
              <p className="font-medium">Bank Transfer (Meezan):</p>
              <p>Account Title: MAHRUKH NASEEM</p>
              <p>Account Number: 01320106440933</p>
              <p>IBAN: PK56MEZN0001320106440933</p>
            </div>

            <p className="text-red-600 font-semibold">
              Please transfer the amount and send screenshot to WhatsApp:
            </p>
            <p className="text-blue-600 font-bold">03XX-XXXXXXX</p>
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

      {/* RIGHT */}
      <div className="">
        <Card className="shadow-none border-none">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex gap-3">
                <Image
                  src={item.images[0]}
                  alt={item.article}
                  width={60}
                  height={60}
                />
                <div className="flex-1">
                  <p>{item.article}</p>
                  <p className="text-xs">
                    Size {item.size} · Qty {item.quantity}
                  </p>
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
                <span>Shipping</span>
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
    </div>
  );
}
