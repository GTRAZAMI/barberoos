"use client";

import Image from "next/image";
import { Check, ChevronRight, LocateFixed, Mail, MapPin, MessageSquareText, Phone, ShoppingBag, UserRound } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { products } from "@/lib/barberoos-data";
import { sitePath } from "@/lib/site-path";
import { useCart } from "@/lib/use-cart";

const deliveryMessage = "Free livraison in Casablanca for orders over $30. Delivery fees can be edited later from the admin panel.";

export default function CheckoutPage() {
  const { cart, cartCount, clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [mapAddress, setMapAddress] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const selectedProducts = useMemo(() => products.filter((product) => cart[product.id]), [cart]);
  const subtotal = useMemo(
    () => selectedProducts.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0),
    [cart, selectedProducts],
  );

  function confirmOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmed(true);
    clearCart();
  }

  function useCurrentLocation() {
    if (!window.isSecureContext) {
      setLocationStatus("Phone browsers need HTTPS to share location. This works on localhost, and it will work on the final HTTPS domain. For now, paste a Google Maps link manually.");
      return;
    }

    if (!("geolocation" in navigator)) {
      setLocationStatus("Location is not available in this browser.");
      return;
    }

    setLocationStatus("Waiting for location permission...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        setMapAddress(mapsLink);
        setLocationStatus("Location added.");
      },
      () => {
        setLocationStatus("Location permission was denied or blocked. You can paste a Google Maps link manually.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#11100e] text-[#f8f1e7]">
      <SiteHeader cartCount={confirmed ? 0 : cartCount} />

      <section className="section-shell pt-32">
        <div className="section-heading">
          <p>Checkout</p>
          <h1 className="mt-3 text-5xl font-black leading-[.95] sm:text-7xl">Finaliser votre achat.</h1>
          <p className="mt-5 max-w-2xl text-base font-normal normal-case tracking-normal text-[#cabbab]">{deliveryMessage}</p>
        </div>

        {confirmed ? (
          <div className="checkout-panel max-w-3xl">
            <div className="grid size-14 place-items-center rounded bg-[#d6aa63] text-[#11100e]">
              <Check size={28} />
            </div>
            <h2 className="mt-6 text-3xl font-black">Commande confirmee.</h2>
            <p className="mt-3 text-[#cabbab]">Merci. Votre pannier est maintenant vide. The next step can connect this confirmation to WhatsApp, email, or the admin dashboard.</p>
            <a href={sitePath("/products")} className="mt-7 inline-flex items-center gap-2 rounded bg-[#f8f1e7] px-5 py-4 font-black text-[#11100e] transition hover:bg-[#d6aa63]">
              Back to shop <ChevronRight size={18} />
            </a>
          </div>
        ) : (
          <form onSubmit={confirmOrder} className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-start">
            <section className="checkout-panel">
              <div className="grid gap-4 sm:grid-cols-2">
                <CheckoutField icon={<UserRound size={18} />} label="Full name" name="name" placeholder="Your name" required />
                <CheckoutField icon={<Phone size={18} />} label="Phone" name="phone" placeholder="+212 ..." required />
                <CheckoutField icon={<Mail size={18} />} label="Email" name="email" placeholder="you@email.com" type="email" />
                <CheckoutField icon={<MapPin size={18} />} label="Adresse" name="address" placeholder="Street, building, city" required />
              </div>

              <label className="checkout-label mt-4">
                <span>
                  <MapPin size={18} /> Adresse map
                </span>
                <div className="location-row">
                  <input name="map" value={mapAddress} placeholder="Use the location button to add map position" readOnly />
                  <button type="button" onClick={useCurrentLocation}>
                    <LocateFixed size={18} /> Use my location
                  </button>
                </div>
              </label>
              {locationStatus && <p className="mt-2 text-sm text-[#cabbab]">{locationStatus}</p>}

              <label className="checkout-label mt-4">
                <span>
                  <MessageSquareText size={18} /> Description
                </span>
                <textarea name="description" placeholder="Add delivery notes, preferred time, or anything we should know." rows={5} />
              </label>

              <div className="mt-5 rounded bg-[#d6aa63] p-5 text-[#11100e]">
                <p className="text-sm font-black uppercase tracking-[0.18em]">Livraison</p>
                <p className="mt-2 font-bold">{deliveryMessage}</p>
              </div>
            </section>

            <aside className="checkout-panel lg:sticky lg:top-28">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Detail commande</h2>
                <span className="rounded bg-white/10 px-3 py-1 text-sm">
                  {cartCount} item{cartCount === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {selectedProducts.length === 0 && <p className="rounded border border-dashed border-white/20 p-5 text-[#cabbab]">Your cart is empty. Add products before checkout.</p>}
                {selectedProducts.map((product) => (
                  <div key={product.id} className="flex gap-3 rounded bg-white/[.06] p-3">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded bg-[#201c18]">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-black">{product.name}</p>
                      <p className="text-sm text-[#cabbab]">
                        {cart[product.id]} x ${product.price}
                      </p>
                    </div>
                    <p className="font-black text-[#d6aa63]">${(cart[product.id] || 0) * product.price}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between text-lg font-black">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-[#cabbab]">
                  <span>Livraison</span>
                  <span>{subtotal >= 30 ? "Free" : "To confirm"}</span>
                </div>
                <button type="submit" disabled={selectedProducts.length === 0} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded bg-[#f8f1e7] px-5 py-4 font-black text-[#11100e] transition hover:bg-[#d6aa63] disabled:cursor-not-allowed disabled:opacity-45">
                  Confirm commande <ShoppingBag size={18} />
                </button>
              </div>
            </aside>
          </form>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

function CheckoutField({
  icon,
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="checkout-label">
      <span>
        {icon} {label}
      </span>
      <input name={name} placeholder={placeholder} required={required} type={type} />
    </label>
  );
}
