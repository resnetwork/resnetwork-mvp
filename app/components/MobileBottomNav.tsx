"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Bell, CalendarDays, PlusCircle, User } from "lucide-react";

export default function MobileBottomNav({ user }: { user: any }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const canCreate = user.role === "COMPANY_ADMIN" || user.role === "SYSTEM_ADMIN";

  // Если нельзя создавать, сетка из 4 колонок, если можно - из 5
  const gridCols = canCreate ? "grid-cols-5" : "grid-cols-4";

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 bg-[#0a1c15]/95 backdrop-blur-xl border-t border-emerald-900/40 z-50 px-2 py-2 grid ${gridCols} items-center justify-items-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)]`}>
      <Link 
        href="/res365/dashboard" 
        className={`flex flex-col items-center justify-center gap-1 w-full py-1 transition-colors ${isActive('/res365/dashboard') ? 'text-emerald-400' : 'text-emerald-500/50 hover:text-emerald-300'}`}
      >
        <CalendarDays size={22} />
        <span className="text-[9px] font-bold mt-0.5">Афиша</span>
      </Link>

      <Link 
        href="/res365/dashboard/tickets" 
        className={`flex flex-col items-center justify-center gap-1 w-full py-1 transition-colors ${isActive('/res365/dashboard/tickets') ? 'text-emerald-400' : 'text-emerald-500/50 hover:text-emerald-300'}`}
      >
        <Ticket size={22} />
        <span className="text-[9px] font-bold mt-0.5">Билеты</span>
      </Link>

      {canCreate && (
        <div className="relative -top-6 flex items-center justify-center w-full">
          <Link 
            href="/res365/dashboard/events/create" 
            className="flex items-center justify-center bg-emerald-500 rounded-full p-3 shadow-[0_0_20px_rgba(16,185,129,0.4)] border-[3px] border-[#06110d] transition-transform hover:scale-110 active:scale-95"
          >
            <PlusCircle size={26} className="text-black" />
          </Link>
        </div>
      )}

      <button className="flex flex-col items-center justify-center gap-1 w-full py-1 text-emerald-500/50 hover:text-emerald-300 transition-colors">
        <div className="relative">
          <Bell size={22} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border border-[#0a1c15]"></span>
        </div>
        <span className="text-[9px] font-bold mt-0.5">Сообщения</span>
      </button>

      <a 
        href="/api/auth/signout" 
        className="flex flex-col items-center justify-center gap-1 w-full py-1 text-emerald-500/50 hover:text-emerald-300 transition-colors"
      >
        <User size={22} />
        <span className="text-[9px] font-bold mt-0.5">Профиль</span>
      </a>
    </nav>
  );
}
