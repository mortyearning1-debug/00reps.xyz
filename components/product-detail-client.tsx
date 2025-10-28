"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { incrementProductViews } from "@/app/actions/increment-views"
import { AgentSelector, AGENTS } from "@/components/agent-selector"
import type { Product } from "@/lib/types"
import Image from "next/image"
import { Eye, ChevronDown, ChevronLeft, ChevronRight, Share2, Flag, Loader2, Check } from "lucide-react"

interface ProductDetailClientProps {
  productId: string
}

export function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<string>("acbuy")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [showAgentSelector, setShowAgentSelector] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showCopyToast, setShowCopyToast] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

        if (error) {
          console.error("[v0] Error fetching product:", error)
          return
        }

        setProduct(data)

        await incrementProductViews(productId)

        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0])
        }
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0])
        }
      } catch (error) {
        console.error("[v0] Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  useEffect(() => {
    const loadPreferredAgent = () => {
      const savedAgent = localStorage.getItem("preferredAgent")
      if (savedAgent) setSelectedAgent(savedAgent)
    }

    loadPreferredAgent()
    window.addEventListener("preferencesChanged", loadPreferredAgent)

    return () => window.removeEventListener("preferencesChanged", loadPreferredAgent)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-white text-lg">Product not found</p>
        </main>
        <Footer />
      </div>
    )
  }

  const selectedAgentData = AGENTS.find((a) => a.id === selectedAgent)
  const agentLink = selectedAgentData ? product[selectedAgentData.key] : null

  const handleBuy = () => {
    if (agentLink) {
      window.open(agentLink, "_blank", "noopener,noreferrer")
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowCopyToast(true)
      setTimeout(() => setShowCopyToast(false), 3000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  const handleReport = () => {
    window.open("https://discord.gg/VcXvg8SprE", "_blank", "noopener,noreferrer")
  }

  const images = [product.image_url || "/placeholder.svg?height=800&width=800"]

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left: Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
                <Image
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                <Badge className="absolute top-4 right-4 bg-blue-500 text-white border-0 hover:bg-blue-600">New</Badge>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>{product.views?.toLocaleString() || "0"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="w-10 h-10 rounded-lg bg-black border border-zinc-800 hover:bg-zinc-900 flex items-center justify-center transition-colors"
                    title="Copy link"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleReport}
                    className="w-10 h-10 rounded-lg bg-black border border-zinc-800 hover:bg-zinc-900 flex items-center justify-center transition-colors"
                    title="Report"
                  >
                    <Flag className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                  店
                </div>
                <span className="text-zinc-400 text-sm">我的小店</span>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide leading-tight">
                  {product.name}
                </h1>
              </div>

              <div className="text-4xl font-bold text-white">${product.price.toFixed(0)}</div>

              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-white text-base">Color</Label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {product.colors.slice(0, 6).map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-14 h-14 rounded-lg border-2 transition-all ${
                          selectedColor === color ? "border-white scale-105" : "border-zinc-700 hover:border-zinc-500"
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-white rounded-full shadow-lg" />
                          </div>
                        )}
                      </button>
                    ))}
                    {product.colors.length > 6 && (
                      <div className="text-zinc-400 text-sm">+{product.colors.length - 6} opcji</div>
                    )}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-white text-base">Size</Label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? "bg-white text-black"
                            : "bg-black border border-zinc-800 text-white hover:bg-zinc-900"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-4">
                <div className="flex gap-2">
                  <Button
                    onClick={handleBuy}
                    disabled={!agentLink}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl h-14 text-base"
                  >
                    <Share2 className="mr-2 h-5 w-5" />
                    Buy
                  </Button>
                  <Button
                    onClick={() => setShowAgentSelector(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 h-14"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>

                {!agentLink && (
                  <p className="text-sm text-zinc-500 text-center">
                    No link available for {selectedAgentData?.name}. Please select another agent.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {showCopyToast && (
        <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-center gap-3 bg-black border border-zinc-800 rounded-xl px-4 py-3 shadow-lg">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
              <Check className="h-3 w-3 text-black" />
            </div>
            <span className="text-white text-sm font-medium">Item link copied to clipboard</span>
          </div>
        </div>
      )}

      <Dialog open={showAgentSelector} onOpenChange={setShowAgentSelector}>
        <DialogContent className="bg-black border-zinc-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Select Agent</DialogTitle>
          </DialogHeader>
          <AgentSelector
            selectedAgent={selectedAgent}
            onSelectAgent={(agentId) => {
              setSelectedAgent(agentId)
              localStorage.setItem("preferredAgent", agentId)
              setShowAgentSelector(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
