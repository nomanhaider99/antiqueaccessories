'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Truck, Zap } from "lucide-react"
import React from "react"
import { Order } from "@/types"
import { MdEdit } from "react-icons/md"
import { FaTrash } from "react-icons/fa6"
import OrderDetails from "./order-details"
import { useCurrency } from "@/store/currency-store"

const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })


type OrderStatus =
  | "Pending"
  | "Accepted"
  | "Out for Delivery"
  | "Delivered"
  | "Rejected"

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-orange-100 text-orange-700",
  Accepted: "bg-green-100 text-green-700",
  "Out for Delivery": "bg-purple-100 text-purple-700",
  Delivered: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
}

const statusMap = {
  pending: "Pending",
  accepted: "Accepted",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  rejected: "Rejected",
} as const


export default function Orders() {
  const [orders, setorders] = React.useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(null)
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  const [status, setStatus] = React.useState<
    "all" | "pending" | "accepted" | "out_for_delivery" | "delivered" | "rejected"
  >("all");
  const [search, setSearch] = React.useState("");
  const { currency, rate } = useCurrency();

  const formatPrice = (value: number) =>
    `${currency} ${(value * rate).toFixed(2)}`;

  const filterLabel =
    status === "all"
      ? "All Orders"
      : status.charAt(0).toUpperCase() + status.slice(1);


  React.useEffect(() => {
    const timeout = setTimeout(async () => {
      const params = new URLSearchParams();

      if (status !== "all") params.set("status", status);
      if (search.trim()) params.set("q", search.trim());

      const url = `/api/orders${params.toString() ? `?${params}` : ""}`;

      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();
      setorders(json.data || []);
    }, 400);

    return () => clearTimeout(timeout);
  }, [status, search]);

  const updateOrderStatus = async (
    orderId: string,
    newStatus:
      | "pending"
      | "accepted"
      | "out_for_delivery"
      | "delivered"
      | "rejected"
  ) => {
    setorders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );

    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  };


  return (
    <div className="rounded-xl border bg-white">
      <div className="flex items-center justify-between p-4 border-b gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Filter: {filterLabel}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatus("all")}>All Orders</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatus("pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatus("accepted")}>Accepted</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatus("out_for_delivery")}>
              Out for Delivery
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatus("delivered")}>
              Delivered
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatus("rejected")}>Rejected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Customer Details</TableHead>
            <TableHead>Customer Address</TableHead>
            <TableHead>Order and Shipping Details</TableHead>
            <TableHead>Payment Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order, i) => (
            <TableRow key={i} className="hover:bg-muted/40">
              {/* Customer */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={order.customer_name[0]} />
                    <AvatarFallback>
                      {order.customer_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{order.customer_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.phone}
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* Product */}
              <TableCell className="max-w-[200px]">
                {order.house_number && order.street_number && (
                  <div className="text-sm text-muted-foreground">
                    House No: {order.house_number},
                    Street No: {order.street_number}
                  </div>
                )}
                <div className="font-medium text-wrap">{order.address}</div>
                <div className="text-sm text-muted-foreground">{order.city}, {order.country}</div>
              </TableCell>

              {/* Order ID */}
              <TableCell>
                {order.shipping_mode !== "standard" ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                    <Zap className="h-3.5 w-3.5" />
                    Express Shipping
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    <Truck className="h-3.5 w-3.5" />
                    Standard Shipping
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  {formatDate(order.createdAt)}
                </div>
              </TableCell>

              {/* Amount */}
              <TableCell>
                <div className="font-medium">{formatPrice(order.total)}</div>
                <div className="text-sm text-muted-foreground">
                  {order.payment_mode == "cash" ? "Cash on Delivery" : "Advance Payment"}
                </div>
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Badge
                      className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium ${statusStyles[
                        statusMap[order.status as keyof typeof statusMap]
                      ]
                        }`}
                    >
                      {statusMap[order.status as keyof typeof statusMap]}
                    </Badge>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start">
                    {(["pending", "accepted", "out_for_delivery", "delivered", "rejected"] as const).map(
                      (s) => (
                        <DropdownMenuItem
                          key={s}
                          onClick={() => updateOrderStatus(order.id, s)}
                        >
                          {statusMap[s]}
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedOrderId(order.id)
                      setDetailsOpen(true)
                    }}
                  >
                    Details
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <OrderDetails
        orderId={selectedOrderId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

    </div>
  )
}
