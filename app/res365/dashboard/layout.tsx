import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import DashboardSidebar from "@/app/components/DashboardSidebar";
import MobileBottomNav from "@/app/components/MobileBottomNav";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/res365");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { company: true },
  });

  if (!user) {
    redirect("/res365");
  }

  return (
    <div className="min-h-[100dvh] bg-[#06110d] text-[#f2ede2] flex selection:bg-emerald-500 selection:text-white font-sans overflow-hidden">
      {/* Клиентский компонент боковой панели для ПК */}
      <DashboardSidebar user={user} />
      
      {/* Клиентский компонент нижней навигации для Мобильных */}
      <MobileBottomNav user={user} />

      {/* Основной контент */}
      <main className="flex-1 overflow-y-auto relative bg-[#06110d]">
        {/* Фоновое свечение (на весь контент) */}
        <div
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[240px] pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }}
        />
        
        <div className="relative z-10 w-full h-full p-4 pb-24 md:p-10 md:pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
