'use client'

import { useEffect, useState } from "react"
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
import { MoreHorizontal } from "lucide-react"
import { Product, ProductAvailability } from "@/types"
import ProductDetails from "@/components/ui/product-details"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import EditProduct from "@/components/ui/edit-product";
import { useTabStore } from "@/store/tab"
import { useCurrency } from "@/store/currency-store"

const availabilityStyles: Record<ProductAvailability, string> = {
  available: "bg-green-100 text-green-700",
  "sold-out": "bg-red-100 text-red-700",
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openDetails, setOpenDetails] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const { setActiveTab, selectedProductId, setSelectedProductId } = useTabStore();
  const { currency, rate } = useCurrency();

  const formatPrice = (value: number) =>
    `${currency} ${(rate * value).toFixed(2)}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-muted-foreground">
        Loading products...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-red-600">
        {error}
      </div>
    )
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      setDeleting(true)

      const res = await fetch(`/api/products/${deleteId}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Delete failed")

      setProducts((prev) => prev.filter((p) => p.id !== deleteId))

      if (selectedProductId === deleteId) {
        setOpenDetails(false)
        setSelectedProductId(null)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  return (
    <div className="rounded-xl border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actual Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Discounted Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-muted/40">
              {/* Product */}
              <TableCell>
                <div className="font-medium">{product.title}</div>
                <div className="text-sm text-muted-foreground">
                  Updated on {new Date(product.createdAt).toDateString()}
                </div>
              </TableCell>

              {/* Category */}
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {product.category && product.category.length > 0 ? (
                    product.category.map((cat, i) => (
                      <Badge key={i} className="rounded-full px-2 py-1 text-xs font-medium">
                        {cat}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">No Category</span>
                  )}
                </div>
              </TableCell>

              {/* Price */}
              <TableCell className="font-medium">
                {formatPrice(product.price)}
              </TableCell>

              {/* Discount */}
              <TableCell className="font-medium">
                {product.discount}%
              </TableCell>

              {/* Discounted */}
              <TableCell className="font-medium">
                {formatPrice(product.discountedPrice)}
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  className={`rounded-full px-3 py-1 text-xs font-medium ${availabilityStyles[product.availability]}`}
                >
                  {product.availability === "available"
                    ? "Available"
                    : "Sold Out"}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProductId(product.id)
                      setOpenDetails(true)
                    }}
                  >
                    Details
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setActiveTab('Edit Product');
                        }}
                      >
                        Edit
                      </DropdownMenuItem>


                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setDeleteId(product.id)}
                      >
                        Delete
                      </DropdownMenuItem>


                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProductDetails
        productId={selectedProductId}
        open={openDetails}
        onOpenChange={(open) => {
          setOpenDetails(open)
          if (!open) setSelectedProductId(null)
        }}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
