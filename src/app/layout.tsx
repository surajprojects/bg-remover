import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bg Remover",
  description: "Removes background from image.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
