"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Minus, Plus, Trash } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { updateQuantity, removeFromCart } from "@/lib/cart";
import { useCart } from "@/lib/cart-context";

export default function Cart() {
  const { cart: cartItems, refresh } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <ShoppingBag className="h-5 w-5" />

          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 text-[10px] bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
              {cartItems.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col p-2">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto mt-6 space-y-6 p-3">
          {cartItems.length === 0 && (
            <p className="text-sm text-center text-muted-foreground mt-10">
              Your cart is empty
            </p>
          )}

          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-4"
            >
              <Image
                src={item.images[0]}
                alt={item.article}
                width={80}
                height={100}
                className="rounded-md object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{item.article}</p>
                <p className="text-xs text-muted-foreground">
                  · Size {item.size}
                </p>

                <div className="flex items-center justify-between mt-2">
                  {/* Quantity */}
                  <div className="flex items-center border rounded-md">
                    <button
                      className="p-1"
                      onClick={() => {
                        updateQuantity(item.id, item.size, item.quantity - 1);
                        refresh();
                      }}
                    >
                      <Minus className="h-3 w-3" />
                    </button>

                    <span className="px-3 text-sm">
                      {item.quantity}
                    </span>

                    <button
                      className="p-1"
                      onClick={() => {
                        updateQuantity(item.id, item.size, item.quantity + 1);
                        refresh();
                      }}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-sm font-semibold">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => {
                  removeFromCart(item.id, item.size);
                  refresh();
                }}
                className="text-muted-foreground hover:text-black"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="border-t pt-4 space-y-4 px-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>

            <SheetClose asChild>
              <Link href="/checkout">
                <Button className="w-full h-12 text-base">
                  Proceed to Checkout
                </Button>
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
