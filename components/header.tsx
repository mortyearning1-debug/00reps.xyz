"use client"

import Link from "next/link"
import { Search, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SearchDialog } from "@/components/search-dialog"
import { PreferencesDialog } from "@/components/preferences-dialog"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white">00REPS</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                Home
              </Link>
              <Link href="/w2c" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                W2C
              </Link>
            </nav>

            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <Button
                variant="outline"
                className="w-full justify-start text-white/60 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                Search products...
              </Button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsPreferencesOpen(true)}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <nav className="flex flex-col space-y-3">
                <Link href="/" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                  Home
                </Link>
                <Link href="/w2c" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                  W2C
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <PreferencesDialog open={isPreferencesOpen} onOpenChange={setIsPreferencesOpen} />
    </>
  )
}
