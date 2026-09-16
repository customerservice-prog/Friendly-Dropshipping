import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Friendly Supply | Commercial Event Equipment", template: "%s | Friendly Supply" },
  description: "Commercial tents, tables, chairs, inflatables, parts and equipment for event rental businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
