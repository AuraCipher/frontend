"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@lib/util/cn"

export const Sheet            = SheetPrimitive.Root
export const SheetTrigger     = SheetPrimitive.Trigger
export const SheetClose       = SheetPrimitive.Close
export const SheetPortal      = SheetPrimitive.Portal
export const SheetTitle       = SheetPrimitive.Title
export const SheetDescription = SheetPrimitive.Description

/* ----------  overlay – rich black tint (no blur)  ---------- */
export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[100] bg-black/70", // black tint with 70% opacity, no blur, higher z-index
      "transition-opacity duration-300 ease-out",
      "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

/* ----------  side variants – solid black + white text  ---------- */
const sheetVariants = cva(
  "fixed z-[101] gap-6 bg-white text-black p-6 shadow-2xl", // solid white menu, higher z-index than overlay
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b border-neutral-200",
        bottom: "inset-x-0 bottom-0 border-t border-neutral-200",
        left: "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r border-neutral-200",
        right: "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l border-neutral-200",
      },
    },
    defaultVariants: { side: "left" },
  }
)

/* ----------  content – 1.6 s luxury slide  ---------- */
export const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> &
    VariantProps<typeof sheetVariants>
>(({ side = "left", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        sheetVariants({ side }),
        "transition-transform duration-1600 ease-out",
        side === "left"
          ? "data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0"
          : "data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
        className
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm text-neutral-900 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName