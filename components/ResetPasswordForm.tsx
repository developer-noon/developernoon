'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { validatePassword } from '@/lib/validation';

export const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword } = useAuth();

  const [formData, setFormData] = useState({ password: '', passwordConfirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    if (!token) {
      setTokenError(true);
    }
  }, [token]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !validateForm()) return;

    setIsLoading(true);

    try {
      await resetPassword(token, formData.password);
      // Redirect to login with success message
      router.push('/login?reset=success');
    } catch (error: unknown) {
      const err = error as any;

      if (err.response?.status === 400) {
        if (err.response.data?.message?.includes('expired')) {
          setTokenError(true);
          setErrors({ form: 'Reset token has expired. Please request a new one.' });
        } else {
          setErrors({ form: err.response.data?.message || 'Password reset failed' });
        }
      } else {
        setErrors({ form: 'An error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenError && !token) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
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

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Invalid Reset Link</h2>
        <p className="text-slate-600 mb-6">
          The password reset link is missing or invalid. Please request a new one.
        </p>

        <Link
          href="/auth/forgot-password"
          className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Request New Reset Link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Password</h2>

      {errors.form && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{errors.form}</p>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
          New Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password ? 'border-red-500 bg-red-50' : 'border-slate-300'
          }`}
          placeholder="Min 8 chars, uppercase, lowercase, number"
          disabled={isLoading}
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="passwordConfirm" className="block text-sm font-medium text-slate-700 mb-1">
          Confirm Password
        </label>
        <input
          id="passwordConfirm"
          type="password"
          value={formData.passwordConfirm}
          onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.passwordConfirm ? 'border-red-500 bg-red-50' : 'border-slate-300'
          }`}
          placeholder="Confirm your new password"
          disabled={isLoading}
        />
        {errors.passwordConfirm && (
          <p className="mt-1 text-sm text-red-600">{errors.passwordConfirm}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading && (
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>

      <p className="mt-4 text-center text-sm text-slate-600">
        <Link href="/auth/login" className="text-blue-600 hover:underline font-semibold">
          Back to Login
        </Link>
      </p>
    </form>
  );
};
