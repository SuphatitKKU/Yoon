import type { Metadata } from "next";
import { Noto_Serif, Work_Sans } from "next/font/google";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { AnalysisProvider } from "@/context/AnalysisContext";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "โหงวเฮ้งยุคใหม่ - ศิลปะแห่งการอ่านใบหน้า",
  description: "ปลดล็อกชะตาชีวิตของคุณผ่านศาสตร์โบราณแห่งการทำนายใบหน้า",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${workSans.variable} font-body text-on-surface`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body selection:bg-secondary-container selection:text-on-secondary-container bg-surface flex flex-col min-h-screen">
        <AnalysisProvider>
          <Header />
          <main className="flex-1 flex flex-col pb-[76px] md:pb-0">{children}</main>
          <BottomNav />
        </AnalysisProvider>
      </body>
    </html>
  );
}
