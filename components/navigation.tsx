"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/sermons", label: "Sermons" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/20 bg-[#f8f4ef]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/cropped_circle_image.png"
            alt="Emmanuel Baptist Church"
            width={44}
            height={44}
            className="rounded-full object-cover ring-2 ring-[#331660]/20"
          />
          <div className="hidden sm:block">
            <p className="font-heading text-xl font-semibold leading-tight text-[#331660]">Emmanuel Baptist</p>
            <p className="text-xs tracking-[0.16em] text-[#331660]/70">ETHIOPIAN CHURCH</p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#331660] text-white"
                    : "text-[#331660]/80 hover:bg-[#331660]/10 hover:text-[#331660]"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-2 text-[#331660] md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#331660]/10 bg-[#f8f4ef]/95 px-4 pb-4 pt-3 md:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                    active ? "bg-[#331660] text-white" : "text-[#331660]/85 hover:bg-[#331660]/10"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
