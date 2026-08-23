import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { ShieldCheck, Check, X, Building, ArrowLeft, CalendarDays, Users, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function AdminPanel({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/res365");
  }

  const { tab } = await searchParams;
  const currentTab = tab || "companies";

  // --- Вкладка Компании ---
  const allCompanies = currentTab === "companies" ? await prisma.company.findMany({
    orderBy: { createdAt: "desc" }
  }) : [];

  // --- Вкладка Ивенты ---
  const events = currentTab === "events" ? await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: { creatorCompany: true }
  }) : [];

  // --- Вкладка Заявки (CRM) ---
  const requests = currentTab === "requests" ? await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" }
  }) : [];

  const tabs = [
    { id: "companies", label: "Компании", icon: <Building size={16} /> },
    { id: "events", label: "События", icon: <CalendarDays size={16} /> },
    { id: "requests", label: "Заявки с сайта", icon: <MessageSquare size={16} /> },
  ];

  return (
    <main className="min-h-screen bg-[#081712] text-[#f2ede2] px-6 py-8 md:px-14 selection:bg-emerald-500 selection:text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Шапка админки */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-emerald-500/20">
          <div className="flex items-center gap-6">
            <Link href="/res365/dashboard" className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors">
              <ArrowLeft size={14} />
              <span>В дашборд</span>
            </Link>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-400 w-8 h-8" />
              <h1 className="text-xl font-bold">Панель администратора</h1>
            </div>
          </div>
        </header>

        {/* Навигация по вкладкам */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-6 hide-scrollbar">
          {tabs.map(t => (
            <Link 
              key={t.id} 
              href={`?tab=${t.id}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${currentTab === t.id ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-emerald-950/40 text-emerald-300/70 border border-emerald-500/20 hover:text-emerald-300 hover:bg-emerald-900/40'}`}
            >
              {t.icon}
              {t.label}
            </Link>
          ))}
        </div>

        {/* Контент вкладок */}
        
        {/* === Вкладка КОМПАНИИ === */}
        {currentTab === "companies" && (
          <div className="animate-in fade-in duration-300">
            <section className="mb-12">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Building className="text-emerald-400 w-5 h-5" />
                Все зарегистрированные компании ({allCompanies.length})
              </h2>

              {allCompanies.length === 0 ? (
                <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 text-center text-emerald-400/60 font-mono text-sm">
                  Нет компаний
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {allCompanies.map(company => (
                    <div key={company.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-emerald-500/30 bg-[#06241a] gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-white">{company.name}</h3>
                        <div className="text-xs text-emerald-400/80 font-mono mt-1">
                          БИН: {company.bin} · Создана: {new Date(company.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${company.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                          {company.status === 'APPROVED' ? 'Одобрена' : 'На рассмотрении'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* === Вкладка СОБЫТИЯ === */}
        {currentTab === "events" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Все события ({events.length})</h2>
              {/* Тут можно сделать кнопку создания ивента админом от лица любой компании, но для MVP просто перенаправим на стандартную страницу создания */}
              <Link href="/res365/dashboard/events/create" className="px-4 py-2 bg-emerald-600 rounded-full text-xs font-bold shadow-lg shadow-emerald-900/50 hover:bg-emerald-500 transition-colors">
                Создать событие
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {events.map(event => (
                <div key={event.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-emerald-500/30 bg-[#06241a] gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white">{event.title}</h3>
                    <div className="text-xs text-emerald-400/80 font-mono mt-1">
                      Дата: {new Date(event.date).toLocaleDateString()} · Компания: {event.creatorCompany?.name}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <form action={async () => {
                      "use server";
                      await prisma.event.update({
                        where: { id: event.id },
                        data: { isPublic: !event.isPublic }
                      });
                      revalidatePath("/res365/admin");
                    }}>
                      <button className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-colors ${event.isPublic ? 'border-emerald-500/50 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20' : 'border-gray-500/50 text-gray-400 bg-gray-500/10 hover:bg-gray-500/20'}`}>
                        {event.isPublic ? 'Публичный' : 'Скрытый'}
                      </button>
                    </form>
                    
                    <form action={async () => {
                      "use server";
                      await prisma.event.delete({ where: { id: event.id } });
                      revalidatePath("/res365/admin");
                    }}>
                      <button className="p-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors" title="Удалить">
                        <X size={16} />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === Вкладка ЗАЯВКИ С САЙТА === */}
        {currentTab === "requests" && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-lg font-bold mb-6">CRM Заявки ({requests.length})</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {requests.map(req => (
                <div key={req.id} className={`p-5 rounded-2xl border transition-colors ${req.status === 'NEW' ? 'border-emerald-500/50 bg-[#06241a] shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-emerald-500/10 bg-emerald-950/20 opacity-70'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-white flex items-center gap-2">
                        {req.name}
                        {req.status === 'NEW' && <span className="px-2 py-0.5 bg-yellow-500 text-black text-[10px] rounded-full uppercase tracking-wider font-bold">Новая</span>}
                      </h3>
                      <div className="text-xs text-emerald-400/80 font-mono mt-1">
                        {new Date(req.createdAt).toLocaleString()}
                      </div>
                    </div>
                    {req.status === 'NEW' && (
                      <form action={async () => {
                        "use server";
                        await prisma.contactRequest.update({
                          where: { id: req.id },
                          data: { status: "PROCESSED" }
                        });
                        revalidatePath("/res365/admin");
                      }}>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs hover:bg-emerald-500 hover:text-white transition-colors">
                          <Check size={14} /> Обработано
                        </button>
                      </form>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm bg-black/20 p-3 rounded-xl border border-emerald-500/10">
                    <div>
                      <span className="block text-[10px] text-emerald-500 uppercase tracking-wider mb-1">Email</span>
                      <a href={`mailto:${req.email}`} className="text-emerald-200 hover:underline">{req.email}</a>
                    </div>
                    <div>
                      <span className="block text-[10px] text-emerald-500 uppercase tracking-wider mb-1">Телефон</span>
                      <a href={`tel:${req.phone}`} className="text-emerald-200 hover:underline">{req.phone || '-'}</a>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[10px] text-emerald-500 uppercase tracking-wider mb-1">Компания</span>
                      <span className="text-emerald-200">{req.company || '-'}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="block text-[10px] text-emerald-500 uppercase tracking-wider mb-1">Сообщение</span>
                    <p className="text-[#f2ede2] text-sm leading-relaxed whitespace-pre-wrap">{req.message}</p>
                  </div>
                </div>
              ))}
              
              {requests.length === 0 && (
                <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 text-center text-emerald-400/60 font-mono text-sm">
                  Заявок пока нет
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
