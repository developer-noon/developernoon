"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const EmailVerification: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { verifyEmail, resendVerificationEmail } = useAuth();

  // Guard to prevent duplicate network verification attempts (React 18 StrictMode)
  const verificationAttempted = useRef(false);

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token provided");
      return;
    }

    // STRICT LOCK: Stop execution instantly if this effect has already begun processing
    if (verificationAttempted.current) {
      return;
    }
    // Flip lock to true synchronously BEFORE jumping into the async execution thread
    verificationAttempted.current = true;

    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");
      } catch (error: unknown) {
        const err = error as any;
        const errorMsg = err.response?.data?.message || "";

        // EDGE CASE FIX: If request #1 succeeded, request #2 will return an error stating
        // it's already verified or invalid. If it mentions verification, count it as an absolute win!
        if (
          errorMsg.toLowerCase().includes("already verified") ||
          errorMsg.toLowerCase().includes("verified successfully")
        ) {
          setStatus("success");
          return;
        }

        // Fallback layout error message definition
        setErrorMessage(
          errorMsg ||
            "Invalid or expired verification token. Please request a new one.",
        );
        setStatus("error");
      }
    };

    verify();
  }, [token, verifyEmail]);

  const handleResendEmail = async () => {
    if (!email) {
      setErrorMessage("Please enter your email address");
      return;
    }

    setIsResending(true);
    setErrorMessage("");
    setResendSuccess(false);

    try {
      await resendVerificationEmail(email);
      setResendSuccess(true);
      setEmail("");
    } catch (error: unknown) {
      const err = error as any;
      const errorMsg = err.response?.data?.message;

      if (err.response?.status === 404) {
        setErrorMessage("Email address not found. Please check and try again.");
      } else if (err.response?.status === 400) {
        setErrorMessage(
          errorMsg || "This email is already verified or invalid.",
        );
      } else {
        setErrorMessage(
          "Failed to resend verification email. Please try again.",
        );
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {status === "loading" && (
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin opacity-75"></div>
              <div className="absolute inset-2 bg-white rounded-full"></div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Verifying your email...
          </h2>
          <p className="text-slate-600">
            Please wait while we confirm your email address
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 rounded-full p-3">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Email Verified!
          </h2>
          <p className="text-slate-600 mb-6">
            Your email has been successfully verified. You can now log in to
            your account.
          </p>

          <Link
            href="/auth/login"
            className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center"
          >
            Proceed to Login
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-red-100 rounded-full p-3">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Verification Failed
          </h2>
          <p className="text-slate-600 mb-6">{errorMessage}</p>

          {resendSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-green-700 font-semibold">
                ✓ Verification email sent successfully! Please check your inbox.
              </p>
            </div>
          )}

          <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Resend verification to:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 text-slate-900"
            />
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isResending && (
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isResending ? "Resending..." : "Resend Verification"}
            </button>
          </div>

          <Link
            href="/auth/login"
            className="inline-block text-blue-600 hover:underline font-semibold"
          >
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
};
