'use client'

import { useCurrency } from "@/store/currency-store";
import Image from "next/image";

type OrderStatus =
  | "pending"
  | "accepted"
  | "out_for_delivery"
  | "delivered"
  | "rejected";

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  city: string;
  house_number?: string | null;
  street_number?: string | null;
  address: string;
  subtotal: number;
  shipping_fee: number;
  status: OrderStatus;
  total: number;
  createdAt: Date;
};

type Item = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  images: string[];
};

interface Props {
  order: Order;
  items: Item[];
}

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-orange-100 text-orange-600",
  accepted: "bg-green-100 text-green-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
  delivered: "bg-blue-100 text-blue-600",
  rejected: "bg-red-100 text-red-600",
};

const statusLabel: Record<OrderStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  rejected: "Rejected",
};

export default function OrderDetails({ order, items }: Props) {
  const { currency, rate } = useCurrency();

  const formatPrice = (value: number) =>
    `${currency} ${(value * rate).toFixed(2)}`;

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 md:p-10 rounded-2xl md:shadow">
      <div className="flex justify-center mb-2">
  <p className="text-xs md:text-sm text-gray-500 py-1 px-4 border rounded-md border-zinc-600/75">
    Refresh this page to see the latest updates for your order.
  </p>
</div>

      <h1 className="text-xl md:text-2xl font-semibold text-center mb-4">
        Thank you for your order!
      </h1>

      <div className="flex justify-center mb-6 md:mb-8">
        <span
          className={`px-5 py-2 rounded-full text-sm font-medium ${statusStyles[order.status]}`}
        >
          {statusLabel[order.status]}
        </span>
      </div>

      {/* Customer */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8 mb-6 md:mb-8 text-left">
        <div>
          <p className="text-sm text-gray-500">Customer Name</p>
          <p className="font-medium text-gray-900">{order.customer_name}</p>
        </div>

        <div className="md:text-right">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium text-gray-900">{order.phone}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-8 border-b pb-6 md:pb-8 mb-6 md:mb-8 text-sm text-left">
        <div>
          <p className="text-gray-500">Date Ordered</p>
          <p className="font-medium text-gray-900">
            {order.createdAt.toDateString()}
          </p>
        </div>

        <div className="md:text-center">
          <p className="text-gray-500">Order No.</p>
          <p className="font-medium text-gray-900">
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-gray-500">Shipping Address</p>
          <p className="font-medium text-gray-900 leading-relaxed">
            {order.house_number && `House ${order.house_number}, `}
            {order.street_number && `Street ${order.street_number}, `}
            {order.address}, {order.city}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4 md:space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <Image
                src={item.images[0]}
                alt={item.title}
                width={70}
                height={70}
                className="rounded-md object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>

            <p className="font-medium text-gray-900 md:text-right">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-8 md:mt-10 pt-6 border-t text-sm space-y-2 md:space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">{formatPrice(order.subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium">{formatPrice(order.shipping_fee)}</span>
        </div>

        <div className="flex justify-between text-base font-semibold pt-3 border-t">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
