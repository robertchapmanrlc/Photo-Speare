import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./variables.css";
import "./globals.css";
import ThemeToggle from "./components/themeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photo-Speare",
  description: "Get a shakespeare poem based on your image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
