import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { AnalysisProvider } from "@/context/AnalysisContext";
import "./globals.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "โหงวเฮ้งยุคใหม่ - ศิลปะแห่งการอ่านใบหน้า",
  description: "ปลดล็อกชะตาชีวิตของคุณผ่านศาสตร์โบราณแห่งการทำนายใบหน้า",
  manifest: "/Yoon/manifest.json",
  themeColor: "#8f0402",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yoon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} font-body text-on-surface`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
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
