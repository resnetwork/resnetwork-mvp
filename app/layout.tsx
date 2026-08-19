import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RES Network · Платформа сотрудничества Центральной Азии",
  description: "Единая платформа для совместных проектов бизнеса, государств, инвесторов и международных организаций Центральной Азии.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-sans antialiased bg-[#081712] text-[#f2ede2] selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}