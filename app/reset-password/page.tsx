"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ResetPasswordRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Redirect to the correct route with token
    if (token) {
      router.push(`/auth/reset-password?token=${token}`);
    } else {
      router.push("/auth/reset-password");
    }
  }, [token, router]);

  return null;
}
