import { MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-white/10 px-5 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-3xl font-black tracking-[0.16em]">BARBEROOS</h2>
          <p className="mt-3 text-[#cabbab]">Modern cuts, classic discipline, and grooming products selected by barbers.</p>
        </div>
        <div className="flex gap-3 text-[#cabbab]">
          <MapPin className="mt-1 text-[#d6aa63]" />
          <p>
            Casablanca, Morocco
            <br />
            Open Monday to Saturday - 09:30 to 20:00
          </p>
        </div>
        <div className="text-[#cabbab] md:text-right">
          <p className="font-bold text-[#f8f1e7]">Ready for the next level?</p>
          <p>After this design, we can add real database booking, payments, admin, and SEO city pages.</p>
        </div>
      </div>
    </footer>
  );
}
