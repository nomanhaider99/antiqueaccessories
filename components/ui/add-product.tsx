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

export default function AddProduct() {
  const [images, setImages] = React.useState<string[]>([]);
  const [form, setForm] = React.useState({
    article: "",
    collection: "",
    price: "",
    discountedPrice: "",
    type: "",
    availability: "available",
    discount: "0",
    sizes: [""],
    deliveryTimes: [""],
    description: "",
    disclaimer: [""]
  });


  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async () => {
    const priceNum = Number(form.price);
    const discountNum = Number(form.discount);

    // Filter empty strings from arrays to prevent "size": "S, , L"
    const cleanSizes = form.sizes.filter(s => s.trim() !== "").join(", ");
    const cleanDelivery = form.deliveryTimes.filter(t => t.trim() !== "");
    const cleanDisclaimer = form.disclaimer.filter(d => d.trim() !== "").join(" | ");

    const discountedPrice = Math.round(
      priceNum - (priceNum * discountNum) / 100
    );


    const payload = {
      article: form.article,
      collection: form.collection,
      price: priceNum,
      type: form.type,
      size: cleanSizes,
      availability: form.availability,
      description: form.description,
      discount: discountNum,
      discountedPrice: discountedPrice,
      deliveryTime: cleanDelivery,
      images: images,
      disclaimer: cleanDisclaimer,
    };

    if (!payload.article || !payload.type || !payload.size) {
      setMessage({ type: "error", text: "Please fill all required fields and add at least one image." });
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

      // Reset form
      setForm({
        article: "",
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

          {/* Image Preview Grid */}
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-md overflow-hidden border"
              >
                <Image
                  src={img}
                  alt="product"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, idx) => idx !== i))
                  }
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Upload Button */}
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
              button:
                "w-full bg-primary text-white hover:bg-primary/90",
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
            value={form.article}
            onChange={(e) => handleChange("article", e.target.value)}
            placeholder="e.g. Premium Lawn Suit"
          />
        </div>

        {/* Category + Collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 w-full">
            <Label>Collection *</Label>
            <Select
              value={form.collection}
              onValueChange={(val) => handleChange("collection", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select collection" className="w-full" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="new-arrivals">New Arrivals</SelectItem>
                <SelectItem value="casuals">Casuals</SelectItem>
                <SelectItem value="luxe-pret26">Luxe Pret 26’</SelectItem>
                <SelectItem value="lune">Lune</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Type + Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Product Type *</Label>
            <Select
              value={form.type}
              onValueChange={(val) => handleChange("type", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stitched">Stitched</SelectItem>
                <SelectItem value="unstitched">Unstitched</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

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

        {/* Price + Discount + Discounted Price */}
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

        {/* Dynamic Sizes */}
        <div className="space-y-2">
          <Label>Sizes *</Label>
          {form.sizes.map((size, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <Input
                value={size}
                onChange={(e) => handleArrayChange("sizes", i, e.target.value)}
                placeholder="e.g. S, M, L, XL"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeArrayField("sizes", i)}
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
          <Button size="sm" onClick={() => addArrayField("sizes")}>
            <Plus size={16} /> Add Size
          </Button>
        </div>

        {/* Dynamic Delivery Time */}
        <div className="space-y-2">
          <Label>Delivery Times *</Label>
          {form.deliveryTimes.map((time, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <Input
                value={time}
                onChange={(e) =>
                  handleArrayChange("deliveryTimes", i, e.target.value)
                }
                placeholder="e.g: X-Y days Citywide/Nationwide/International"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeArrayField("deliveryTimes", i)}
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
          <Button size="sm" onClick={() => addArrayField("deliveryTimes")}>
            <Plus size={16} /> Add Delivery Time
          </Button>
        </div>

        {/* Dynamic Description */}
        <div className="space-y-2">
          <Label>Description  *</Label>
          <Textarea
            className="min-h-[100px]"
            value={form.description}
            placeholder=""
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Dynamic Disclaimer */}
        <div className="space-y-2">
          <Label>Disclaimer *</Label>
          {form.disclaimer.map((disc, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <Input
                value={disc}
                onChange={(e) => handleArrayChange("disclaimer", i, e.target.value)}
                placeholder="Enter disclaimer"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeArrayField("disclaimer", i)}
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
          <Button size="sm" onClick={() => addArrayField("disclaimer")}>
            <Plus size={16} /> Add Disclaimer
          </Button>
        </div>

        {message && (
          <div
            className={`p-2 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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
