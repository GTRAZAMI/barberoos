"use client";

import { CalendarDays, Menu, Scissors, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { sitePath } from "@/lib/site-path";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Barbers", href: "/#barbers" },
  { label: "Booking", href: "/#booking" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader({ cartCount = 0 }: { cartCount?: number }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#11100e]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href={sitePath("/")} className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded bg-[#d6aa63] text-[#11100e] shadow-[0_12px_40px_rgba(214,170,99,.35)]">
            <Scissors size={20} />
          </span>
          <span className="text-xl font-black tracking-[0.18em]">BARBEROOS</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-[#d8cec0] md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={sitePath(item.href)} className="transition hover:text-[#d6aa63]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={sitePath("/#booking")}
            className="hidden items-center gap-2 rounded bg-[#f8f1e7] px-4 py-2 text-sm font-bold text-[#11100e] transition hover:bg-[#d6aa63] sm:flex"
          >
            Book now <CalendarDays size={16} />
          </a>
          <a href={sitePath("/products#cart")} className="relative grid size-10 place-items-center rounded border border-white/15">
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-[#d6aa63] text-xs font-black text-[#11100e]">
                {cartCount}
              </span>
            )}
          </a>
          <button
            className="grid size-10 place-items-center rounded border border-white/15 md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#151310] px-5 py-4 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-3">
            {navItems.map((item) => (
              <a key={item.label} href={sitePath(item.href)} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
