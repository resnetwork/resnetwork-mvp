"use client";

import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import { useState } from "react";

export default function AdminLoginButton({ email, password }: { email: string, password?: string | null }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Нет данных для входа");
      return;
    }
    
    setIsLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/res365/dashboard"
    });
    // signIn will redirect on success, so we don't necessarily need to reset loading state,
    // but just in case it fails:
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading || !password}
      className="ml-4 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
      title="Войти в личный кабинет"
    >
      <LogIn size={14} />
      {isLoading ? "Вход..." : "Войти"}
    </button>
  );
}
