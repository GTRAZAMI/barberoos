import "./globals.css";

export const metadata = {
  title: "Barberoos | Premium Barber Shop, Booking & Grooming Store",
  description:
    "A modern barber shop website with services, barber selection, appointment booking, gallery, and grooming product shop.",
  keywords: ["barbershop", "haircut", "beard trim", "appointment booking", "grooming products"],
  openGraph: {
    title: "Barberoos | Premium Barber Shop",
    description: "Book your barber, choose a time, and shop premium grooming products.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=80",
        width: 1400,
        height: 900,
        alt: "Premium barbershop interior",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
