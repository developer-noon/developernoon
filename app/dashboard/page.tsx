"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Dashboard } from "@/components/Dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialLoading } = useAuth();

  useEffect(() => {
    if (!isInitialLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isInitialLoading, router]);

  if (isInitialLoading || !isAuthenticated) {
    return null; // Let LoadingScreen from layout handle it
  }

  return <Dashboard />;
}
