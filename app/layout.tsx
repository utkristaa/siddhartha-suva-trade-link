import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PaintRollerCanvas from "@/components/PaintRollerCanvas";
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import Footer from "@/components/Footer";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-serif" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Siddhartha Suva Trade Link | Premium Paints",
  description: "Berger and Asian Paints flagship collections, colour consultation and interior finishes from Siddhartha Suva Trade Link.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll>
          <PaintRollerCanvas />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <WhatsAppFab />
        </SmoothScroll>
      </body>
    </html>
  );
}
