"use client";

import Image from "next/image";
import { Check, ChevronRight, Minus, Plus, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { products } from "@/lib/barberoos-data";
import { sitePath } from "@/lib/site-path";
import { useCart } from "@/lib/use-cart";

const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];

export function ProductsExperience() {
  const [category, setCategory] = useState("All");
  const { cart, cartCount, addToCart, removeFromCart } = useCart();

  const visibleProducts = useMemo(
    () => (category === "All" ? products : products.filter((product) => product.category === category)),
    [category],
  );
  const cartTotal = useMemo(
    () => products.reduce((sum, product) => sum + (cart[product.id] || 0) * product.price, 0),
    [cart],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#11100e] text-[#f8f1e7]">
      <SiteHeader cartCount={cartCount} />

      <section className="catalog-hero">
        <div className="mx-auto max-w-7xl px-5 pt-32">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 border border-[#d6aa63]/40 bg-[#d6aa63]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#e8c884]">
                <ShoppingBag size={15} /> Grooming shop
              </div>
              <h1 className="text-5xl font-black leading-[.95] sm:text-7xl">Products your clients can buy online.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8cec0]">
                A dedicated product page for the small ecommerce part: filters, product cards, quantity controls, and a pannier ready for checkout integration.
              </p>
            </div>
            <div className="hero-console hidden lg:block">
              <p className="text-sm uppercase tracking-[0.24em] text-[#d6aa63]">Cart preview</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-5xl font-black">{cartCount}</span>
                <ShoppingBag className="text-[#d6aa63]" size={46} />
              </div>
              <p className="mt-4 text-[#cabbab]">Items selected for checkout</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-[#d6aa63]">
            <SlidersHorizontal size={17} /> Filter products
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={`category-chip ${category === item ? "category-chip-active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="relative aspect-square overflow-hidden bg-[#201c18]">
                  <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-[#d6aa63]">{product.category}</p>
                  <h3 className="mt-2 text-2xl font-black">{product.name}</h3>
                  <p className="mt-3 min-h-16 text-[#cabbab]">{product.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-black">${product.price}</span>
                    <button type="button" onClick={() => addToCart(product.id)} className="grid size-11 place-items-center rounded bg-[#d6aa63] text-[#11100e] transition hover:scale-105">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside id="cart" className="cart-panel lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Pannier</h2>
              <span className="rounded bg-white/10 px-3 py-1 text-sm">
                {cartCount} item{cartCount === 1 ? "" : "s"}
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {products.filter((product) => cart[product.id]).length === 0 && (
                <p className="rounded border border-dashed border-white/20 p-5 text-[#cabbab]">Your cart is empty. Add a product to start.</p>
              )}
              {products
                .filter((product) => cart[product.id])
                .map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-3 rounded bg-white/[.06] p-3">
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p className="text-sm text-[#cabbab]">${product.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => removeFromCart(product.id)} className="grid size-8 place-items-center rounded bg-black/30">
                        <Minus size={15} />
                      </button>
                      <span className="w-5 text-center font-black">{cart[product.id]}</span>
                      <button type="button" onClick={() => addToCart(product.id)} className="grid size-8 place-items-center rounded bg-[#d6aa63] text-[#11100e]">
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between text-xl font-black">
                <span>Total</span>
                <span>${cartTotal}</span>
              </div>
              <a href={sitePath("/checkout")} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded bg-[#f8f1e7] px-5 py-4 font-black text-[#11100e] transition hover:bg-[#d6aa63]">
                Checkout <ChevronRight size={18} />
              </a>
              <p className="mt-4 flex items-start gap-2 text-sm text-[#cabbab]">
                <Check className="mt-0.5 shrink-0 text-[#d6aa63]" size={16} />
                This cart is front-end ready. Payments and inventory can be connected next.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
