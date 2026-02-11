// ================= ENUM TYPES =================

export type OrderStatus = "pending" | "accepted" | "completed" | "rejected"

export type ShippingMode = "standard"

export type PaymentMode = "cash" | "advance"

export type ProductAvailability = "available" | "sold-out"


// ================= PRODUCT =================

export interface Product {
  id: string
  title: string
  category: string
  price: number
  availability: ProductAvailability
  description: string
  discount: number
  discountedPrice: number
  deliveryTime: string[]
  images: string[]
  createdAt: string
  updatedAt: string
}


// ================= ORDER =================

export interface Order {
  id: string
  customer_name: string
  city: string
  country: string
  house_number?: string | null
  street_number?: string | null
  address: string
  phone: string
  subtotal: number
  shipping_mode: ShippingMode
  payment_mode: PaymentMode
  shipping_fee: number
  total: number
  status: OrderStatus
  currency: string        // e.g. "PKR"
  exchange_rate: number
  createdAt: string
  updatedAt: string
}


// ================= ORDER ITEM =================

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
}


// ================= ADMIN =================

export interface Admin {
  id: string
  username: string
  password_hash: string
  createdAt: string
  updatedAt: string
}
