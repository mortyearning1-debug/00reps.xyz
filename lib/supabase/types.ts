export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          image_url: string
          category: string
          brand: string | null
          views: number
          created_at: string
          acbuy_link: string | null
          cnfans_link: string | null
          mycnbox_link: string | null
          kakobuy_link: string | null
          allchinabuy_link: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          image_url: string
          category: string
          brand?: string | null
          views?: number
          created_at?: string
          acbuy_link?: string | null
          cnfans_link?: string | null
          mycnbox_link?: string | null
          kakobuy_link?: string | null
          allchinabuy_link?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string
          category?: string
          brand?: string | null
          views?: number
          created_at?: string
          acbuy_link?: string | null
          cnfans_link?: string | null
          mycnbox_link?: string | null
          kakobuy_link?: string | null
          allchinabuy_link?: string | null
        }
      }
      agents: {
        Row: {
          id: string
          name: string
          description: string | null
          icon_url: string | null
          created_at: string
        }
      }
      currencies: {
        Row: {
          id: string
          code: string
          name: string
          symbol: string
          rate: number
          created_at: string
        }
      }
    }
  }
}
