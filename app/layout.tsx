import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Developer Noon",
  description:
    "Developer Noon is a platform for developers to share their knowledge and experience. I provide high-quality articles, tutorials, and resources to help developers grow their skills and stay up-to-date with the latest trends in technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
