"use client";

import { useState } from "react";
import { Landmark, Globe2, Building2, Briefcase, Handshake, Link2, X } from "lucide-react";
import EventCalendar from "./components/EventCalendar";
import EventsSection from "./components/EventsSection";
import BrandContentSection from "./components/BrandContentSection";
import PartnersMarquee from "./components/PartnersMarquee";
import NewsAndDirections from "./components/NewsAndDirections";
import Reveal from "./components/Reveal";
import StickyHeader from "./components/StickyHeader";

const STATS = [
  { Icon: Landmark, num: "32", label: "Правительства" },
  { Icon: Globe2, num: "50+", label: "Межд. организаций" },
  { Icon: Building2, num: "300+", label: "Компании" },
  { Icon: Briefcase, num: "100+", label: "Инвесторы" },
  { Icon: Handshake, num: "30+", label: "Ассоциации" },
  { Icon: Link2, num: "10 000+", label: "Связей создано" },
];


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FAF9F4" }}>
      <StickyHeader>
        <a href="/"><img src="/logo1.png.png" alt="RES Network" className="h-16" /></a>
        <nav className="flex items-center gap-8 text-base font-semibold text-white">
          <a href="#about">О нас</a>
          <a href="#events">Мероприятия</a>
          <a href="#news">Новости</a>
          <a 
            href="/res365" 
            className="px-4 py-2 rounded-full font-semibold text-sm border transition-transform hover:scale-105" 
            style={{ borderColor: "#B8D97A", color: "#B8D97A" }}
          >
            RES Platform
          </a>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="px-5 py-2.5 rounded-full font-semibold text-sm transition-transform hover:scale-105" 
            style={{ backgroundColor: "#2E8656" }}
          >
            Связаться с нами
          </button>
        </nav>
      </StickyHeader>
      <section className="relative min-h-[720px] flex items-center px-16 pb-24 overflow-hidden" style={{ backgroundColor: "#061D3D" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://videos.pexels.com/video-files/4842993/4842993-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,20,15,0.55) 0%, rgba(0,60,50,0.9) 100%)" }} />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
            Региональная платформа<br/>для <span style={{ color: "#B8D97A" }}>новых возможностей</span>
          </h1>
          <p className="mt-8 text-xl max-w-xl" style={{ color: "#D9E3DC" }}>Соединяем бизнес, инвесторов, государства и международные организации для совместного развития Центральной Азии.</p>
        </div>
      </section>

      <div className="relative z-10" style={{ marginTop: "-170px" }}>
        <div className="grid grid-cols-6" style={{ backgroundColor: "#02493F", borderTopLeftRadius: "32px", borderTopRightRadius: "32px", boxShadow: "0 -20px 50px rgba(0,20,15,0.25)" }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center py-10 px-2" style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <stat.Icon size={20} color="#B8D97A" style={{ margin: "0 auto 8px" }} />
              <div className="text-2xl font-bold" style={{ color: "#B8D97A" }}>{stat.num}</div>
              <div className="text-xs mt-1" style={{ color: "#A1BB94" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <BrandContentSection />

      <Reveal>
        <section id="about" className="relative px-16 py-28 overflow-hidden" style={{ backgroundColor: "#061D3D" }}>
          <div className="absolute rounded-full animate-drift" style={{ width: "480px", height: "480px", backgroundColor: "#318455", opacity: 0.25, filter: "blur(100px)", top: "-120px", left: "-100px" }} />
          <div className="relative grid grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }}>
                <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&q=80&auto=format&fit=crop" alt="RES Network" className="w-full h-[460px] object-cover" />
              </div>
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-5" style={{ backgroundColor: "#B8D97A", color: "#061D3D" }}>О НАС</span>
              <h2 className="text-5xl font-bold leading-tight mb-6 text-white">Экосистема экологического сотрудничества</h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#B9C8D3" }}>RES Network объединяет правительства, бизнес, инвесторов и международные организации Центральной Азии для развития совместных проектов устойчивого развития — от выставок и форумов до долгосрочных партнёрств.</p>
              <div className="flex flex-col gap-4">
                {["Международное партнёрство на уровне правительств и организаций", "Экспертная сеть из компаний и инвесторов региона", "Прозрачная статистика по каждому мероприятию"].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#B8D97A" }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#061D3D" }} />
                    </div>
                    <span className="text-sm" style={{ color: "#D6E0E8" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 1440 100" className="absolute bottom-0 left-0 w-full" style={{ height: "70px", transform: "translateY(69px)" }} preserveAspectRatio="none">
            <path d="M0,50 C400,0 1040,100 1440,50 L1440,0 L0,0 Z" fill="#061D3D" />
          </svg>
        </section>
      </Reveal>

      <section id="events" className="px-16 py-24">
        <span className="inline-block text-sm font-bold tracking-wide mb-2" style={{ color: "#2E8656" }}>РАСПИСАНИЕ</span>
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-5xl font-bold" style={{ color: "#10241D" }}>Ближайшие мероприятия</h2>
          <a href="/res365" className="px-6 py-3 rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #2E8656, #41754F)" }}>+ Создать ивент</a>
        </div>

        {/* <div className="mb-10"><EventCalendar /></div> */}

        <EventsSection />
      </section>

      <section id="news" className="relative px-16 pb-24" style={{ backgroundColor: "#EDF3E4" }}>
        <svg viewBox="0 0 1440 100" className="absolute top-0 left-0 w-full" style={{ height: "70px", transform: "translateY(-69px)" }} preserveAspectRatio="none">
          <path d="M0,50 C400,100 1040,0 1440,50 L1440,100 L0,100 Z" fill="#EDF3E4" />
        </svg>
        <div className="pt-20">
          <NewsAndDirections />
        </div>
      </section>

      <section className="relative px-16 py-28 overflow-hidden" style={{ backgroundColor: "#003C32" }}>
        <div className="absolute rounded-full" style={{ width: "400px", height: "400px", backgroundColor: "#E0EAB8", opacity: 0.12, filter: "blur(90px)", top: "-100px", left: "50%", transform: "translateX(-50%)" }} />
        <p className="relative text-3xl md:text-4xl font-semibold text-white max-w-3xl mx-auto text-center leading-snug">
          «Мы верим, что устойчивое будущее Центральной Азии строится через сотрудничество — а не в одиночку.»
        </p>
        <p className="relative text-center text-sm font-bold tracking-wide mt-6" style={{ color: "#A1BB94" }}>RES NETWORK</p>
      </section>

      <section className="px-16 py-28" style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #E4E7DD" }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold" style={{ color: "#10241D" }}>Наши партнёры</h2>
        </div>
        <PartnersMarquee />
      </section>

      {/* Модальное окно */}
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="relative px-8 pt-8 pb-7" style={{ backgroundColor: "#061D3D" }}>
        <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
          <X size={16} color="#FFFFFF" />
        </button>
        <span className="text-xs font-extrabold tracking-[.16em]" style={{ color: "#B8D97A" }}>RES NETWORK</span>
        <h3 className="mt-3 text-3xl font-bold text-white">Связаться с нами</h3>
        <p className="mt-2 text-sm" style={{ color: "#B9C8D3" }}>Расскажите о себе — мы свяжемся в течение рабочего дня</p>
      </div>

      <form className="flex flex-col gap-4 p-8" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#4A5A52" }}>ВАШЕ ИМЯ</label>
          <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2" style={{ border: "1px solid #E4E7DD" }} placeholder="Иван Иванов" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#4A5A52" }}>EMAIL</label>
          <input required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2" style={{ border: "1px solid #E4E7DD" }} placeholder="ivan@example.com" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#4A5A52" }}>НОМЕР ТЕЛЕФОНА</label>
          <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2" style={{ border: "1px solid #E4E7DD" }} placeholder="+7 (___) ___-__-__" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: "#4A5A52" }}>НАЗВАНИЕ КОМПАНИИ</label>
          <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2" style={{ border: "1px solid #E4E7DD" }} placeholder="ООО ЭкоТех" />
        </div>
        <button type="submit" className="mt-2 w-full rounded-full py-4 text-lg font-bold text-white transition-transform hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, #318455, #245E42)" }}>
          Отправить заявку
        </button>
      </form>
    </div>
  </div>
)}
    </main>
  );
}