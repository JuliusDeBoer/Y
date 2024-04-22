import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import GlobarBar from "@/components/GlobalBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Y. Its whats happening / Y",
  description: "Totally not a twitter clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " w-full min-h-screen"}>
        <GlobarBar />
        {children}
      </body>
    </html>
  );
}
