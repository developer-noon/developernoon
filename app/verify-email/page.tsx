"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

function VerifyEmailRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Redirect to the correct route with token
    if (token) {
      router.push(`/auth/verify-email?token=${token}`);
    } else {
      router.push("/auth/verify-email");
    }
  }, [token, router]);

  return null;
}

export default function VerifyEmailRedirect() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailRedirectContent />
    </Suspense>
  );
}
