import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { X } from "lucide-react"
import Link from "next/link"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Offers", href: "/offers" },
  { name: "Trips", href: "/trips" },
  { name: "Visa Services", href: "/visa-services" },
  { name: "About us", href: "/about" },
]

export function MobileNav() {
  return (
    <Dialog>
      <DialogContent className="fixed inset-0 z-50 flex h-[100dvh] flex-col bg-white">
        <VisuallyHidden asChild>
          <DialogTitle>Navigation Menu</DialogTitle>
        </VisuallyHidden>

        <div className="flex justify-end p-4">
          <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-4">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 text-lg font-medium text-gray-900 hover:text-gray-600"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </DialogContent>
    </Dialog>
  )
} 