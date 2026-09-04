"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowLeft, Mail, Lock, Sparkles, Calendar, MapPin, ArrowUpRight, CheckCircle2, Building, Building2, User } from "lucide-react";

export default function Res365Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); // STARTUP, COMPANY, INDIVIDUAL
  const [isLoading, setIsLoading] = useState(false);
  
  // Состояния: "login", "register_category", "register_details", "register_success"
  const [mode, setMode] = useState<"login" | "register_category" | "register_details" | "register_success">("login");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password) {
      await signIn("credentials", { email, password, callbackUrl: "/res365/dashboard" });
    } else {
      await signIn("nodemailer", { email, callbackUrl: "/res365/dashboard" });
    }
    
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, name, email })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMode("register_success");
      } else {
        alert(data.error || "Ошибка при отправке заявки");
      }
    } catch (err) {
      alert("Не удалось отправить заявку");
    } finally {
      setIsLoading(false);
    }
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
              {mode === "login" && "Вход в платформу"}
              {mode === "register_category" && "Кем вы являетесь?"}
              {mode === "register_details" && "Заявка на регистрацию"}
              {mode === "register_success" && "Заявка отправлена"}
            </h1>
          </div>


          {mode === "login" && (
            <form onSubmit={handleEmailSignIn} className="space-y-3.5">
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
                    Пароль
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
                <span>{isLoading ? "Вход..." : "Войти"}</span>
                <ArrowUpRight size={16} />
              </button>
              
              <div className="text-center pt-2">
                <button 
                  type="button"
                  onClick={() => {
                    setMode("register_category");
                    setEmail("");
                    setPassword("");
                  }}
                  className="text-sm font-medium text-emerald-400/80 hover:text-emerald-300 transition-colors"
                >
                  Нет аккаунта? Зарегистрироваться
                </button>
              </div>
            </form>
          )}


          {mode === "register_category" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <button
                onClick={() => { setCategory("STARTUP"); setMode("register_details"); }}
                className="w-full flex items-center justify-start gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/40 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#f2ede2]">Стартап</h3>
                  <p className="text-xs text-emerald-500/60 mt-0.5">Разрабатываю инновационный продукт</p>
                </div>
              </button>

              <button
                onClick={() => { setCategory("COMPANY"); setMode("register_details"); }}
                className="w-full flex items-center justify-start gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/40 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#f2ede2]">Компания</h3>
                  <p className="text-xs text-emerald-500/60 mt-0.5">Действующий бизнес в эко-сфере</p>
                </div>
              </button>

              <button
                onClick={() => { setCategory("INDIVIDUAL"); setMode("register_details"); }}
                className="w-full flex items-center justify-start gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/40 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#f2ede2]">Физ. лицо</h3>
                  <p className="text-xs text-emerald-500/60 mt-0.5">Эколог, эксперт или посетитель</p>
                </div>
              </button>

              <div className="text-center pt-2">
                <button 
                  onClick={() => setMode("login")}
                  className="text-sm font-medium text-emerald-400/80 hover:text-emerald-300 transition-colors"
                >
                  Вернуться ко входу
                </button>
              </div>
            </div>
          )}


          {mode === "register_details" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-emerald-300">
                  {category === "INDIVIDUAL" ? "Ваше ФИО" : "Название"}
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={category === "INDIVIDUAL" ? "Иванов Иван" : 'ТОО "EcoTech"'}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 transition-all text-sm"
                  />
                  {category === "INDIVIDUAL" ? (
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60" />
                  ) : (
                    <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-emerald-300">
                  Рабочий Email
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 transition-all text-sm"
                  />
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 border border-emerald-400/50 hover:border-emerald-300 hover:from-emerald-500 hover:to-emerald-400 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? "Отправка..." : "Подать заявку"}</span>
              </button>

              <div className="text-center pt-2">
                <button 
                  type="button"
                  onClick={() => setMode("register_category")}
                  className="text-sm font-medium text-emerald-400/80 hover:text-emerald-300 transition-colors"
                >
                  Назад к выбору категории
                </button>
              </div>
            </form>
          )}

          {mode === "register_success" && (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-2">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-lg font-bold text-[#f2ede2]">Заявка успешно отправлена!</h3>
              <p className="text-sm text-emerald-100/70 leading-relaxed max-w-[260px]">
                Вам поступит письмо с доступом к платформе после успешного прохождения модерации.
              </p>
              
              <button
                onClick={() => setMode("login")}
                className="mt-6 px-6 py-2 rounded-full font-bold text-sm text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/30 transition-all"
              >
                Вернуться на главную
              </button>
            </div>
          )}


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