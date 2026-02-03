export type ProductType = "stitched" | "unstitched" | "both"
export type ProductAvailability = "available" | "sold-out"

export interface Product {
  id: string
  article: string
  category: string
  collection: string
  price: number
  discountedPrice: number
  discount: number
  type: ProductType
  size: string
  availability: ProductAvailability
  description: string
  deliveryTime: string[]
  images: string[]
  disclaimer: string
  createdAt: string
}


export type OrderStatus = 'pending' | 'accepted' | 'completed' | 'rejected'
export type ShippingMode = 'standard' | 'express'
export type PaymentMode = 'cash' | 'advance'

export interface Order {
    id: string
    customer_name: string
    city: string
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
    createdAt: Date
    updatedAt: Date
}
