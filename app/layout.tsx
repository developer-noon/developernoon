import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LayoutContent } from "@/components/LayoutContent";

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
      <body>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
