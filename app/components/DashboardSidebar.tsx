"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, LogOut, ArrowLeft, CalendarDays, PlusCircle, ChevronLeft, ChevronRight, ShieldCheck, Handshake, Users, User } from "lucide-react";

export default function DashboardSidebar({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  // Helper to determine active route
  const isActive = (path: string) => pathname === path;

  return (
    <aside 
      className={`${isOpen ? 'w-64' : 'w-20'} bg-[#0a1c15] border-r border-emerald-900/40 flex flex-col justify-between hidden md:flex shrink-0 transition-all duration-300 relative z-20`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-8 bg-emerald-500 text-black rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div>
        {/* Профиль */}
        <Link href="/res365/dashboard/profile" className={`p-6 border-b border-emerald-900/30 flex items-center gap-3 hover:bg-emerald-900/20 transition-colors cursor-pointer ${!isOpen && 'justify-center px-2'}`}>
          <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-700/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-300">
            {user.name ? user.name.slice(0, 2).toUpperCase() : user.email?.slice(0, 2).toUpperCase()}
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <div className="text-sm font-bold truncate text-white hover:text-emerald-300 transition-colors">{user.name || user.email?.split('@')[0]}</div>
              <div className="text-[10px] text-emerald-400/60 truncate font-mono mt-0.5">
                {user.company ? user.company.name : "Гость"}
              </div>
            </div>
          )}
        </Link>

        {/* Инструменты платформы */}
        <div className="px-4 py-4 mt-2">
          {isOpen && (
            <div className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-wider px-3 mb-3">
              Меню RES 365
            </div>
          )}
          
          <nav className="space-y-2">
            <Link 
              href="/res365/dashboard/profile" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${isActive('/res365/dashboard/profile') ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/20' : 'text-emerald-200/70 hover:text-white hover:bg-emerald-500/10 border border-transparent'} ${!isOpen && 'justify-center'}`}
            >
              <User size={18} className={isActive('/res365/dashboard/profile') ? "text-emerald-400" : ""} />
              {isOpen && <span>Мой профиль</span>}
            </Link>

            <Link 
              href="/res365/dashboard" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${isActive('/res365/dashboard') ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/20' : 'text-emerald-200/70 hover:text-white hover:bg-emerald-500/10 border border-transparent'} ${!isOpen && 'justify-center'}`}
            >
              <CalendarDays size={18} className={isActive('/res365/dashboard') ? "text-emerald-400" : ""} />
              {isOpen && <span>Афиша Событий</span>}
            </Link>

            <Link 
              href="/res365/dashboard/tickets" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${isActive('/res365/dashboard/tickets') ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/20' : 'text-emerald-200/70 hover:text-white hover:bg-emerald-500/10 border border-transparent'} ${!isOpen && 'justify-center'}`}
            >
              <Ticket size={18} className={isActive('/res365/dashboard/tickets') ? "text-emerald-400" : ""} />
              {isOpen && <span>Мои билеты</span>}
            </Link>

            <Link 
              href="/res365/dashboard/b2b" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${isActive('/res365/dashboard/b2b') ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/20' : 'text-emerald-200/70 hover:text-white hover:bg-emerald-500/10 border border-transparent'} ${!isOpen && 'justify-center'}`}
            >
              <Handshake size={18} className={isActive('/res365/dashboard/b2b') ? "text-emerald-400" : ""} />
              {isOpen && <span>B2B встречи</span>}
            </Link>

            <Link 
              href="/res365/dashboard/community" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${isActive('/res365/dashboard/community') ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/20' : 'text-emerald-200/70 hover:text-white hover:bg-emerald-500/10 border border-transparent'} ${!isOpen && 'justify-center'}`}
            >
              <Users size={18} className={isActive('/res365/dashboard/community') ? "text-emerald-400" : ""} />
              {isOpen && <span>Сообщество</span>}
            </Link>
            
            {(user.role === "COMPANY_ADMIN" || user.role === "SYSTEM_ADMIN") && (
              <Link 
                href="/res365/dashboard/events/create" 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mt-4 border border-dashed border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-900/20 text-emerald-400 ${!isOpen && 'justify-center'}`}
              >
                <PlusCircle size={18} />
                {isOpen && <span>Создать событие</span>}
              </Link>
            )}

            {user.role === "SYSTEM_ADMIN" && (
              <Link 
                href="/res365/admin" 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all mt-4 bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 hover:bg-yellow-500/20 ${!isOpen && 'justify-center'}`}
              >
                <ShieldCheck size={18} />
                {isOpen && <span>Админ-панель</span>}
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* Нижнее меню */}
      <div className={`p-4 border-t border-emerald-900/30 ${!isOpen && 'flex flex-col items-center px-2'}`}>
        <Link href="/" title="На главную сайта" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-emerald-400/60 hover:text-white transition-colors ${!isOpen && 'justify-center'}`}>
          <ArrowLeft size={16} />
          {isOpen && <span>На главную сайта</span>}
        </Link>
        <a href="/api/auth/signout" title="Выйти" className={`flex items-center gap-3 px-3 py-2 mt-1 rounded-lg text-xs font-medium text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors ${!isOpen && 'justify-center'}`}>
          <LogOut size={16} />
          {isOpen && <span>Выйти</span>}
        </a>
      </div>
    </aside>
  );
}
