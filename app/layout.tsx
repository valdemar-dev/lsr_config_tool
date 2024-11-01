import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
    themeColor: "#ef4444",
}

export const metadata: Metadata = {
    metadataBase: new URL('https://lsr-configs/pages.dev'),
    title: "LSR Config Tool",
    description: "Easily add custom configs to your LSR, whilst preserving your pre-existing ones.",
    openGraph: {
        images: ["/images/metadata/opengraph.png"],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
