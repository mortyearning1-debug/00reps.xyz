"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/types"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchProducts = async () => {
      setLoading(true)
      try {
        const supabase = getSupabaseBrowserClient()

        // Search in name, description, brand, and category
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%,category.ilike.%${query}%`)
          .limit(10)

        if (error) {
          console.error("[v0] Search error:", error)
          return
        }

        setResults(data || [])
      } catch (error) {
        console.error("[v0] Search error:", error)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleProductClick = (product: Product) => {
    onOpenChange(false)
    setQuery("")
    // Navigate to W2C page with the product's category
    router.push(`/w2c?category=${product.category}&product=${product.id}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, brand, category..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={product.image_url || "/placeholder.svg?height=64&width=64"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{product.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {product.brand && <span>{product.brand}</span>}
                      <span>•</span>
                      <span>{product.category}</span>
                    </div>
                  </div>
                  <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="text-center py-8 text-muted-foreground">No products found for "{query}"</div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Start typing to search products...</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
