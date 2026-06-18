"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LoadingScreen } from "@/components/LoadingScreen";
import { NetworkErrorBanner } from "@/components/NetworkErrorBanner";

export const LayoutContent: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const { isInitialLoading } = useAuth();

  // Only show loading screen and auth checks on protected routes
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/auth");

  if (isProtectedRoute && isInitialLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {isProtectedRoute && <NetworkErrorBanner />}
      {children}
    </>
  );
};
