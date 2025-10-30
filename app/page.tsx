import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Shield, Truck, CreditCard } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const categories = [
    { name: "Hoodies", image: "/cozy-hoodie.png", count: "150+" },
    { name: "Shoes", image: "/diverse-sneaker-collection.png", count: "200+" },
    { name: "Bags", image: "/luxury-bag.png", count: "80+" },
    { name: "Jackets", image: "/stylish-woman-leather-jacket.png", count: "120+" },
    { name: "Accessories", image: "/fashion-accessories-flatlay.png", count: "90+" },
    { name: "Jewelry", image: "/assorted-jewelry-display.png", count: "60+" },
  ]

  const features = [
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "All products verified for quality and authenticity",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Quick delivery with trusted agents worldwide",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Safe and secure payment processing",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Discover Premium Replica Fashion
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty">
                Your trusted marketplace for high-quality replica streetwear, designer bags, and accessories. Shop with
                confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/w2c">
                    Browse Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/guides">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="border-none shadow-none bg-transparent">
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Shopping?</h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Join thousands of satisfied customers and discover the best replica fashion deals
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/w2c">
                    Explore All Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
