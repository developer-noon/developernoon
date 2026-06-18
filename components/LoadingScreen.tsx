'use client';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin opacity-75"></div>
            <div className="absolute inset-2 bg-slate-800 rounded-full"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Loading your session...
        </h1>
        <p className="text-slate-400">Please wait a moment</p>
      </div>
    </div>
  );
};
