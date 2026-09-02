"use client";

import { useState } from "react";
import { X, ArrowUpRight, Menu } from "lucide-react";
import EventsSection from "./components/EventsSection";
import AboutSection from "./components/AboutSection";
import PartnersMarquee from "./components/PartnersMarquee";
import NewsSection from "./components/NewsSection";
import BlueprintRadial from "./components/BlueprintRadial";
import TimelineSection from "./components/TimelineSection";
import FocusRevealHeading from "./components/FocusRevealHeading";

const NAV_ITEMS = [
  { label: "О нас", href: "#about" },
  { label: "Направления", href: "#directions" },
  { label: "Мероприятия", href: "#events" },
  { label: "Новости", href: "#news" },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-res-bg">
      {/* ===== БЛОК 1: HERO (100vh) ===== */}
      <div className="relative w-full h-screen flex flex-col overflow-hidden">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 z-0 bg-res-bg">
          <img 
            src="/expo-bg.jpg" 
            alt="RES Network Background" 
            className="w-full h-full object-cover opacity-20 animate-drift-slow" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-res-bg/30 via-res-bg/60 to-res-bg" />
        </div>

        {/* Header */}
        <header className="relative z-30 flex items-center justify-between px-6 md:px-12 py-3.5 md:py-4 bg-transparent shrink-0">
          <a href="/" className="flex items-center">
            <img src="/logo1.png.png" alt="RES Network" className="h-12 md:h-16 w-auto object-contain" />
          </a>

          <nav className="hidden md:flex items-center gap-3 lg:gap-5 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-transparent hover:border-res-accent/40 hover:bg-res-panel/50 hover:text-res-accent-light transition-all duration-300 text-res-text"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/res365"
              className="px-6 py-2.5 rounded-full font-bold text-xs md:text-sm bg-gradient-to-r from-res-accent to-res-accent-light text-[#020b14] border border-res-accent-light/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-105 transition-all duration-300"
            >
              RES Platform
            </a>
            <button 
              className="md:hidden p-2 text-res-accent border border-res-accent/30 rounded-lg hover:bg-res-panel"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Hero content — Расширенная гармоничная компоновка без пустот и рамок */}
        <section className="relative z-20 flex-1 min-h-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 px-6 md:px-12 py-1 md:py-2">
          {/* Левая часть: текст */}
          <div className="flex-1 flex flex-col items-start text-left max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.8rem] font-bold leading-[1.06] tracking-tight text-white mb-6">
              Центральная Азия строит зелёную экономику. <span className="text-res-accent">RES Network</span> соединяет тех, кто её строит.
            </h1>

            <p className="max-w-xl text-base md:text-lg leading-relaxed font-normal text-res-text-muted mb-8">
              Круглогодичная международная платформа: правительства, бизнес, инвесторы, банки развития и наука восьми стран — вокруг энергоперехода, климата и зелёных инвестиций.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm md:text-base border border-res-accent/50 hover:shadow-[0_0_30px_rgba(2,183,121,0.4)] transition-all duration-300 shadow-lg bg-res-accent text-[#061E14] hover:bg-res-accent-light"
              >
                Присоединиться к RES Network <ArrowUpRight size={18} />
              </button>
              <a
                href="#events"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm md:text-base border border-[#A1BB94]/30 hover:border-res-accent hover:bg-white/5 hover:shadow-[0_0_20px_rgba(2,183,121,0.3)] transition-all duration-300 cursor-pointer backdrop-blur-sm text-res-text glass-panel"
              >
                Смотреть мероприятия
              </a>
            </div>
            
            <p className="mt-5 text-xs text-res-text-muted/60 tracking-wider">
              Powered by RES+ EXPO · Астана, Казахстан · EST. 2026
            </p>
          </div>

          {/* Правая часть: Бесшовная атмосферная фото-витрина RES EXPO 2027 (Без рамок, встроена в фон) */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl xl:max-w-2xl relative flex flex-col justify-end min-h-[300px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[410px] group">
            {/* Фотография EXPO 2027, плавно растворяющаяся в общий фон без рамок */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)] md:[mask-image:radial-gradient(ellipse_at_65%_50%,black_55%,transparent_90%)]">
              <img 
                src="/expo-card.jpg" 
                alt="RES EXPO 2027" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            </div>

            {/* Контент прямо поверх фоновой картинки */}
            <div className="relative z-10 flex flex-col items-start pl-0 lg:pl-6 pb-2">
              <span className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E0EAB8] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                ФЛАГМАНСКОЕ СОБЫТИЕ ЭКОСИСТЕМЫ
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white mb-2 tracking-tight leading-tight">
                RES+ EXPO <span className="text-res-accent">2027</span>
              </h2>
              
              <div className="flex items-center gap-2.5 mb-4">
                <span className="px-3 py-1 bg-res-accent/20 border border-res-accent/40 rounded-full text-res-accent font-bold text-xs uppercase tracking-wider backdrop-blur-md">
                  5–7 мая 2027 · МВЦ EXPO, Астана
                </span>
              </div>

              <p className="text-res-text-muted text-sm md:text-base mb-4 leading-relaxed max-w-lg">
                Платформа работает круглый год. RES+ EXPO — момент, когда экосистема встречается лично: подписываются соглашения, запускаются проекты, находятся инвесторы.
              </p>
              
              <p className="text-[#A1BB94] text-xs font-medium mb-6 uppercase tracking-wider">
                1000+ международных участников <span className="mx-2 text-res-accent/50">•</span> Выставка + конференция + B2B-мэтчинг
              </p>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-7 py-3 bg-white hover:bg-[#E0EAB8] text-black rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
              >
                Забронировать участие <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ===== БЛОК 2: НАПРАВЛЕНИЯ (Палитра #1: Сапфировый тил #02493F & Малахит #2E8656) ===== */}
      <section id="directions" className="relative z-20 py-16 md:py-24 bg-gradient-to-b from-[#080C0A] via-[#02493F] to-[#0C0C0C]">
        <BlueprintRadial />
      </section>

      {/* ===== БЛОК 4: ИСТОРИЯ (Палитра #5: Графит) ===== */}
      <TimelineSection />

      {/* ===== БЛОК 5: МЕРОПРИЯТИЯ (Палитра #1: Еловый/Кедровый #41754F & Жемчуг #E0EAB8) ===== */}
      <section id="events" className="px-6 md:px-12 py-20 md:py-28 bg-gradient-to-b from-[#080C0A] via-[#112318] to-[#081811]">
        <div className="mb-10">
          <FocusRevealHeading
            tokens={[
              { text: "Ближайшие", isAccent: false },
              { text: "мероприятия", isAccent: true },
            ]}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white"
            align="left"
          />
        </div>
        <EventsSection />
      </section>

      {/* ===== БЛОК 5: НОВОСТИ + 3D ГЛОБУС (Палитра #1: Тёмный сапфировый тил #02493F) ===== */}
      <section id="news" className="relative px-6 md:px-12 py-20 md:py-28 bg-gradient-to-b from-[#081811] via-[#023B33] to-[#080C0A]">
        <NewsSection />
      </section>

      {/* ===== БЛОК 7: ПАРТНЁРЫ (Палитра #5: Графит #0C0C0C) ===== */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-[#080C0A]">
        <div className="text-center mb-16">
          <FocusRevealHeading
            tokens={[
              { text: "Наши", isAccent: false },
              { text: "партнёры", isAccent: true },
            ]}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white"
            align="center"
          />
        </div>
        <PartnersMarquee />
      </section>

      {/* Финальный CTA */}
      <section className="px-6 md:px-12 py-20 bg-[#080C0A] border-t border-[#A1BB94]/10 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Экосистема формируется сейчас</h2>
        <p className="text-res-text-muted text-base md:text-lg max-w-2xl mb-8">
          RES Network объединяет государства, бизнес, инвесторов, науку и международные организации вокруг зелёной экономики Центральной Азии. Станьте одним из первых участников.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 rounded-full font-bold text-sm md:text-base bg-gradient-to-r from-res-accent to-res-accent-light text-[#061e14] shadow-[0_0_25px_rgba(2,183,121,0.4)] hover:scale-105 transition-all duration-300"
        >
          Присоединиться к RES Network
        </button>
      </section>

      {/* Фирменный футер */}
      <footer className="px-8 md:px-16 py-12 border-t border-[#A1BB94]/20 text-res-text flex flex-col md:flex-row items-center justify-between gap-6 text-xs bg-[#050806]">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <img src="/logo1.png.png" alt="RES Network" className="h-9 w-auto object-contain" />
          <span className="text-res-text-muted mt-3 md:mt-0">© 2026 RES Network · Региональная экосистема Центральной Азии</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 font-semibold text-[#E0EAB8]">
          <a href="#about" className="hover:text-white transition-colors">О нас</a>
          <a href="#directions" className="hover:text-white transition-colors">Направления</a>
          <a href="#events" className="hover:text-white transition-colors">Мероприятия</a>
          <a href="#news" className="hover:text-white transition-colors">Новости</a>
          <a href="/res365" className="hover:text-white transition-colors">RES Platform</a>
        </div>
        
        <div className="flex items-center gap-4 text-res-text-muted">
          <span>BusinessFirst LLP</span>
          <span>Астана, Казахстан</span>
          <a href="mailto:office@businessfirst.kz" className="hover:text-white">office@businessfirst.kz</a>
        </div>
      </footer>

      {/* Мобильное меню (Overlay) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-res-bg/95 backdrop-blur-xl flex flex-col p-8 md:hidden animate-in fade-in zoom-in-95 duration-300"
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-res-accent hover:text-white bg-res-panel rounded-full"
          >
            <X size={24} />
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-wider text-res-text hover:text-res-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="mt-4 px-8 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-res-accent to-res-accent-light text-[#061e14] shadow-[0_0_25px_rgba(74,222,128,0.4)]"
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
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-res-accent/30 bg-res-panel p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-res-bg border border-res-accent/30 text-res-accent-light hover:text-white hover:bg-black transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <span className="text-xs font-bold uppercase tracking-widest text-res-accent">
              RES NETWORK
            </span>
            <h3 className="mt-2 text-3xl font-bold text-white">Связаться с нами</h3>
            <p className="mt-1 text-sm text-res-text-muted">
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
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-res-accent-light">
                  Ваше имя
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  className="w-full px-4 py-3.5 rounded-2xl bg-res-bg border border-res-accent/30 text-white placeholder:text-res-accent/40 focus:outline-none focus:border-res-accent transition-colors"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-res-accent-light">
                  Email
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full px-4 py-3.5 rounded-2xl bg-res-bg border border-res-accent/30 text-white placeholder:text-res-accent/40 focus:outline-none focus:border-res-accent transition-colors"
                  placeholder="ivan@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-res-accent-light">
                  Телефон
                </label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-3.5 rounded-2xl bg-res-bg border border-res-accent/30 text-white placeholder:text-res-accent/40 focus:outline-none focus:border-res-accent transition-colors"
                  placeholder="+7 777 000 00 00"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-res-accent-light">
                  Организация / Компания
                </label>
                <input
                  name="company"
                  type="text"
                  className="w-full px-4 py-3.5 rounded-2xl bg-res-bg border border-res-accent/30 text-white placeholder:text-res-accent/40 focus:outline-none focus:border-res-accent transition-colors"
                  placeholder="ООО ЭкоТех"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-res-accent-light">
                  Сообщение
                </label>
                <textarea
                  required
                  name="message"
                  rows={3}
                  className="w-full px-4 py-3.5 rounded-2xl bg-res-bg border border-res-accent/30 text-white placeholder:text-res-accent/40 focus:outline-none focus:border-res-accent transition-colors resize-none"
                  placeholder="Опишите, как мы можем вам помочь..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-full py-4 text-base font-bold text-[#061e14] bg-gradient-to-r from-res-accent to-res-accent-light hover:brightness-110 transition-all duration-300 shadow-xl cursor-pointer"
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