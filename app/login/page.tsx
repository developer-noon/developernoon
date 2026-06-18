// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect } from "react";

// export default function LoginRedirect() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const session = searchParams.get("session");
//   const reset = searchParams.get("reset");

//   useEffect(() => {
//     // Redirect to the correct route with query params
//     let redirectUrl = "/auth/login";

//     if (session === "expired") {
//       redirectUrl += "?session=expired";
//     } else if (reset === "success") {
//       redirectUrl += "?reset=success";
//     }

//     router.push(redirectUrl);
//   }, [session, reset, router]);

//   return null;
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// Isolate the search params logic
function RedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = searchParams.get("session");
  const reset = searchParams.get("reset");

  useEffect(() => {
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

// Wrap it in a Suspense boundary as the default export
export default function LoginRedirect() {
  return (
    <Suspense fallback={null}>
      <RedirectHandler />
    </Suspense>
  );
}
