import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Menu, User, Moon, Sun, Home, Package, Sparkles, Info } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@modules/common/components/sheet"
import { Button } from "@modules/common/components/button"
import CartButton from "@modules/layout/components/cart-button"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  const menuItems = [
    { title: "Home", icon: Home, href: "/" },
    { title: "Shop", icon: Package, href: "/store" },
    { title: "New Arrivals", icon: Sparkles, href: "#new" },
    { title: "About", icon: Info, href: "#about" },
  ]

  // TODO: Replace with real theme toggle later
  const theme = "light"
  const logoSrc = theme === "dark" ? "/assets/logo-dark.png" : "/assets/logo.png"

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-200">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col h-full">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  {/* Logo in Menu */}
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-200">
                    <Image
                      src={logoSrc}
                      alt="DailyBudgetMart Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <h2 className="font-serif text-xl tracking-tight">DailyBudgetMart</h2>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors"
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Menu Actions */}
                  <div className="pt-6 border-t border-neutral-200 space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-4">
                      <User className="h-5 w-5" />
                      <span>Account</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-4 relative">
                      <ShoppingCart className="h-5 w-5" />
                      <span>Cart</span>
                      <span className="ml-auto bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        0
                      </span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo beside menu */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logoSrc}
                alt="DailyBudgetMart Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <h1 className="font-serif text-xl md:text-2xl tracking-tight hidden sm:block">
                DailyBudgetMart
              </h1>
            </Link>
          </div>

          {/* Right: Action Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" size="icon">
              <Moon className="h-5 w-5" />
            </Button>
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Suspense
              fallback={
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </span>
                  </Button>
                </Link>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>
      </nav>
    </header>
  )
}