"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 dark:bg-zinc-900 rounded-xl bg-background">
        <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={product.image_url || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 right-3 bg-blue-500 text-white hover:bg-blue-600 border-0 text-xs px-2 py-1">
            New
          </Badge>

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <h3 className="font-medium text-sm leading-tight line-clamp-2 mb-2">{product.name}</h3>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                <span>{product.views?.toLocaleString() || "0"}</span>
              </div>
              <span className="font-semibold text-base">${Number(product.price).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
