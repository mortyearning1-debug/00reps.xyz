"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AgentSelector } from "./agent-selector"

interface PreferencesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CURRENCIES = [
  { code: "PLN", flag: "🇵🇱" },
  { code: "CNY", flag: "🇨🇳" },
  { code: "USD", flag: "🇺🇸" },
]

export function PreferencesDialog({ open, onOpenChange }: PreferencesDialogProps) {
  const [selectedAgent, setSelectedAgent] = useState<string>("acbuy")
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD")

  useEffect(() => {
    if (open) {
      const savedAgent = localStorage.getItem("preferredAgent")
      const savedCurrency = localStorage.getItem("preferredCurrency")
      if (savedAgent) setSelectedAgent(savedAgent)
      if (savedCurrency) setSelectedCurrency(savedCurrency)
    }
  }, [open])

  const handleSave = () => {
    localStorage.setItem("preferredAgent", selectedAgent)
    localStorage.setItem("preferredCurrency", selectedCurrency)
    window.dispatchEvent(new Event("preferencesChanged"))
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-black text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal">Select your preferences</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h3 className="text-sm text-zinc-400">Currency</h3>
            <div className="grid grid-cols-3 gap-3">
              {CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => setSelectedCurrency(currency.code)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-4 rounded-lg border transition-all",
                    selectedCurrency === currency.code
                      ? "border-white bg-zinc-900"
                      : "border-zinc-800 bg-transparent hover:border-zinc-700",
                  )}
                >
                  <span className="text-3xl">{currency.flag}</span>
                  <span className="text-sm font-medium">{currency.code}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm text-zinc-400">Agent</h3>
            <AgentSelector selectedAgent={selectedAgent} onSelectAgent={setSelectedAgent} />
          </div>

          <Button className="w-full bg-white text-black hover:bg-zinc-200 font-medium" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
