"use client";

import { useState } from "react";
import { X, ArrowUpRight, Menu } from "lucide-react";
import EventsSection from "./components/EventsSection";
import AboutSection from "./components/AboutSection";
import PartnersMarquee from "./components/PartnersMarquee";
import NewsSection from "./components/NewsSection";
import FloatingRadialDirections from "./components/FloatingRadialDirections";
import FocusRevealHeading from "./components/FocusRevealHeading";
import dynamic from "next/dynamic";

const CentralAsiaMap = dynamic(() => import("./components/CentralAsiaMap"), { ssr: false });
const LiquidGridBackground = dynamic(() => import("./components/LiquidGridBackground"), { ssr: false });

// ===== Палитра =====
const PAGE_BG = "#081712";   // фон всей страницы — глубокий тёмно-зелёный/почти чёрный
const PANEL_BG = "#064e3b";  // фон панелей (о нас, цитата)
const ACCENT = "#16a34a";    // яркий зелёный — кнопки, акценты
const TEXT_LIGHT = "#f2ede2"; // тёплый белый — основной текст на тёмном фоне
const TEXT_MUTED = "#9fb7a8"; // приглушённый салатовый — подзаголовки

const NAV_ITEMS = [
  { label: "О нас", href: "#about" },
  { label: "Мероприятия", href: "#events" },
  { label: "Новости", href: "#news" },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: PAGE_BG }}>
      {/* Обертка Header + Hero с живым интерактивным фоном Liquid Grid */}
      <div className="relative w-full overflow-hidden">
        <LiquidGridBackground />

        <header
          className="relative z-30 flex items-center justify-between px-4 md:px-16 py-4 md:py-8 bg-transparent"
        >
          <a href="/" className="flex items-center">
            <img src="/logo1.png.png" alt="RES Network" className="h-16 md:h-24 w-auto object-contain" />
          </a>

          {/* ПК Навигация */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider border border-transparent hover:border-emerald-500/40 hover:bg-emerald-950/40 hover:shadow-[0_0_20px_rgba(74,222,128,0.25)] hover:text-emerald-300 transition-all duration-300"
                style={{ color: TEXT_LIGHT }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/res365"
              className="px-5 md:px-7 py-2.5 md:py-3 rounded-full font-bold text-xs md:text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border border-emerald-400/50 hover:border-emerald-300 hover:shadow-[0_0_25px_rgba(74,222,128,0.6)] hover:scale-105 transition-all duration-300"
            >
              RES Platform
            </a>

            {/* Мобильное бургер-меню */}
            <button 
              className="md:hidden p-2 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/50"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        <section
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-32 pb-20 bg-transparent min-h-[80vh] md:min-h-0"
        >
          <h1
            className="max-w-5xl text-5xl md:text-7xl font-medium leading-[1.1] tracking-tight"
            style={{ color: TEXT_LIGHT }}
          >
            Региональная <span className="italic font-light" style={{ color: ACCENT }}>платформа</span>
            <br />
            для новых возможностей
          </h1>

          <div className="mt-6 md:mt-8 max-w-3xl space-y-1.5 text-sm md:text-lg leading-relaxed font-normal px-2" style={{ color: TEXT_MUTED }}>
            <p>
              Соединяем бизнес, инвесторов, государства и международные организации —
            </p>
            <p>
              создаём совместные проекты, которые двигают развитие <span className="whitespace-nowrap">Центральной Азии</span> вперёд.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
            <a
              href="#events"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm md:text-base border border-emerald-400/50 hover:border-emerald-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] transition-all duration-300 shadow-lg shadow-emerald-950/60"
              style={{ backgroundColor: ACCENT, color: TEXT_LIGHT }}
            >
              Смотреть мероприятия <ArrowUpRight size={18} />
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-7 py-4 rounded-full font-semibold text-sm md:text-base border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/40 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all duration-300 cursor-pointer backdrop-blur-sm"
              style={{ color: TEXT_LIGHT }}
            >
              Связаться с нами
            </button>
          </div>
        </section>
      </div>

      <CentralAsiaMap />

      <AboutSection onOpenContact={() => setIsModalOpen(true)} />

      <section id="events" className="px-8 md:px-16 py-20 md:py-28" style={{ backgroundColor: PAGE_BG }}>
        <div className="mb-10">
          <FocusRevealHeading
            tokens={[
              { text: "Ближайшие", isAccent: false },
              { text: "мероприятия", isAccent: true },
            ]}
            className="text-3xl md:text-5xl font-bold tracking-tight text-[#f2ede2]"
            align="left"
          />
        </div>

        <EventsSection />
      </section>

      <section id="news" className="relative px-8 md:px-16 py-20 md:py-28" style={{ backgroundColor: PAGE_BG }}>
        <NewsSection />
      </section>

      <section className="px-8 md:px-16 py-24 md:py-28" style={{ backgroundColor: PAGE_BG }}>
        <div className="text-center mb-16">
          <FocusRevealHeading
            tokens={[
              { text: "Наши", isAccent: false },
              { text: "партнёры", isAccent: true },
            ]}
            className="text-3xl md:text-5xl font-bold tracking-tight text-[#f2ede2]"
            align="center"
          />
        </div>
        <PartnersMarquee />
      </section>

      {/* Фирменный футер */}
      <footer className="px-8 md:px-16 py-12 border-t border-emerald-500/20 text-[#f2ede2] flex flex-col md:flex-row items-center justify-between gap-6 text-xs" style={{ backgroundColor: PAGE_BG }}>
        <div className="flex items-center gap-3">
          <img src="/logo1.png.png" alt="RES Network" className="h-9 w-auto object-contain" />
          <span className="text-[#9fb7a8]">© 2026 RES Network. Региональная экосистема Центральной Азии.</span>
        </div>
        <div className="flex items-center gap-8 font-semibold text-emerald-300">
          <a href="#about" className="hover:text-white transition-colors">О нас</a>
          <a href="#events" className="hover:text-white transition-colors">Мероприятия</a>
          <a href="#news" className="hover:text-white transition-colors">Новости</a>
          <a href="/res365" className="hover:text-white transition-colors">RES Platform</a>
        </div>
      </footer>

      {/* Плавающее радиальное меню сфер фокуса (как виджет поддержки) */}
      <FloatingRadialDirections />

      {/* Мобильное меню (Overlay) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-[#081712]/95 backdrop-blur-xl flex flex-col p-8 md:hidden animate-in fade-in zoom-in-95 duration-300"
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-emerald-400 hover:text-white bg-emerald-900/50 rounded-full"
          >
            <X size={24} />
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-wider text-[#f2ede2] hover:text-emerald-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="mt-4 px-8 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_25px_rgba(74,222,128,0.4)]"
            >
              Связаться с нами
            </button>
          </div>
        </div>
      )}

      {/* Модалка контактов */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#063325]/95 to-[#041a13]/98 p-8 md:p-10 backdrop-blur-2xl shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 hover:text-white hover:bg-emerald-900 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              RES NETWORK
            </span>
            <h3 className="mt-2 text-3xl font-bold text-[#f2ede2]">Связаться с нами</h3>
            <p className="mt-1 text-sm text-[#9fb7a8]">
              Расскажите о вашей организации — мы ответим в течение рабочего дня
            </p>

            <form
              className="flex flex-col gap-4 mt-6"
              action={async (formData) => {
                const { submitContactRequest } = await import("@/app/actions/contact");
                const result = await submitContactRequest(formData);
                if (result.success) {
                  alert("Заявка успешно отправлена!");
                  setIsModalOpen(false);
                } else {
                  alert(result.error);
                }
              }}
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-emerald-300">
                  Ваше имя
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  className="w-full px-4 py-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-emerald-300">
                  Email
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full px-4 py-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="ivan@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-emerald-300">
                  Телефон
                </label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="+7 777 000 00 00"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-emerald-300">
                  Организация / Компания
                </label>
                <input
                  name="company"
                  type="text"
                  className="w-full px-4 py-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="ООО ЭкоТех"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-emerald-300">
                  Сообщение
                </label>
                <textarea
                  required
                  name="message"
                  rows={3}
                  className="w-full px-4 py-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                  placeholder="Опишите, как мы можем вам помочь..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-full py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-950/80 cursor-pointer"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}