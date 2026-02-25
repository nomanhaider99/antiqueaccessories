import { notFound } from "next/navigation";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { orderItems, orders, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import OrderDetails from "@/components/widgets/order-details";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;


    const order = await db
        .select({
            id: orders.id,
            customer_name: orders.customer_name,
            city: orders.city,
            country: orders.country,
            house_number: orders.house_number,
            street_number: orders.street_number,
            address: orders.address,
            phone: orders.phone,
            subtotal: orders.subtotal,
            shipping_mode: orders.shipping_mode,
            payment_mode: orders.payment_mode,
            shipping_fee: orders.shipping_fee,
            total: orders.total,
            status: orders.status,
            createdAt: orders.createdAt,
            updatedAt: orders.updatedAt,
        })
        .from(orders)
        .where(eq(orders.id, id))
        .limit(1);


    if (!order.length) notFound();

    const orderData = order[0];


    const items = await db
        .select({
            id: orderItems.id,
            quantity: orderItems.quantity,
            price: orderItems.price,
            images: products.images,
            title: products.title
        })
        .from(orderItems)
        .innerJoin(products, eq(orderItems.product_id, products.id))
        .where(eq(orderItems.order_id, orderData.id));

    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <Header />
            <div className="py-4">
                <OrderDetails order={orderData} items={items} />
            </div>
            <Footer />
        </div>
    );
}