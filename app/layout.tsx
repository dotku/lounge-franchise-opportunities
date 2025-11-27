import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNI&CORE - San Francisco Lounge Franchise Opportunities",
  description: "Transform your beauty business with UNI&CORE's Korean beauty lounge franchise. Proven success with 150+ locations in Korea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
