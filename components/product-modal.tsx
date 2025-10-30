"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/types"
import Image from "next/image"
import { ShoppingBag, Eye, ChevronDown } from "lucide-react"
import { AgentSelector, AGENTS } from "./agent-selector"

interface ProductModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const [selectedAgent, setSelectedAgent] = useState<string>("acbuy")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [showAgentSelector, setShowAgentSelector] = useState(false)

  useEffect(() => {
    const loadPreferredAgent = () => {
      const savedAgent = localStorage.getItem("preferredAgent")
      if (savedAgent) setSelectedAgent(savedAgent)
    }

    loadPreferredAgent()
    window.addEventListener("preferencesChanged", loadPreferredAgent)

    return () => window.removeEventListener("preferencesChanged", loadPreferredAgent)
  }, [])

  useEffect(() => {
    if (open && product) {
      const incrementViews = async () => {
        try {
          const supabase = getSupabaseBrowserClient()
          const { error } = await supabase.rpc("increment_product_views", {
            product_id: product.id,
          })
          if (error) {
            console.error("[v0] Error incrementing views:", error)
          }
        } catch (error) {
          console.error("[v0] Error:", error)
        }
      }
      incrementViews()

      // Set default selections
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0])
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0])
      }
    }
  }, [open, product])

  if (!product) return null

  const selectedAgentData = AGENTS.find((a) => a.id === selectedAgent)
  const agentLink = selectedAgentData ? product[selectedAgentData.key] : null

  const handleBuy = () => {
    if (agentLink) {
      window.open(agentLink, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-black border-zinc-800 p-0">
        <div className="relative w-full aspect-square bg-zinc-900">
          <Image
            src={product.image_url || "/placeholder.svg?height=800&width=800"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          <Badge className="absolute top-4 right-4 bg-blue-500 text-white border-0">New</Badge>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide">{product.name}</h2>
          </div>

          <div className="text-3xl font-bold text-white">${product.price.toFixed(2)}</div>

          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <Label className="text-zinc-400 text-sm">Color</Label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-12 h-12 rounded border-2 transition-all ${
                      selectedColor === color ? "border-white scale-110" : "border-zinc-700 hover:border-zinc-500"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                ))}
                {product.colors.length > 5 && (
                  <div className="flex items-center justify-center px-3 text-sm text-zinc-400">
                    +{product.colors.length - 5} opcji
                  </div>
                )}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <Label className="text-zinc-400 text-sm">Size</Label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border-2 font-medium transition-all ${
                      selectedSize === size
                        ? "border-white bg-white text-black"
                        : "border-zinc-700 text-white hover:border-zinc-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Eye className="h-4 w-4" />
            <span>{product.views?.toLocaleString() || "0"} views</span>
          </div>

          <div className="space-y-4">
            <div className="flex gap-0">
              <Button
                onClick={handleBuy}
                disabled={!agentLink}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-r-none h-12"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Buy
              </Button>
              <Button
                onClick={() => setShowAgentSelector(!showAgentSelector)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-l-none border-l border-emerald-700 px-3 h-12"
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>

            {showAgentSelector && (
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Select Agent</h3>
                <AgentSelector
                  selectedAgent={selectedAgent}
                  onSelectAgent={(agentId) => {
                    setSelectedAgent(agentId)
                    localStorage.setItem("preferredAgent", agentId)
                    setShowAgentSelector(false)
                  }}
                />
              </div>
            )}

            {!agentLink && (
              <p className="text-sm text-zinc-500 text-center">
                No link available for {selectedAgentData?.name}. Please select another agent.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
