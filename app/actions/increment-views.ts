"use server"

import { createClient } from "@/lib/supabase/server"

export async function incrementProductViews(productId: string) {
  const supabase = await createClient()

  const { error } = await supabase.rpc("increment_product_views", {
    product_id: productId,
  })

  if (error) {
    console.error("[v0] Error incrementing views:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
