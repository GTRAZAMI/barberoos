import { ArrowRight, Clock, Scissors, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { services } from "@/lib/barberoos-data";
import { sitePath } from "@/lib/site-path";

export const metadata = {
  title: "Services | Barberoos Barber Shop",
  description: "Explore the full Barberoos barber service menu, including haircuts, beard care, grooming packages, and styling services.",
};

const categories = Array.from(new Set(services.map((service) => service.category)));

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#11100e] text-[#f8f1e7]">
      <SiteHeader />

      <section className="catalog-hero">
        <div className="mx-auto max-w-7xl px-5 pt-32">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-[#d6aa63]/40 bg-[#d6aa63]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#e8c884]">
              <Scissors size={15} /> Full service menu
            </div>
            <h1 className="text-5xl font-black leading-[.95] sm:text-7xl">Barber services for every style.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8cec0]">
              This page can grow with the shop. Add as many services as you need, grouped by category, with duration, price, and booking links.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <a key={category} href={`#${category.toLowerCase().replaceAll(" ", "-")}`} className="category-chip">
              {category}
            </a>
          ))}
        </div>

        <div className="grid gap-10">
          {categories.map((category) => (
            <section key={category} id={category.toLowerCase().replaceAll(" ", "-")}>
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d6aa63]">{category}</p>
                  <h2 className="mt-2 text-3xl font-black">{category} services</h2>
                </div>
                <Sparkles className="hidden text-[#d6aa63] sm:block" />
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {services
                  .filter((service) => service.category === category)
                  .map((service) => (
                    <article key={service.name} className="service-detail-card">
                      <div className="flex items-start justify-between gap-4">
                        <div className="grid size-12 shrink-0 place-items-center rounded bg-[#d6aa63]/15 text-[#d6aa63]">
                          <Scissors />
                        </div>
                        <span className="text-3xl font-black text-[#d6aa63]">${service.price}</span>
                      </div>
                      <h3 className="mt-7 text-2xl font-black">{service.name}</h3>
                      <p className="mt-3 min-h-20 text-[#cabbab]">{service.detail}</p>
                      <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                        <span className="flex items-center gap-2 text-sm text-[#d8cec0]">
                          <Clock size={16} /> {service.duration}
                        </span>
                        <a href={sitePath("/#booking")} className="inline-flex items-center gap-2 font-black text-[#d6aa63]">
                          Book <ArrowRight size={16} />
                        </a>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
