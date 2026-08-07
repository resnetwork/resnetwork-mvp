"use client";

import { useState } from "react";
import { Landmark, Globe2, Building2, Briefcase, Handshake, Link2, X } from "lucide-react";
import EventCalendar from "./components/EventCalendar";
import PartnersMarquee from "./components/PartnersMarquee";
import NewsAndDirections from "./components/NewsAndDirections";

const STATS = [
  { Icon: Landmark, num: "32", label: "Правительства" },
  { Icon: Globe2, num: "50+", label: "Межд. организаций" },
  { Icon: Building2, num: "300+", label: "Компании" },
  { Icon: Briefcase, num: "100+", label: "Инвесторы" },
  { Icon: Handshake, num: "30+", label: "Ассоциации" },
  { Icon: Link2, num: "10 000+", label: "Связей создано" },
];

const EVENTS = [
  { name: "BioHack 2026", day: "15", month: "ОКТ", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80&auto=format&fit=crop" },
  { name: "RES Expo 2027", day: "20", month: "МАЙ", img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80&auto=format&fit=crop" },
  { name: "Green Finance Forum", day: "08", month: "МАЙ", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80&auto=format&fit=crop" },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FAF9F4" }}>
      <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-16 py-8">
        <a href="/"><img src="/logo1.png.png" alt="RES Network" className="h-16" /></a>
        <nav className="flex items-center gap-8 text-base font-semibold text-white">
          <a href="#about">О нас</a>
          <a href="#events">Мероприятия</a>
          <a href="#news">Новости</a>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="px-5 py-2.5 rounded-full font-semibold text-sm transition-transform hover:scale-105" 
            style={{ backgroundColor: "#2E8656" }}
          >
            Связаться с нами
          </button>
        </nav>
      </header>

      <section className="relative min-h-[720px] flex items-center px-16 pb-24 overflow-hidden" style={{ backgroundColor: "#003C32" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://videos.pexels.com/video-files/4842993/4842993-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,20,15,0.55) 0%, rgba(0,60,50,0.9) 100%)" }} />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
            Платформа сотрудничества<br/>для <span style={{ color: "#E0EAB8" }}>устойчивого развития</span>
          </h1>
          <p className="mt-8 text-xl max-w-xl" style={{ color: "#D9E3DC" }}>Объединяем правительства, бизнес и инвесторов Центральной Азии на одной экосистеме событий.</p>
        </div>
      </section>

      <div className="px-16 relative z-10" style={{ marginTop: "-64px" }}>
        <div className="grid grid-cols-6 rounded-3xl overflow-hidden" style={{ backgroundColor: "#02493F", boxShadow: "0 24px 60px rgba(0,20,15,0.25)" }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center py-8 px-2" style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <stat.Icon size={20} color="#E0EAB8" style={{ margin: "0 auto 8px" }} />
              <div className="text-2xl font-bold" style={{ color: "#E0EAB8" }}>{stat.num}</div>
              <div className="text-xs mt-1" style={{ color: "#A1BB94" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section id="about" className="px-16 pt-28 pb-24">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-5" style={{ backgroundColor: "#E0EAB8", color: "#02493F" }}>О НАС</span>
            <h2 className="text-5xl font-bold leading-tight mb-6" style={{ color: "#10241D" }}>Экосистема экологического сотрудничества</h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "#4A5A52" }}>RES Network объединяет правительства, бизнес, инвесторов и международные организации Центральной Азии для развития совместных проектов устойчивого развития — от выставок и форумов до долгосрочных партнёрств.</p>
            <div className="flex flex-col gap-4">
              {["Международное партнёрство на уровне правительств и организаций", "Экспертная сеть из компаний и инвесторов региона", "Прозрачная статистика по каждому мероприятию"].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#E0EAB8" }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#02493F" }} />
                  </div>
                  <span className="text-sm" style={{ color: "#3A4A3E" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute rounded-full" style={{ width: "320px", height: "320px", backgroundColor: "#E0EAB8", opacity: 0.5, filter: "blur(60px)", top: "-40px", right: "-40px", zIndex: 0 }} />
            <div className="relative rounded-3xl overflow-hidden" style={{ border: "1px solid #E4E7DD", boxShadow: "0 20px 60px rgba(16,36,29,0.1)", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1632383380175-812d44ec112b?w=900&q=80&auto=format&fit=crop" alt="RES Network" className="w-full h-96 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="px-16 py-24">
        <span className="inline-block text-sm font-bold tracking-wide mb-2" style={{ color: "#2E8656" }}>РАСПИСАНИЕ</span>
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-5xl font-bold" style={{ color: "#10241D" }}>Ближайшие<br/>мероприятия</h2>
          <a href="/res365" className="px-6 py-3 rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #2E8656, #41754F)" }}>+ Создать ивент</a>
        </div>

        <div className="mb-10"><EventCalendar /></div>

        <div className="grid grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <div key={event.name} className="rounded-2xl overflow-hidden bg-white" style={{ border: "1px solid #E4E7DD", boxShadow: "0 10px 30px rgba(16,36,29,0.06)" }}>
              <div className="relative">
                <img src={event.img} alt={event.name} className="w-full h-44 object-cover" />
                <div className="absolute top-4 left-4 rounded-lg px-3 py-1.5 text-center bg-white" style={{ boxShadow: "0 4px 14px rgba(16,36,29,0.15)" }}>
                  <div className="text-lg font-extrabold leading-none" style={{ color: "#10241D" }}>{event.day}</div>
                  <div className="text-[10px] font-bold" style={{ color: "#2E8656" }}>{event.month}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl" style={{ color: "#10241D" }}>{event.name}</h3>
                <p className="text-sm mt-1" style={{ color: "#5B6B62" }}>Астана, Казахстан</p>
                <a href="/res365" className="text-sm mt-3 inline-block font-bold" style={{ color: "#2E8656" }}>Зарегистрироваться →</a>
              </div>
            </div>
          ))}
        </div>
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
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl" style={{ border: "1px solid #E4E7DD" }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-3xl font-bold mb-6" style={{ color: "#10241D" }}>Связаться с нами</h3>
            
            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); /* Здесь логика отправки */ setIsModalOpen(false); }}>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#4A5A52" }}>Ваше имя</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#2E8656] focus:ring-1 focus:ring-[#2E8656] bg-gray-50" placeholder="Иван Иванов" />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#4A5A52" }}>Email</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#2E8656] focus:ring-1 focus:ring-[#2E8656] bg-gray-50" placeholder="ivan@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#4A5A52" }}>Номер телефона</label>
                <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#2E8656] focus:ring-1 focus:ring-[#2E8656] bg-gray-50" placeholder="+7 (___) ___-__-__" />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#4A5A52" }}>Название компании</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#2E8656] focus:ring-1 focus:ring-[#2E8656] bg-gray-50" placeholder="ООО ЭкоТех" />
              </div>
              
              <button type="submit" className="w-full py-4 mt-2 rounded-xl text-white font-bold text-lg transition-transform hover:scale-[1.02]" style={{ backgroundColor: "#2E8656" }}>
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}