import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
    title: "বাজার দর | Bazar Dor",
    description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="bn"
            data-theme="light"
            className="scroll-smooth"
        >
            <body>
                <Suspense fallback={<div className="h-24 animate-pulse bg-base-100" aria-label="লোড হচ্ছে" />}>
                    <Navbar></Navbar>
                </Suspense>
                {children}
                <Footer></Footer>
                <ToastContainer position="bottom-center" autoClose={3000} />
            </body>
        </html>
    );
}
