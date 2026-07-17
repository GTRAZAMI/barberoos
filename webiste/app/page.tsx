"use client";

import Image from "next/image";
import { ArrowRight, Check, ChevronRight, Clock, Scissors, Search, ShoppingBag, Sparkles, Star, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { barbers, gallery, products, services, times } from "@/lib/barberoos-data";
import { sitePath } from "@/lib/site-path";
import { useCart } from "@/lib/use-cart";

export default function Home() {
  const featuredServices = services.slice(0, 4);
  const serviceCategories = ["All", ...Array.from(new Set(services.map((item) => item.category)))];
  const timeGroups = {
    Morning: times.filter((slot) => Number(slot.split(":")[0]) < 12),
    Afternoon: times.filter((slot) => {
      const hour = Number(slot.split(":")[0]);
      return hour >= 12 && hour < 17;
    }),
    Evening: times.filter((slot) => Number(slot.split(":")[0]) >= 17),
  };
  const [service, setService] = useState(services[0].name);
  const [barber, setBarber] = useState(barbers[0].name);
  const [time, setTime] = useState(times[2]);
  const [serviceCategory, setServiceCategory] = useState("All");
  const [serviceQuery, setServiceQuery] = useState("");
  const [showAllServices, setShowAllServices] = useState(false);
  const [timePeriod, setTimePeriod] = useState<keyof typeof timeGroups>("Morning");
  const { cartCount, addToCart } = useCart();
  const filteredBookingServices = useMemo(() => {
    const query = serviceQuery.trim().toLowerCase();

    return services.filter((item) => {
      const matchesCategory = serviceCategory === "All" || item.category === serviceCategory;
      const matchesQuery = !query || `${item.name} ${item.category} ${item.detail}`.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [serviceCategory, serviceQuery]);
  const visibleBookingServices = showAllServices ? filteredBookingServices : filteredBookingServices.slice(0, 4);
  const activeTimes = timeGroups[timePeriod];

  return (
    <main className="min-h-screen overflow-hidden bg-[#11100e] text-[#f8f1e7]">
      <SiteHeader cartCount={cartCount} />

      <section id="home" className="relative min-h-[92vh] pt-24">
        <Image
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1800&q=85"
          alt="Premium barbershop interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,16,14,.97)_0%,rgba(17,16,14,.76)_42%,rgba(17,16,14,.3)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_52%,rgba(214,170,99,.2),transparent_32%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-[#d6aa63]/40 bg-[#d6aa63]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#e8c884]">
              <Sparkles size={15} /> Premium cuts and grooming
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[.92] tracking-tight sm:text-7xl lg:text-8xl">BARBEROOS</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#e1d5c7]">
              A sharp, modern barbershop experience where clients can discover the craft, choose their barber, reserve a time, and buy grooming essentials in one visit.
            </p>

            <div className="hero-console mobile-hero-console mt-7 lg:hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-[0.24em] text-[#d6aa63]">Today offers</span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">8 slots open</span>
              </div>
              <div className="mt-4 grid gap-3">
                {featuredServices.slice(0, 3).map((item) => (
                  <div key={item.name} className="service-tile">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-[#cabbab]">{item.duration}</p>
                    </div>
                    <span className="text-xl font-black text-[#d6aa63]">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 rounded bg-black/30 p-3">
                <Clock className="shrink-0 text-[#d6aa63]" size={20} />
                <div>
                  <p className="font-bold">Next appointment</p>
                  <p className="text-sm text-[#cabbab]">11:00 with {barbers[0].name}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 rounded bg-[#d6aa63] px-6 py-4 font-black text-[#11100e] transition hover:-translate-y-1 hover:bg-[#f8f1e7]"
              >
                Reserve your chair <ArrowRight size={18} />
              </a>
              <a
                href={sitePath("/products")}
                className="inline-flex items-center justify-center gap-2 rounded border border-white/20 px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-[#d6aa63] hover:text-[#d6aa63]"
              >
                Shop products <ShoppingBag size={18} />
              </a>
            </div>
          </div>

          <div className="hidden perspective-dramatic lg:block">
            <div className="hero-console float-slow">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="text-sm uppercase tracking-[0.24em] text-[#d6aa63]">Today</span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">8 slots open</span>
              </div>
              <div className="mt-7 grid gap-4">
                {featuredServices.slice(0, 3).map((item) => (
                  <div key={item.name} className="service-tile">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-[#cabbab]">{item.duration}</p>
                    </div>
                    <span className="text-xl font-black text-[#d6aa63]">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex items-center gap-4 rounded bg-black/30 p-4">
                <Clock className="text-[#d6aa63]" />
                <div>
                  <p className="font-bold">Next appointment</p>
                  <p className="text-sm text-[#cabbab]">11:00 with {barbers[0].name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-shell">
        <div className="section-heading">
          <p>Services</p>
          <h2>Popular barber services before the full menu.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map((item) => (
            <article key={item.name} className="depth-card group">
              <div className="mb-8 grid size-12 place-items-center rounded bg-[#d6aa63]/15 text-[#d6aa63]">
                <Scissors />
              </div>
              <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#d6aa63]">{item.category}</p>
              <h3 className="text-2xl font-black">{item.name}</h3>
              <p className="mt-3 min-h-20 text-[#cabbab]">{item.detail}</p>
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-[#d8cec0]">{item.duration}</span>
                <span className="text-2xl font-black text-[#d6aa63]">${item.price}</span>
              </div>
            </article>
          ))}
        </div>
        <a href={sitePath("/services")} className="mt-8 inline-flex items-center gap-2 rounded bg-[#f8f1e7] px-5 py-4 font-black text-[#11100e] transition hover:bg-[#d6aa63]">
          View all services <ChevronRight size={18} />
        </a>
      </section>

      <section id="barbers" className="section-shell">
        <div className="section-heading">
          <p>Barbers</p>
          <h2>Clients choose the chair, the time, and the specialist.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {barbers.map((person) => (
            <article key={person.name} className="barber-card">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={person.image} alt={`${person.name}, ${person.role}`} fill className="object-cover transition duration-700 hover:scale-105" />
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-2xl font-black">{person.name}</h3>
                  <p className="text-[#cabbab]">{person.role}</p>
                </div>
                <span className="flex items-center gap-1 text-[#d6aa63]">
                  <Star size={17} fill="currentColor" /> {person.rating}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-4">
          {gallery.map((image, index) => (
            <div key={image} className={`gallery-frame ${index === 1 ? "md:translate-y-8" : ""}`}>
              <Image src={image} alt={`Barbershop gallery image ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section id="booking" className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div className="section-heading lg:sticky lg:top-28">
            <p>Booking</p>
            <h2>Pick a service, barber, and time in seconds.</h2>
            <p className="max-w-xl text-base font-normal normal-case tracking-normal text-[#cabbab]">
              This is ready as a front-end booking flow. Later we can connect it to a calendar, WhatsApp confirmation, email, or a real dashboard.
            </p>
          </div>

          <div className="booking-panel">
            <FieldLabel icon={<Scissors size={18} />} label="Service" />
            <div className="booking-search">
              <Search size={17} />
              <input
                value={serviceQuery}
                onChange={(event) => {
                  setServiceQuery(event.target.value);
                  setShowAllServices(false);
                }}
                placeholder="Search haircut, beard, color..."
              />
            </div>
            <div className="mini-tabs">
              {serviceCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setServiceCategory(category);
                    setShowAllServices(false);
                  }}
                  className={serviceCategory === category ? "mini-tab-active" : ""}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="choice-grid">
              {visibleBookingServices.map((item) => (
                <button key={item.name} onClick={() => setService(item.name)} className={`choice ${service === item.name ? "choice-active" : ""}`}>
                  <span>{item.name}</span>
                  <small>{item.duration} - ${item.price}</small>
                </button>
              ))}
            </div>
            {filteredBookingServices.length === 0 && <p className="mt-3 rounded border border-dashed border-white/20 p-4 text-sm text-[#cabbab]">No service found. Try another word or category.</p>}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              {filteredBookingServices.length > 4 && (
                <button onClick={() => setShowAllServices((value) => !value)} className="inline-flex text-sm font-bold text-[#d6aa63]">
                  {showAllServices ? "Show less" : `Show ${filteredBookingServices.length - 4} more`}
                </button>
              )}
              <a href={sitePath("/services")} className="inline-flex text-sm font-bold text-[#d6aa63]">
                Full menu
              </a>
            </div>

            <FieldLabel icon={<UserRound size={18} />} label="Barber" />
            <div className="choice-grid three">
              {barbers.map((person) => (
                <button key={person.name} onClick={() => setBarber(person.name)} className={`choice barber-choice ${barber === person.name ? "choice-active" : ""}`}>
                  <Image src={person.image} alt={`${person.name}, ${person.role}`} width={48} height={48} className="barber-avatar" />
                  <span>
                    {person.name}
                    <small>{person.role}</small>
                  </span>
                </button>
              ))}
            </div>

            <FieldLabel icon={<Clock size={18} />} label="Available time" />
            <div className="mini-tabs">
              {(Object.keys(timeGroups) as Array<keyof typeof timeGroups>).map((period) => (
                <button key={period} onClick={() => setTimePeriod(period)} className={timePeriod === period ? "mini-tab-active" : ""}>
                  {period}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {activeTimes.map((slot) => (
                <button key={slot} onClick={() => setTime(slot)} className={`time-slot ${time === slot ? "time-active" : ""}`}>
                  {slot}
                </button>
              ))}
            </div>

            <div className="mt-7 rounded bg-[#d6aa63] p-5 text-[#11100e]">
              <p className="text-sm font-bold uppercase tracking-[0.18em]">Appointment preview</p>
              <div className="mt-3 flex flex-col gap-3 font-black sm:flex-row sm:items-center sm:justify-between">
                <span>{service}</span>
                <span>
                  {barber} - {time}
                </span>
              </div>
              <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded bg-[#11100e] px-5 py-4 font-black text-[#f8f1e7] transition hover:bg-[#2a2219]">
                Confirm rendez-vous <Check size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="shop" className="section-shell">
        <div className="section-heading">
          <p>Shop</p>
          <h2>A quick look at the grooming store.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {products.slice(0, 3).map((product) => (
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
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <a href={sitePath("/products")} className="mt-8 inline-flex items-center gap-2 rounded bg-[#f8f1e7] px-5 py-4 font-black text-[#11100e] transition hover:bg-[#d6aa63]">
          View all products <ChevronRight size={18} />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}

function FieldLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="mb-3 mt-7 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#d6aa63] first:mt-0">
      {icon} {label}
    </div>
  );
}
