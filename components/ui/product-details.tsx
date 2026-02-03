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

type Product = {
  id: string;
  article: string;
  category: string;
  collection: string;
  price: number;
  discountedPrice: number;
  discount: number;
  type: "stitched" | "unstitched" | "both";
  size: string;
  availability: "available" | "sold-out";
  description: string;
  deliveryTime: string[];
  images: string[];
  disclaimer: string;
  createdAt: string | Date;
};

interface ProductDetailsSheetProps {
  productId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductDetails({
  productId,
  open,
  onOpenChange,
}: ProductDetailsSheetProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId || !open) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        const json = await res.json();
        setProduct(json.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 gap-0 overflow-y-scroll"
      >
        <SheetHeader className="p-6 pb-2 text-left">
          <SheetTitle className="text-xl font-bold tracking-tight">
            #{productId}
          </SheetTitle>
          <p className="text-sm text-gray-500 font-medium">
            Product details
          </p>
        </SheetHeader>

        {/* Images */}
        <div className="px-6 py-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-4">Images</h4>

          <div className="grid grid-cols-3 gap-3">
            {product?.images?.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-md border overflow-hidden bg-gray-50"
              >
                <Image
                  src={img}
                  alt={product.article}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">
            Loading details...
          </div>
        ) : (
          product && (
            <div className="flex flex-col">
              {/* Meta */}
              <div className="p-6 flex flex-col gap-4">
                <DetailRow label="Article" value={product.article} />
                <DetailRow label="Category" value={product.category} />
                <DetailRow label="Collection" value={product.collection} />
                <DetailRow label="Type" value={product.type} />
                <DetailRow label="Size" value={product.size} />
                <DetailRow
                  label="Availability"
                  value={
                    <span className="capitalize">
                      {product.availability.replace("-", " ")}
                    </span>
                  }
                />
                <DetailRow
                  label="Launched On"
                  value={new Date(product.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )}
                />
              </div>

              <Separator />

              {/* Pricing */}
              <div className="p-6 flex flex-col gap-4">
                <DetailRow
                  label="Original price"
                  value={`Rs. ${product.price}/-`}
                />
                <DetailRow
                  label="Discount"
                  value={`${product.discount}%`}
                />
                <DetailRow
                  label="Final price"
                  value={`Rs. ${product.discountedPrice}/-`}
                />
              </div>

              <Separator />

              {/* Extra */}
              <div className="p-6 flex flex-col gap-4">
                <DetailRow
                  label="Delivery time"
                  value={product.deliveryTime.join(", ")}
                />
                <DetailRow
                  label="Description"
                  value={product.description}
                />
                <DetailRow
                  label="Disclaimer"
                  value={product.disclaimer}
                />
              </div>
            </div>
          )
        )}
      </SheetContent>
    </Sheet>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-start text-sm gap-4">
      <span className="text-gray-500 font-medium w-1/3">{label}</span>
      <span className="text-gray-900 font-semibold w-2/3 text-left">
        {value}
      </span>
    </div>
  );
}
