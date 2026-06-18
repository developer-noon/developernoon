"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail } from "@/lib/validation";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const [rateLimitedEmail, setRateLimitedEmail] = useState("");
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0);

  // Initialize Google Sign-In
  useEffect(() => {
    // Ensure the script is loaded and window.google exists
    if (typeof window !== "undefined" && window.google) {
      // Check if we've already initialized Google in this session
      if (!(window as any).googleInitialized) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
          callback: handleGoogleResponse,
        });

        // Set the flag so it doesn't run again on re-render
        (window as any).googleInitialized = true;
      }

      // Render your button normally
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large", width: "100%" },
      );
    }
  }, []);

  // Countdown timer for rate limiting
  useEffect(() => {
    if (rateLimitCountdown <= 0) return;

    const timer = setTimeout(() => {
      setRateLimitCountdown(rateLimitCountdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [rateLimitCountdown]);

  const handleGoogleSignIn = async (response: any) => {
    if (!response.credential) {
      setErrors({ form: "Google sign-in failed" });
      return;
    }

    setIsGoogleLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: response.credential }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setErrors({ form: data.message || "Google sign-in failed" });
      }
    } catch (error) {
      setErrors({ form: "An error occurred during sign-in" });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleButtonClick = () => {
    if (window.google) {
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large", width: "100%" },
      );
      // document.getElementById("google-signin-button")?.firstChild?.click();
      (
        document.getElementById("google-signin-button")
          ?.firstChild as HTMLElement
      )?.click();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (rateLimitCountdown > 0) return;

    setIsLoading(true);
    setEmailNotVerified(false);
    setErrors({});

    try {
      await login(formData.email, formData.password);
      router.push("/dashboard");
    } catch (error: unknown) {
      const err = error as any;

      if (err.response?.status === 401) {
        const message = err.response.data?.message || "";

        if (message.includes("Please verify your email")) {
          setEmailNotVerified(true);
          setErrors({});
        } else {
          setErrors({ form: "Invalid email or password" });
        }
      } else if (err.response?.status === 429) {
        // Rate limiting
        setRateLimitCountdown(900); // 15 minutes
        setRateLimitedEmail(formData.email);
        setErrors({
          form: "Too many login attempts. Please wait 15 minutes before trying again.",
        });
      } else {
        setErrors({ form: err.response?.data?.message || "Login failed" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Gradient Background */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">D</span>
            </div>
            <span className="text-white font-product-sans-bold text-lg">
              developernoon
            </span>
          </div>
          <div>
            <h2 className="text-4xl font-product-sans-bold text-white mb-4">
              Welcome Back
            </h2>
            <p className="text-blue-100 text-lg">
              Sign in to your account to continue
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <h1 className="text-3xl font-product-sans-bold text-slate-900 mb-2">
            Sign In To Your Account.
          </h1>
          <p className="text-slate-600 mb-8">
            Let's sign in to your account and get started.
          </p>

          {emailNotVerified && (
            <div className="mb-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
              <p className="text-sm text-amber-900 mb-2">
                <span className="font-semibold">Email Not Verified</span>
              </p>
              <p className="text-sm text-amber-800 mb-3">
                Please verify your email before logging in.
              </p>
              <Link
                href="/auth/signup"
                className="text-sm text-amber-700 hover:text-amber-900 font-semibold underline"
              >
                Didn't receive verification email? Resend it
              </Link>
            </div>
          )}

          {errors.form && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{errors.form}</p>
            </div>
          )}

          {rateLimitCountdown > 0 && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                Try again in {Math.floor(rateLimitCountdown / 60)}:
                {String(rateLimitCountdown % 60).padStart(2, "0")}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-product-sans-bold text-slate-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-product-sans ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                  placeholder="name@example.com"
                  disabled={isLoading || rateLimitCountdown > 0}
                />
                {!errors.email && (
                  <svg
                    className="w-5 h-5 absolute right-3 top-3.5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-product-sans-bold text-slate-700"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-product-sans ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading || rateLimitCountdown > 0}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-600 hover:text-slate-900"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm3.47-7.8c-5 0-9.27 3.11-11 7.5 0 0 2 3.5 11 3.5s11-3.5 11-3.5c-1.73-4.39-6-7.5-11-7.5z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-product-sans"
            >
              Forgot Password?
            </Link>

            <button
              type="submit"
              disabled={isLoading || rateLimitCountdown > 0}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-400 text-white font-product-sans-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-6"
            >
              {isLoading && (
                <svg
                  className="w-5 h-5 animate-spin"
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
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-center text-sm text-slate-600 mb-4">OR</p>
            <button
              type="button"
              onClick={handleGoogleButtonClick}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl hover:border-slate-300 transition-colors font-product-sans disabled:opacity-50"
            >
              {isGoogleLoading ? (
                <svg
                  className="w-5 h-5 animate-spin"
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
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              {isGoogleLoading ? "Signing in..." : "Continue with Google"}
            </button>
            <div id="google-signin-button" className="hidden"></div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600 font-product-sans">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 hover:text-blue-700 font-product-sans-bold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
