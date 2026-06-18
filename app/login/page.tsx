"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

function LoginRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = searchParams.get("session");
  const reset = searchParams.get("reset");

  useEffect(() => {
    // Redirect to the correct route with query params
    let redirectUrl = "/auth/login";

    if (session === "expired") {
      redirectUrl += "?session=expired";
    } else if (reset === "success") {
      redirectUrl += "?reset=success";
    }

    router.push(redirectUrl);
  }, [session, reset, router]);

  return null;
}

export default function LoginRedirect() {
  return (
    <Suspense fallback={null}>
      <LoginRedirectContent />
    </Suspense>
  );
}
