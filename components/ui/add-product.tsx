'use client';

import React from "react";
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

const categories = [
  { label: "New Arrivals", value: "new-arrivals" },
  { label: "Sale", value: "sale" },
  { label: "Clothing", value: "clothing" },
  { label: "Sets", value: "sets" },
  { label: "Necklaces", value: "necklaces" },
  { label: "Earings", value: "earings" },
  { label: "Rings", value: "rings" },
  { label: "Anklets", value: "anklets" },
  { label: "Bangles – Bracelets", value: "bangles-bracelets" },
  { label: "Nosecuffs", value: "nosecuffs" },
  { label: "Matha Patti", value: "matha-patti" },
  { label: "Hair Accessories", value: "hair-accessories" },
  { label: "Clutches – Bags", value: "clutches-bags" },
  { label: "Gift Items", value: "gift-items" },
  { label: "Meena Bazar", value: "meena-bazar" },
  { label: "Jhumkaaz", value: "jhumkaaz" },
  { label: "Gems & Stones", value: "gems-stones" },
  { label: "Jewellery Boxes", value: "jewellery-boxes" },
  { label: "Toe Rings", value: "toe-rings" },
];

interface DeliveryTime {
  id: string;
  value: string;
}

export default function AddProduct() {
  const [images, setImages] = React.useState<string[]>([]);
  const [form, setForm] = React.useState({
    title: "",
    category: "",
    price: "",
    discountedPrice: "",
    availability: "available",
    discount: "0",
    deliveryTimes: [] as DeliveryTime[],
    description: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (id: string, value: string) => {
    const updated = form.deliveryTimes.map((item) =>
      item.id === id ? { ...item, value } : item
    );
    handleChange("deliveryTimes", updated);
  };

  const addArrayField = () => {
    const newField: DeliveryTime = { id: crypto.randomUUID(), value: "" };
    handleChange("deliveryTimes", [...form.deliveryTimes, newField]);
  };

  const removeArrayField = (id: string) => {
    handleChange(
      "deliveryTimes",
      form.deliveryTimes.filter((item) => item.id !== id)
    );
  };

  const handleSave = async () => {
    const priceNum = Number(form.price);
    const discountNum = Number(form.discount);

    const cleanDelivery = form.deliveryTimes
      .map((d) => d.value)
      .filter((v) => v.trim() !== "");

    const discountedPrice = Math.round(priceNum - (priceNum * discountNum) / 100);

    const payload = {
      title: form.title,
      category: form.category,
      price: priceNum,
      availability: form.availability,
      description: form.description,
      discount: discountNum,
      discountedPrice: discountedPrice,
      deliveryTime: cleanDelivery,
      images: images,
    };

    if (!payload.title) {
      setMessage({
        type: "error",
        text: "Please fill all required fields and add at least one image.",
      });
      return;
    }

    if (!images.length) {
      setMessage({
        type: "error",
        text: "Please upload at least one product image.",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Something went wrong" });
        return;
      }

      setMessage({ type: "success", text: "Product saved successfully!" });

      setForm({
        title: "",
        category: "",
        price: "",
        discountedPrice: "",
        availability: "available",
        discount: "0",
        deliveryTimes: [],
        description: "",
      });
      setImages([]);
    } catch (error) {
      setMessage({ type: "error", text: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT COLUMN */}
      <div className="space-y-6">
        {/* Images */}
        <Card className="p-4 space-y-3">
          <Label className="block">Product Images *</Label>

          <div className="grid grid-cols-2 gap-3">
            {images.map((img) => (
              <div key={img} className="relative aspect-square rounded-md overflow-hidden border">
                <Image src={img} alt="product" fill className="object-cover" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                  onClick={() => setImages((prev) => prev.filter((i) => i !== img))}
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const uploadedUrls = res.map((file) => file.url);
              setImages((prev) => [...prev, ...uploadedUrls]);
            }}
            onUploadError={(error: Error) => {
              setMessage({ type: "error", text: error.message });
            }}
            appearance={{
              button: "w-full bg-primary text-white hover:bg-primary/90",
            }}
          />
        </Card>
      </div>

      {/* RIGHT COLUMN */}
      <Card className="lg:col-span-2 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Product Details</h2>
          <span className="text-sm text-muted-foreground">Status: Draft</span>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <Label>Product Name *</Label>
          <Input
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Premium Lawn Suit"
          />
        </div>

        {/* Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 w-full">
            <Label>Category *</Label>
            <Select
              value={form.category}
              onValueChange={(val) => handleChange("category", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" className="w-full" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {categories.map((item) => (
                  <SelectItem key={item.value} value={item.label.toLowerCase()}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Availability *</Label>
            <Select
              value={form.availability}
              onValueChange={(val) => handleChange("availability", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
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
            <Input
              type="number"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Discount (%)</Label>
            <Input
              type="number"
              value={form.discount}
              max={99}
              min={1}
              onChange={(e) => handleChange("discount", e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Delivery Time */}
        <div className="space-y-2">
          <Label>Delivery Times *</Label>
          {form.deliveryTimes.map((time) => (
            <div key={time.id} className="flex gap-2 mb-1">
              <Input
                value={time.value}
                onChange={(e) => handleArrayChange(time.id, e.target.value)}
                placeholder="e.g: X-Y days Citywide/Nationwide/International"
              />
              <Button variant="outline" size="sm" onClick={() => removeArrayField(time.id)}>
                <Trash size={16} />
              </Button>
            </div>
          ))}
          <Button size="sm" onClick={addArrayField}>
            <Plus size={16} /> Add Delivery Time
          </Button>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Description *</Label>
          <Textarea
            className="min-h-[100px]"
            value={form.description}
            placeholder=""
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-2 rounded ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="outline" disabled={loading}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
