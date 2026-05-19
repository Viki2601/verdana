import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Providers from "@/Components/Provider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Verdana — Nature Retreats",
  description:
    "Discover handpicked nature spots, serene sanctuaries, and curated plans for your perfect escape into the wild.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen antialiased">
        {/*
          Providers is a 'use client' boundary.
          It shows the LoadingScreen first, then fades in {children}
          once the cloud-disperse animation finishes.
        */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}