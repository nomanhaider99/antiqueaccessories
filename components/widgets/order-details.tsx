'use client'

import { useCurrency } from "@/store/currency-store";
import Image from "next/image";

type OrderStatus = "pending" | "accepted" | "completed" | "rejected";

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
  article: string;
  quantity: number;
  price: number;
  size: string;
  images: string[];
};

interface Props {
  order: Order;
  items: Item[];
}

const statusStyles: Record<OrderStatus, string> = {
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
  completed: "bg-blue-100 text-blue-600",
  pending: "bg-orange-100 text-orange-600",
};

const statusLabel: Record<OrderStatus, string> = {
  accepted: "Accepted",
  rejected: "Rejected",
  completed: "Completed",
  pending: "Pending",
};

export default function OrderDetails({ order, items }: Props) {
  const { currency, rate } = useCurrency();
  const formatPrice = (value: number) =>
    `${currency} ${(value*rate).toFixed(2)}`;
  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-center mb-4">
        Thank you for your order!
      </h1>

      {/* Status */}
      <div className="flex justify-center mb-8">
        <span
          className={`px-6 py-2 rounded-full text-sm font-medium ${statusStyles[order.status]}`}
        >
          {statusLabel[order.status]}
        </span>
      </div>

      {/* Customer row */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-sm text-gray-500">Customer Name</p>
          <p className="font-medium text-gray-900">
            {order.customer_name}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium text-gray-900">
            {order.phone}
          </p>
        </div>
      </div>

      {/* Order meta */}
      <div className="grid grid-cols-3 gap-8 border-b pb-8 mb-8 text-sm">
        <div>
          <p className="text-gray-500">Date Ordered</p>
          <p className="font-medium text-gray-900">
            {order.createdAt.toDateString()}
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-500">Order No.</p>
          <p className="font-medium text-gray-900">
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-500">Shipping Address</p>
          <p className="font-medium text-gray-900 leading-relaxed">
            {order.house_number && `House ${order.house_number}, `}
            {order.street_number && `Street ${order.street_number}, `}
            {order.address}, {order.city}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.images[0]}
                alt={item.article}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {item.article}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} • Size: {item.size}
                </p>
              </div>
            </div>

            <p className="font-medium text-gray-900">
              {formatPrice(item.price*item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-10 pt-6 border-t text-sm space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">
            {formatPrice(order.subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium">
            {formatPrice(order.shipping_fee)}
          </span>
        </div>

        <div className="flex justify-between text-base font-semibold pt-4 border-t">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
