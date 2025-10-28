"use client"

import { Button } from "@/components/ui/button"
import { CATEGORIES, type Category } from "@/lib/types"
import { cn } from "@/lib/utils"
import { SlidersHorizontal } from "lucide-react"
import { useRef, useEffect, useState } from "react"

interface CategoryFilterProps {
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(false)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftShadow(scrollLeft > 0)
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 overflow-hidden">
          {showLeftShadow && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          )}
          {showRightShadow && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          )}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 transition-all shrink-0",
                  selectedCategory === category
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-secondary/50 hover:bg-secondary",
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        <Button variant="secondary" size="sm" className="shrink-0 rounded-full px-4 bg-secondary/50">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  )
}
