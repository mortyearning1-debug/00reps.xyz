import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

let client: ReturnType<typeof createClient<Database>> | null = null

export function getSupabaseBrowserClient() {
  // Only create client in browser environment
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowserClient can only be called in the browser")
  }

  if (client) {
    return client
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase environment variables:", {
      url: !!supabaseUrl,
      key: !!supabaseAnonKey,
      env: process.env,
    })
    throw new Error(
      "Supabase environment variables are not configured. Please check your environment variables in the Vars section.",
    )
  }

  console.log("[v0] Creating Supabase browser client with URL:", supabaseUrl)

  client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })

  return client
}
