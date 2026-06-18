'use client';

import { useAuth } from '@/hooks/useAuth';

export const NetworkErrorBanner: React.FC = () => {
  const { globalNetworkError, clearNetworkError } = useAuth();

  if (!globalNetworkError) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">{globalNetworkError}</span>
        </div>
        <button
          onClick={clearNetworkError}
          className="text-white hover:bg-red-700 px-3 py-1 rounded text-sm font-medium transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
