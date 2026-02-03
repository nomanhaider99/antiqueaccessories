import { db } from "@/db";
import { orders } from "@/db/schema";
import { Order } from "@/types";
import { eq } from "drizzle-orm";

export const placeOrder = async (data: Order) => {
    try {
        const order = await db.insert(orders).values({
            customer_name: data.customer_name,
            city: data.city,
            house_number: data.house_number,
            street_number: data.street_number,
            address: data.address,
            phone: data.phone,
            subtotal: data.subtotal,
            shipping_mode: data.shipping_mode,
            payment_mode: data.payment_mode,
            shipping_fee: data.shipping_fee,
            total: data.total,
            status: data.status,
        }).returning();

        return {
            message: "Order placed successfully",
            data: order[0],
            status: 200
        }

    } catch (error) {
        return {
            message: "Error placing order",
            error: error instanceof Error ? error.message : String(error),
            status: 500
        }
    }
}

export const getOrders = async () => {
    try {
        const retrievedOrders = await db.select().from(orders);

        return {
            message: "Orders retrieved successfully",
            data: retrievedOrders,
            status: 200
        }

    } catch (error) {
        return {
            message: "Error retrieving orders",
            error: error instanceof Error ? error.message : String(error),
            status: 500
        }
    }
}

export const getOrderById = async (id: string) => {
    try {
        const retrievedOrder = await db.select().from(orders).where(eq(orders.id, id as any));

        return {
            message: "Order retrieved successfully",
            data: retrievedOrder[0],
            status: 200
        }

    } catch (error) {
        return {
            message: "Error retrieving order",
            error: error instanceof Error ? error.message : String(error),
            status: 500
        }
    }
}