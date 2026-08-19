"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowLeft, Mail, Lock, Sparkles, Calendar, MapPin, ArrowUpRight } from "lucide-react";

export default function Res365Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Если введен пароль, используем временный тестовый вход
    if (password) {
      await signIn("credentials", { email, password, callbackUrl: "/res365/dashboard" });
    } else {
      // Иначе шлем Magic Link
      await signIn("nodemailer", { email, callbackUrl: "/res365/dashboard" });
    }
    
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/res365/dashboard" });
  };

  return (
    <main className="min-h-screen md:h-screen md:overflow-hidden flex flex-col md:flex-row bg-[#081712] text-[#f2ede2] selection:bg-emerald-500 selection:text-white">
      {/* Левая половина: Компактная форма авторизации без скролла */}
      <div className="w-full md:w-1/2 flex flex-col justify-between px-6 py-6 md:px-12 lg:px-16 relative z-10">
        <div>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/40 border border-emerald-500/25 hover:border-emerald-400 hover:bg-emerald-900/50 hover:shadow-[0_0_20px_rgba(74,222,128,0.25)] transition-all duration-300 group"
          >
            <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>На главную</span>
          </a>
        </div>

        <div className="w-full max-w-sm mx-auto my-auto py-2">
          {/* Логотип */}
          <div className="flex justify-center mb-5">
            <a href="/">
              <img
                src="/logo1.png.png"
                alt="RES Network"
                className="h-20 md:h-24 w-auto object-contain hover:scale-105 transition-transform"
              />
            </a>
          </div>

          <div className="text-center mb-5">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#f2ede2]">
              Вход в платформу
            </h1>
          </div>

          {/* Кнопка входа через Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-semibold text-[#f2ede2] bg-[#063325]/80 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950 hover:shadow-[0_0_25px_rgba(74,222,128,0.35)] transition-all duration-300 cursor-pointer backdrop-blur-md group"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="group-hover:text-white transition-colors">Войти через Google</span>
          </button>

          {/* Разделитель */}
          <div className="flex items-center gap-3 my-4 w-full">
            <div className="flex-1 h-px bg-emerald-500/20" />
            <span className="text-[11px] font-mono text-emerald-400/60 uppercase">или через email</span>
            <div className="flex-1 h-px bg-emerald-500/20" />
          </div>

          {/* Форма авторизации через Email */}
          <form
            onSubmit={handleEmailSignIn}
            className="space-y-3.5"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-emerald-300">
                Email
              </label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(74,222,128,0.25)] transition-all duration-300 text-sm"
                />
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Пароль (опционально для Magic Link)
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(74,222,128,0.25)] transition-all duration-300 text-sm"
                />
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 border border-emerald-400/50 hover:border-emerald-300 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-emerald-950/80 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isLoading ? "Отправка..." : "Получить ссылку для входа"}</span>
              <ArrowUpRight size={16} />
            </button>
          </form>

          {/* Блок регистрации временно скрыт по требованию модерации (только по приглашениям) */}

          {/* Копирайт прямо по центру под формой */}
          <div className="text-center text-xs text-emerald-500/50 font-mono mt-6">
            © 2026 RES Network
          </div>
        </div>
      </div>

      {/* Правая половина: Экологическая выставка RES EXPO 2027 с величественным эко-фото */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#063325] to-[#02130e]">
        <img
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&q=85&auto=format&fit=crop"
          alt="RES EXPO 2027 Green Energy Eco Exhibition"
          className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
        />

        {/* Градиентное затемнение */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#041a13] via-[#041a13]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081712] via-transparent to-transparent opacity-80" />

        {/* Мягкое фоновое сияние */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Карточка флагманской экологической выставки внизу */}
        <div className="absolute bottom-10 left-10 right-10 p-7 md:p-8 rounded-3xl border border-emerald-400/30 bg-[#06241a]/85 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300 mb-2.5">
            <Sparkles size={16} className="text-emerald-400 animate-pulse" />
            <span>Флагманская экологическая выставка</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#f2ede2] leading-tight tracking-tight mb-3">
            RES EXPO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-300">2027</span>
          </h2>

          <p className="text-xs md:text-sm text-[#9fb7a8] leading-relaxed mb-4 font-normal">
            Главный международный конгресс и выставка чистых технологий, климатических инвестиций и экологической трансформации Центральной Азии.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200/90 pt-3 border-t border-emerald-500/20">
            <span className="flex items-center gap-2">
              <Calendar size={15} className="text-emerald-400" />
              <span>20–22 мая 2027</span>
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-emerald-400" />
              <span>Астана, Казахстан · EXPO Congress Centre</span>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}