import type { Metadata } from "next";

import "../styles/globals.css";
import {Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Swaud Ádson",
  description: "A simple boilerplate for next.js",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      
      <body>
        <Header/>
        {children}

      </body>
    </html>
  );
}
