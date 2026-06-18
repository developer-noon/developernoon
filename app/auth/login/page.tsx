import { LoginForm } from "@/components/LoginForm";

export const metadata = {
  title: "Login - Developer Noon",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Developer Noon</h1>
          <p className="text-slate-300">Log in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
