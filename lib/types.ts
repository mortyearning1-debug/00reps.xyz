export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string
  brand: string | null
  agent_id: string | null
  views: number
  acbuy_link: string | null
  cnfans_link: string | null
  mycnbox_link: string | null
  kakobuy_link: string | null
  allchinabuy_link: string | null
  colors: string[] | null
  sizes: string[] | null
  created_at: string
  updated_at: string
}

export interface Agent {
  id: string
  name: string
  description: string | null
  rating: number | null
  contact_info: string | null
  created_at: string
}

export interface Currency {
  id: string
  code: string
  name: string
  symbol: string
  exchange_rate: number
  created_at: string
}

export const CATEGORIES = [
  "All",
  "Accessories",
  "Bags",
  "Clothing",
  "Heatwear",
  "Hoodies",
  "Jackets",
  "Pants",
  "Shorts",
  "Shoes",
  "Sweaters",
  "Sweatpants",
  "T-Shirts",
  "Vests",
  "Wallets",
  "Jewerely",
  "Zip Hoodies",
] as const

export type Category = (typeof CATEGORIES)[number]
