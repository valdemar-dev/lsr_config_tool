import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

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
                className={`font-inter h-screen overflow-x-hidden antialiased bg-gradient-to-bl from-zinc-900 to-zinc-950 text-slate-50`}
            >
                {children}

                <footer className="flex h-64 justify-center px-4 pt-8 border-t-[1px] bg-zinc-950 border-zinc-800">
                    <div className="max-w-[900px] w-full">
                        <div className="mb-8">
                            <h3 className="font-bold text-lg font-playfair">
                                LSR Config Tool
                            </h3>

                            <p className="font-inter text-xs opacity-50">
                                By: valdemar
                            </p>
                        </div>

                        <div className="flex gap-6 flex-wrap">
                            <div>
                                <p className="font-bold text-xs uppercase mb-1">
                                    add a config
                                </p>

                                <Link 
                                    className="text-sm opacity-75 border-b-2"
                                    href={"https://github.com/valdemar-dev/lsr_config_tool/blob/master/README.md"}
                                >
                                    Github
                                </Link>
                            </div>
                            <div>
                                <p className="font-bold text-xs uppercase mb-1">
                                    Los Santos RED
                                </p>

                                <Link 
                                    className="text-sm opacity-75 border-b-2"
                                    href={"https://github.com/thatoneguy650/Los-Santos-RED"}
                                >
                                    Github
                                </Link>
                            </div>
                        </div>                        
                    </div>
                </footer>
            </body>
        </html>
    );
}
