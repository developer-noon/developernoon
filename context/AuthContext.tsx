"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/axios";

export interface User {
  _id: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitialLoading: boolean;
  globalNetworkError: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  checkSession: () => Promise<void>;
  clearNetworkError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [globalNetworkError, setGlobalNetworkError] = useState<string | null>(
    null,
  );

  // Check session on mount
  const checkSession = useCallback(async () => {
    try {
      setGlobalNetworkError(null);
      const response = await apiClient.get("/api/health");

      if (response.status === 200) {
        // Session check passed, user should be authenticated
        setIsAuthenticated(true);
      }
    } catch (error: unknown) {
      const err = error as any;

      if (err.code === "ERR_NETWORK" || err.response?.status === 503) {
        setGlobalNetworkError(
          "Network disconnected. Please check your internet connection.",
        );
      }

      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setGlobalNetworkError(null);
      const response = await apiClient.post("/api/auth/login", {
        email,
        password,
      });

      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      const err = error as any;

      if (err.code === "ERR_NETWORK") {
        setGlobalNetworkError(
          "Network disconnected. Please check your internet connection.",
        );
      }

      throw error;
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    try {
      setGlobalNetworkError(null);
      await apiClient.post("/api/auth/signup", {
        email,
        password,
        passwordConfirm: password,
      });
    } catch (error: unknown) {
      const err = error as any;

      if (err.code === "ERR_NETWORK") {
        setGlobalNetworkError(
          "Network disconnected. Please check your internet connection.",
        );
      }

      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setGlobalNetworkError(null);
      await apiClient.post("/api/auth/logout");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error: unknown) {
      const err = error as any;

      if (err.code === "ERR_NETWORK") {
        setGlobalNetworkError(
          "Network disconnected. Please check your internet connection.",
        );
      }

      // Clear local state even if logout fails
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  const verifyEmail = useCallback(async (token: string) => {
    try {
      setGlobalNetworkError(null);
      await apiClient.get("/api/auth/verify-email", { params: { token } });
    } catch (error: unknown) {
      const err = error as any;

      if (err.code === "ERR_NETWORK") {
        setGlobalNetworkError(
          "Network disconnected. Please check your internet connection.",
        );
      }

      throw error;
    }
  }, []);

  const resendVerificationEmail = useCallback(async (email: string) => {
    try {
      setGlobalNetworkError(null);
      await apiClient.post("/api/auth/resend-verification", { email });
    } catch (error: unknown) {
      const err = error as any;

      if (err.code === "ERR_NETWORK") {
        setGlobalNetworkError(
          "Network disconnected. Please check your internet connection.",
        );
      }

      throw error;
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      setGlobalNetworkError(null);
      await apiClient.post("/api/auth/forgot-password", { email });
    } catch (error: unknown) {
      const err = error as any;

      if (err.code === "ERR_NETWORK") {
        setGlobalNetworkError(
          "Network disconnected. Please check your internet connection.",
        );
      }

      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (token: string, password: string) => {
    try {
      setGlobalNetworkError(null);
      await apiClient.post(
        "/api/auth/reset-password",
        { password, passwordConfirm: password },
        { params: { token } },
      );
    } catch (error: unknown) {
      const err = error as any;

      if (err.code === "ERR_NETWORK") {
        setGlobalNetworkError(
          "Network disconnected. Please check your internet connection.",
        );
      }

      throw error;
    }
  }, []);

  const clearNetworkError = useCallback(() => {
    setGlobalNetworkError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isInitialLoading,
    globalNetworkError,
    login,
    signup,
    logout,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    checkSession,
    clearNetworkError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
