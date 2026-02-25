"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useCurrency } from "@/store/currency-store";

interface OrderDetailsSheetProps {
  orderId?: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ProductSummary {
  discountedPrice: number;
  id: string;
  article: string;
  price: number;
  images: string[];
}

interface OrderItem {
  orderItemId: string;
  quantity: number;
  itemPrice: number;
  product: ProductSummary;
  discountedPrice?: number | null;
}

interface OrderDetails {
  id: string;
  customer_name: string;
  phone: string;
  city: string;
  country: string;
  house_number?: string | null;
  street_number?: string | null;
  address: string;
  subtotal: number;
  shipping_fee: number;
  total: number;
  shipping_mode: "standard" | "express";
  payment_mode: "cash" | "advance";
  status: "pending" | "accepted" | "completed" | "rejected";
  createdAt: string;
  items: OrderItem[];
}


export default function OrderDetails({
  orderId,
  open,
  onOpenChange,
}: OrderDetailsSheetProps) {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const { currency, rate } = useCurrency();

  const formatPrice = (value: number) =>
    `${currency} ${(rate * value).toFixed(2)}`;

  useEffect(() => {
    if (!orderId || !open) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const json = await res.json();
        setOrder(json.data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, open]);

  function formatCountryLabel(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 gap-0 overflow-y-scroll">
        <SheetHeader className="p-6 pb-2 text-left">
          <SheetTitle className="text-xl font-bold tracking-tight">
            #{orderId}
          </SheetTitle>
          <p className="text-sm text-gray-500 font-medium">Order details</p>
        </SheetHeader>

        <div className="px-6 py-4">
          <div className="px-6 py-4">
            <h4 className="text-sm font-semibold text-gray-500 mb-4">Items</h4>

            {order?.items.map((item) => (
              <div
                key={item.orderItemId}
                className="flex items-center justify-between mb-6"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-md border overflow-hidden flex items-center justify-center">
                    {item.product.images?.[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={'product-details-image'}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">🧥</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">
                      {item.product.article}
                    </span>
                    <span className="text-sm text-gray-400">
                      {formatPrice(item.product.discountedPrice)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-12 text-sm">
                  <span className="text-gray-500">{item.quantity} pcs</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(item.itemPrice)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">Loading details...</div>
        ) : order && (
          <div className="flex flex-col">
            {/* Meta Data Section */}
            <div className="p-6 flex flex-col gap-4">
              <DetailRow label="Ordered On" value={new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })} />
              <DetailRow label="Delivery Services" value={order.shipping_mode.charAt(0).toUpperCase() + order.shipping_mode.slice(1)} />
              <DetailRow label="Payment method" value={order.payment_mode === 'advance' ? 'Advance' : 'Cash on Delivery'} />
              <DetailRow label="Status" value={<span className="capitalize">{order.status}</span>} />
            </div>

            <Separator />

            {/* Customer Section */}
            <div className="p-6 flex flex-col gap-4">
              <DetailRow label="Customer name" value={order.customer_name} />
              <DetailRow label="Phone" value={order.phone} />
              <DetailRow
                label="Address"
                value={`${order.house_number ? `House No.  ${order.house_number},` : ''} ${order.street_number ? `Street No. ${order.street_number},` : ''} ${order.address}, ${order.city}, ${formatCountryLabel(order.country)}`}
              />
            </div>

            <Separator />
            {/* Price Section */}
            <div className="p-6 flex flex-col gap-4">
              <DetailRow label="Subtotal" value={`${formatPrice(order.subtotal)}`} />
              <DetailRow label="Shipping Fee" value={`${formatPrice(order.shipping_fee)}`} />
              <DetailRow label="Total" value={`${formatPrice(order.total)}`} />
            </div>

          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start text-sm">
      <span className="text-gray-500 font-medium w-1/3">{label}</span>
      <span className="text-gray-900 font-semibold w-2/3 text-left">{value}</span>
    </div>
  );
}