"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getCart, CartItem } from "@/lib/cart";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [shippingMode, setShippingMode] = useState<"standard" | "express">("standard");
  const [paymentMode, setPaymentMode] = useState<"cash" | "advance">("cash");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [form, setForm] = useState({
    customer_name: "",
    city: "",
    house_number: "",
    street_number: "",
    address: "",
    phone: "",
  });

  const subtotal = cartItems.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  );
  const shippingFee = shippingMode === "express" ? 399 : 199;
  const total = subtotal + shippingFee;

 const placeOrder = async () => {
  if (cartItems.length === 0) return;

  setLoading(true);

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        shipping_mode: shippingMode,
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
      alert("Failed to place order: " + data.message);
      setLoading(false);
      return;
    }

    alert(`Order placed successfully! Order ID: ${data.orderId}`);
    // Optionally clear cart
    setCartItems([]);
    localStorage.removeItem("cart");
  } catch (err) {
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    setCartItems(getCart());
  }, []);


  return (
    <div className="w-full mx-auto px-2 py-10 grid lg:grid-cols-[2fr_1px_1fr] gap-8">
      {/* LEFT */}
      <div className="space-y-8">
        {/* DELIVERY */}
        <Card className="bg-none shadow-none border-none">
          <CardHeader>
            <CardTitle>Delivery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                placeholder="Enter your full name"
                onChange={(e) =>
                  setForm({ ...form, customer_name: e.target.value })
                }
                className="rounded-none"
              />
            </div>

            <div>
              <Label>City</Label>
              <Input
                placeholder="Enter your city"
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                className="rounded-none"
              />
            </div>

            <div>
              <Label>House Number (Optional)</Label>
              <Input
                placeholder="Enter your house number"
                onChange={(e) =>
                  setForm({ ...form, house_number: e.target.value })
                }
                className="rounded-none"
              />
            </div>

            <div>
              <Label>Street Number (Optional)</Label>
              <Input
                placeholder="Enter your street number"
                onChange={(e) =>
                  setForm({ ...form, street_number: e.target.value })
                }
                className="rounded-none"
              />
            </div>

            <div>
              <Label>Complete Address</Label>
              <Input
                placeholder="Enter your address"
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="rounded-none"
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                placeholder="03XX-XXXXXXX"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="rounded-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* PAYMENT */}
        <Card className="bg-none shadow-none border-none">
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              defaultValue="cash"
              onValueChange={(v) => setPaymentMode(v as any)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" />
                <Label>Cash on Delivery – PKR 500 Advance</Label>
              </div>

              {paymentMode === "cash" && (
                <div className="bg-gray-50 p-4  text-sm">
                  <p className="font-medium mb-2">
                    PKR 500 advance payment required
                  </p>
                  <p className="text-muted-foreground">
                    Remaining amount will be paid via COD.
                  </p>
                  <div className="mt-3 space-y-1">
                    <p>
                      <b>Easypaisa / JazzCash</b>: 03402869667
                    </p>
                    <p>
                      <b>Bank (Meezan)</b>: 01790112793810
                    </p>
                    <p className="text-red-600">
                      Send screenshot on WhatsApp: 03162690292
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advance" />
                <Label>Advance Payment</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* SHIPPING */}
        <Card className="bg-none shadow-none border-none">
          <CardHeader>
            <CardTitle>Shipping Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue="standard"
              onValueChange={(v) => setShippingMode(v as any)}
            >
              <div className="flex items-center border rounded-md p-3 mb-2">
                <RadioGroupItem value="standard" />
                <Label className="ml-2">
                  Standard (Rs. 199) – 3 to 5 days
                </Label>
              </div>

              <div className="flex items-center border rounded-md p-3">
                <RadioGroupItem value="express" />
                <Label className="ml-2">
                  Express (Rs. 399) – 1 to 3 days
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Button
          onClick={placeOrder}
          disabled={loading || cartItems.length === 0}
          className="w-full h-12 text-base rounded-none"
        >

          {loading ? "Placing Order..." : "Place Order"}
        </Button>
      </div>

      {/* CENTER DIVIDER */}
      <div className="hidden lg:block bg-zinc-300" />

      {cartItems.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Your cart is empty.
        </p>
      )}


      {/* RIGHT */}
      <div className="space-y-6">
        <Card className="bg-none shadow-none border-none">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex items-center gap-4"
              >
                <Image
                  src={item.images[0]}
                  alt={item.article}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.article}</p>
                  <p className="text-xs text-muted-foreground">
                    Size {item.size} · Qty {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}

            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. {shippingFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
