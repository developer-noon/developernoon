"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/signup");
  }, [router]);

  return null;
}
