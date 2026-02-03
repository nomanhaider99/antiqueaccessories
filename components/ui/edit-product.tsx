'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { Product } from "@/types";

interface EditProductProps {
  productId: string | null;
  onUpdated?: () => void; // callback after successful update
}

export default function EditProduct({ productId, onUpdated }: EditProductProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    article: "",
    category: "",
    collection: "",
    price: "",
    discountedPrice: "",
    type: "",
    availability: "available",
    discount: "0",
    sizes: [""],
    deliveryTimes: [""],
    description: "",
    disclaimer: [""],
  });

  console.log('Product ID: ', productId);
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        const prod: Product = data.data;

        setForm({
          article: prod.article,
          category: prod.category,
          collection: prod.collection,
          price: String(prod.price),
          discountedPrice: String(prod.discountedPrice),
          type: prod.type,
          availability: prod.availability,
          discount: String(prod.discount),
          sizes: prod.size?.split(",").map(s => s.trim()) || [""],
          deliveryTimes: prod.deliveryTime || [""],
          description: prod.description,
          disclaimer: prod.disclaimer?.split("|").map(d => d.trim()) || [""],
        });

        setImages(prod.images || []);
      } catch (err) {
        setMessage({ type: "error", text: "Failed to load product" });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (key: string, index: number, value: string) => {
    const arr = [...(form as any)[key]];
    arr[index] = value;
    handleChange(key, arr);
  };

  const addArrayField = (key: string) => {
    handleChange(key, [...(form as any)[key], ""]);
  };

  const removeArrayField = (key: string, index: number) => {
    const arr = [...(form as any)[key]];
    arr.splice(index, 1);
    handleChange(key, arr);
  };

  const handleUpdate = async () => {
    const priceNum = Number(form.price);
    const discountNum = Number(form.discount);
    const cleanSizes = form.sizes.filter(s => s.trim() !== "").join(", ");
    const cleanDelivery = form.deliveryTimes.filter(t => t.trim() !== "");
    const cleanDisclaimer = form.disclaimer.filter(d => d.trim() !== "").join(" | ");
    const discountedPrice = priceNum - (priceNum * discountNum) / 100;

    const payload = {
      article: form.article,
      category: form.category,
      collection: form.collection,
      price: priceNum,
      type: form.type,
      size: cleanSizes,
      availability: form.availability,
      description: form.description,
      discount: discountNum,
      discountedPrice: discountedPrice,
      deliveryTime: cleanDelivery,
      images,
      disclaimer: cleanDisclaimer,
    };

    if (!payload.article || !payload.type || !payload.size || images.length === 0) {
      setMessage({ type: "error", text: "Please fill all required fields and add at least one image." });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Failed to update product" });
        return;
      }

      setMessage({ type: "success", text: "Product updated successfully!" });
      onUpdated?.();
    } catch (error) {
      setMessage({ type: "error", text: String(error) });
    } finally {
      setLoading(false);
    }
  };

  if (!productId) return <div>Select a product to edit</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT COLUMN: Images */}
      <div className="space-y-6">
        <Card className="p-4 space-y-3">
          <Label>Product Images *</Label>
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-md overflow-hidden border">
                <Image src={img} alt="product" fill className="object-cover" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                  onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => setImages(prev => [...prev, ...res.map(f => f.url)])}
            onUploadError={(err: Error) => setMessage({ type: "error", text: err.message })}
            appearance={{ button: "w-full bg-primary text-white hover:bg-primary/90" }}
          />
        </Card>
      </div>

      {/* RIGHT COLUMN: Form */}
      <Card className="lg:col-span-2 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <span className="text-sm text-muted-foreground">Status: Draft</span>
        </div>

        {/* Article */}
        <div className="space-y-2">
          <Label>Product Name *</Label>
          <Input
            value={form.article}
            onChange={e => handleChange("article", e.target.value)}
          />
        </div>

        {/* Category + Collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select value={form.category} onValueChange={val => handleChange("category", val)}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Collection *</Label>
            <Select value={form.collection} onValueChange={val => handleChange("collection", val)}>
              <SelectTrigger><SelectValue placeholder="Select collection" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="new-arrivals">New Arrivals</SelectItem>
                <SelectItem value="top-selling">Top Selling</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Type + Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Type *</Label>
            <Select value={form.type} onValueChange={val => handleChange("type", val)}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="stitched">Stitched</SelectItem>
                <SelectItem value="unstitched">Unstitched</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Availability *</Label>
            <Select value={form.availability} onValueChange={val => handleChange("availability", val)}>
              <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold-out">Sold Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price + Discount */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Price *</Label>
            <Input type="number" value={form.price} onChange={e => handleChange("price", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Discount (%)</Label>
            <Input type="number" value={form.discount} onChange={e => handleChange("discount", e.target.value)} />
          </div>
        </div>

        {/* Dynamic arrays: Sizes */}
        <div className="space-y-2">
          <Label>Sizes *</Label>
          {form.sizes.map((size, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <Input value={size} onChange={e => handleArrayChange("sizes", i, e.target.value)} />
              <Button variant="outline" size="sm" onClick={() => removeArrayField("sizes", i)}>
                <Trash size={16} />
              </Button>
            </div>
          ))}
          <Button size="sm" onClick={() => addArrayField("sizes")}><Plus size={16} /> Add Size</Button>
        </div>

        {/* Dynamic arrays: DeliveryTimes */}
        <div className="space-y-2">
          <Label>Delivery Times *</Label>
          {form.deliveryTimes.map((time, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <Input value={time} onChange={e => handleArrayChange("deliveryTimes", i, e.target.value)} />
              <Button variant="outline" size="sm" onClick={() => removeArrayField("deliveryTimes", i)}>
                <Trash size={16} />
              </Button>
            </div>
          ))}
          <Button size="sm" onClick={() => addArrayField("deliveryTimes")}><Plus size={16} /> Add Delivery Time</Button>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Description *</Label>
          <Textarea value={form.description} onChange={e => handleChange("description", e.target.value)} />
        </div>

        {/* Disclaimer */}
        <div className="space-y-2">
          <Label>Disclaimer *</Label>
          {form.disclaimer.map((disc, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <Input value={disc} onChange={e => handleArrayChange("disclaimer", i, e.target.value)} />
              <Button variant="outline" size="sm" onClick={() => removeArrayField("disclaimer", i)}>
                <Trash size={16} />
              </Button>
            </div>
          ))}
          <Button size="sm" onClick={() => addArrayField("disclaimer")}><Plus size={16} /> Add Disclaimer</Button>
        </div>

        {message && (
          <div className={`p-2 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message.text}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="outline" disabled={loading}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={loading}>{loading ? "Updating..." : "Update Product"}</Button>
        </div>
      </Card>
    </div>
  );
}
