import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Cheaperates.com",
    description: "Get cheaper prices always.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${poppins.variable} h-full antialiased scroll-smooth`} data-scroll-behavior="smooth">
            <body className="bg-(--bg-dark) text-gray-200">
                <Header />
                <PageTransition>
                    {children}
                </PageTransition>
                <Footer />
                <ScrollToTop />
            </body>
        </html>
    );
}
