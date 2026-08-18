"use client";

import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import EventsSection from "./components/EventsSection";
import BrandContentSection from "./components/BrandContentSection";
import PartnersMarquee from "./components/PartnersMarquee";
import NewsAndDirections from "./components/NewsAndDirections";
import Reveal from "./components/Reveal";
import dynamic from "next/dynamic";

const CentralAsiaMap = dynamic(() => import("./components/CentralAsiaMap"), { ssr: false });
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

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: PAGE_BG }}>
      <header
        className="relative z-30 flex items-center justify-between px-16 py-5"
        style={{ backgroundColor: PAGE_BG }}
      >
        <a href="/">
          <img src="/logo1.png.png" alt="RES Network" className="h-16" />
        </a>

        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity duration-200"
              style={{ color: TEXT_LIGHT }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/res365"
          className="px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity duration-200"
          style={{ backgroundColor: ACCENT, color: TEXT_LIGHT }}
        >
          RES Platform
        </a>
      </header>

      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24"
        style={{ backgroundColor: PAGE_BG }}
      >
        <h1
          className="max-w-5xl text-6xl md:text-7xl font-medium leading-[1.05] tracking-tight"
          style={{ color: TEXT_LIGHT }}
        >
          Региональная <span className="italic font-light" style={{ color: ACCENT }}>платформа</span>
          <br />
          для новых возможностей.
        </h1>

        <p className="mt-8 max-w-2xl text-lg" style={{ color: TEXT_MUTED }}>
          Соединяем бизнес, инвесторов, государства и международные организации —
          создаём совместные проекты, которые двигают развитие Центральной Азии вперёд.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <a
            href="#events"
            className="flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: ACCENT, color: TEXT_LIGHT }}
          >
            Смотреть мероприятия <ArrowUpRight size={18} />
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-7 py-4 rounded-full font-semibold text-base border hover:opacity-70 transition-opacity duration-200"
            style={{ borderColor: TEXT_LIGHT, color: TEXT_LIGHT, backgroundColor: "transparent" }}
          >
            Связаться с нами
          </button>
        </div>
      </section>

      <CentralAsiaMap />

      <BrandContentSection />

      <Reveal>
        <section
          id="about"
          className="relative px-16 py-28 overflow-hidden"
          style={{ backgroundColor: PANEL_BG }}
        >
          <div
            className="absolute rounded-full animate-drift"
            style={{
              width: "480px",
              height: "480px",
              backgroundColor: ACCENT,
              opacity: 0.15,
              filter: "blur(100px)",
              top: "-120px",
              left: "-100px",
            }}
          />
          <div className="relative grid grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&q=80&auto=format&fit=crop"
                  alt="RES Network"
                  className="w-full h-[460px] object-cover"
                />
              </div>
            </div>

            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-5"
                style={{ backgroundColor: ACCENT, color: TEXT_LIGHT }}
              >
                О НАС
              </span>
              <h2 className="text-5xl font-bold leading-tight mb-6" style={{ color: TEXT_LIGHT }}>
                Экосистема экологического сотрудничества
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: TEXT_MUTED }}>
                RES Network объединяет правительства, бизнес, инвесторов и международные
                организации Центральной Азии для развития совместных проектов устойчивого
                развития — от выставок и форумов до долгосрочных партнёрств.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Международное партнёрство на уровне правительств и организаций",
                  "Экспертная сеть из компаний и инвесторов региона",
                  "Прозрачная статистика по каждому мероприятию",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TEXT_LIGHT }} />
                    </div>
                    <span className="text-sm" style={{ color: TEXT_MUTED }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <svg
            viewBox="0 0 1440 100"
            className="absolute bottom-0 left-0 w-full"
            style={{ height: "70px", transform: "translateY(69px)" }}
            preserveAspectRatio="none"
          >
            <path d="M0,50 C400,0 1040,100 1440,50 L1440,0 L0,0 Z" fill={PANEL_BG} />
          </svg>
        </section>
      </Reveal>

      <section id="events" className="px-16 py-24" style={{ backgroundColor: PAGE_BG }}>
        <span className="inline-block text-sm font-bold tracking-wide mb-2" style={{ color: ACCENT }}>
          РАСПИСАНИЕ
        </span>
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-5xl font-bold" style={{ color: TEXT_LIGHT }}>
            Ближайшие мероприятия
          </h2>
          <a
            href="/res365"
            className="px-6 py-3 rounded-full text-base font-bold"
            style={{ backgroundColor: ACCENT, color: TEXT_LIGHT }}
          >
            + Создать ивент
          </a>
        </div>

        <EventsSection />
      </section>

      <section id="news" className="relative px-16 pb-24" style={{ backgroundColor: PAGE_BG }}>
        <svg
          viewBox="0 0 1440 100"
          className="absolute top-0 left-0 w-full"
          style={{ height: "70px", transform: "translateY(-69px)" }}
          preserveAspectRatio="none"
        >
          <path d="M0,50 C400,100 1040,0 1440,50 L1440,100 L0,100 Z" fill={PAGE_BG} />
        </svg>
        <div className="pt-20">
          <NewsAndDirections />
        </div>
      </section>

      <section className="relative px-16 py-28 overflow-hidden" style={{ backgroundColor: PANEL_BG }}>
        <div
          className="absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            backgroundColor: ACCENT,
            opacity: 0.15,
            filter: "blur(90px)",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <p className="relative text-3xl md:text-4xl font-semibold max-w-3xl mx-auto text-center leading-snug" style={{ color: TEXT_LIGHT }}>
          «Мы верим, что устойчивое будущее Центральной Азии строится через сотрудничество — а не в одиночку.»
        </p>
        <p className="relative text-center text-sm font-bold tracking-wide mt-6" style={{ color: TEXT_LIGHT, opacity: 0.6 }}>
          RES NETWORK
        </p>
      </section>

      <section className="px-16 py-28" style={{ backgroundColor: PAGE_BG }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold" style={{ color: TEXT_LIGHT }}>
            Наши партнёры
          </h2>
        </div>
        <PartnersMarquee />
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative px-8 pt-8 pb-7" style={{ backgroundColor: PANEL_BG }}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(242,237,226,0.15)" }}
              >
                <X size={16} color={TEXT_LIGHT} />
              </button>
              <span className="text-xs font-extrabold tracking-[.16em]" style={{ color: ACCENT }}>
                RES NETWORK
              </span>
              <h3 className="mt-3 text-3xl font-bold" style={{ color: TEXT_LIGHT }}>Связаться с нами</h3>
              <p className="mt-2 text-sm" style={{ color: TEXT_LIGHT, opacity: 0.8 }}>
                Расскажите о себе — мы свяжемся в течение рабочего дня
              </p>
            </div>

            <form
              className="flex flex-col gap-4 p-8"
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
              }}
            >
              <div>
                <label className="block text-xs font-bold mb-2" style={{ color: "#4A5A52" }}>
                  ВАШЕ ИМЯ
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2"
                  style={{ border: "1px solid #E4E7DD" }}
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2" style={{ color: "#4A5A52" }}>
                  EMAIL
                </label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2"
                  style={{ border: "1px solid #E4E7DD" }}
                  placeholder="ivan@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2" style={{ color: "#4A5A52" }}>
                  НОМЕР ТЕЛЕФОНА
                </label>
                <input
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2"
                  style={{ border: "1px solid #E4E7DD" }}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2" style={{ color: "#4A5A52" }}>
                  НАЗВАНИЕ КОМПАНИИ
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2"
                  style={{ border: "1px solid #E4E7DD" }}
                  placeholder="ООО ЭкоТех"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-full py-4 text-lg font-bold text-white hover:opacity-90 transition-opacity duration-200"
                style={{ backgroundColor: ACCENT }}
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