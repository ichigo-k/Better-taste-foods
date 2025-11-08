import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Better Taste Foods | Premium Natural Ingredients & Flavourings",
    description: "Better Taste Foods offers premium natural ingredients, spices, and flavorings sourced sustainably. Enhance your meals with high-quality, nutrient-rich food products.",
    keywords: ["Better Taste Foods", "natural ingredients", "spices", "food flavoring", "sustainable food", "premium ingredients", "Ghana", "UK", "America", "Salt", "Sugar","Oil"],
    authors: [{ name: "Better Taste Foods", url: "https://yourwebsite.com" }],
    openGraph: {
        title: "Better Taste Foods | Premium Natural Ingredients & Flavourings",
        description: "Better Taste Foods offers premium natural ingredients, spices, and flavorings sourced sustainably. Enhance your meals with high-quality, nutrient-rich food products.",
        type: "website",
        url: process.env.NEXT_PUBLIC_UR,
        images: [
            {
                url: "/logo1.png",
                width: 1000,
                height: 1000,
                alt: "Better Taste Foods Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Better Taste Foods | Premium Natural Ingredients & Flavourings",
        description: "Better Taste Foods offers premium natural ingredients, spices, and flavorings sourced sustainably. Enhance your meals with high-quality, nutrient-rich food products.",
        images: ["/logo.png"],
    },
    icons: {
        icon: "/logo1.png",
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
            className={`${geistSans.variable} ${geistMono.variable} antialiased xl:px-[5rem] md:px-[3rem] px-[10px] duration-400 transition-all`}
        >
        <Toaster />
        <Navbar />
        {children}
        </body>
        </html>
    );
}
