"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ForgotPasswordRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/forgot-password");
  }, [router]);

  return null;
}
