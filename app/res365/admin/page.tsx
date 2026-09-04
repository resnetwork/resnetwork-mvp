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
    where: { category: "COMPANY" },
    orderBy: { createdAt: "desc" },
    include: { users: true }
  }) : [];

  // --- Вкладка Стартапы ---
  const startups = currentTab === "startups" ? await prisma.company.findMany({
    where: { category: "STARTUP" },
    orderBy: { createdAt: "desc" },
    include: { users: true }
  }) : [];

  // --- Вкладка Физ. лица ---
  const individuals = currentTab === "individuals" ? await prisma.company.findMany({
    where: { category: "INDIVIDUAL" },
    orderBy: { createdAt: "desc" },
    include: { users: true }
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

  // --- Вкладка Регистрации ---
  const registrations = currentTab === "registrations" ? await prisma.registrationRequest.findMany({
    orderBy: { createdAt: "desc" }
  }) : [];



  const NavTab = ({ id, label, icon }: { id: string, label: string, icon: React.ReactNode }) => (
    <Link 
      href={`?tab=${id}`}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${currentTab === id ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-emerald-950/40 text-emerald-300/70 border border-emerald-500/20 hover:text-emerald-300 hover:bg-emerald-900/40'}`}
    >
      {icon}
      {label}
    </Link>
  );

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

        {/* Навигация по вкладкам (группировка в 3 уровня) */}
        <div className="space-y-3 mb-8">
          {/* Уровень 1: Участники */}
          <div className="flex overflow-x-auto gap-2 hide-scrollbar">
            <NavTab id="companies" label="Компании" icon={<Building size={16} />} />
            <NavTab id="startups" label="Стартапы" icon={<Building size={16} />} />
            <NavTab id="individuals" label="Физ. лица" icon={<Users size={16} />} />
          </div>

          {/* Уровень 2: Контент */}
          <div className="flex overflow-x-auto gap-2 hide-scrollbar">
            <NavTab id="events" label="События" icon={<CalendarDays size={16} />} />
          </div>

          {/* Уровень 3: Заявки */}
          <div className="flex overflow-x-auto gap-2 pb-4 border-b border-emerald-500/20 hide-scrollbar">
            <NavTab id="requests" label="Заявки по обратной связи" icon={<MessageSquare size={16} />} />
            <NavTab id="registrations" label="Заявки на регистрацию" icon={<Users size={16} />} />
          </div>
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
                    <div key={company.id} className="flex flex-col p-5 rounded-2xl border border-emerald-500/30 bg-[#06241a]">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
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

                      {/* Блок доступов */}
                      {company.users.length > 0 && (
                        <div className="px-4 py-2.5 bg-black/20 rounded-xl border border-emerald-500/10">
                          <div className="space-y-1">
                            {company.users.map(u => (
                              <div key={u.id} className="text-xs font-mono text-emerald-200/90 flex flex-wrap gap-2">
                                <span>Логин: <span className="text-white font-bold">{u.email || '-'}</span></span>
                                <span className="hidden md:inline">|</span>
                                <span>Пароль: <span className="text-white font-bold">admin</span></span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* === Вкладка СТАРТАПЫ === */}
        {currentTab === "startups" && (
          <div className="animate-in fade-in duration-300">
            <section className="mb-12">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Building className="text-emerald-400 w-5 h-5" />
                Зарегистрированные стартапы ({startups.length})
              </h2>

              {startups.length === 0 ? (
                <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 text-center text-emerald-400/60 font-mono text-sm">
                  Нет стартапов
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {startups.map(startup => (
                    <div key={startup.id} className="flex flex-col p-5 rounded-2xl border border-emerald-500/30 bg-[#06241a]">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-white">{startup.name}</h3>
                          <div className="text-xs text-emerald-400/80 font-mono mt-1">
                            БИН: {startup.bin} · Создана: {new Date(startup.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${startup.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                            {startup.status === 'APPROVED' ? 'Одобрена' : 'На рассмотрении'}
                          </span>
                        </div>
                      </div>
                      {startup.users.length > 0 && (
                        <div className="px-4 py-2.5 bg-black/20 rounded-xl border border-emerald-500/10">
                          <div className="space-y-1">
                            {startup.users.map(u => (
                              <div key={u.id} className="text-xs font-mono text-emerald-200/90 flex flex-wrap gap-2">
                                <span>Логин: <span className="text-white font-bold">{u.email || '-'}</span></span>
                                <span className="hidden md:inline">|</span>
                                <span>Пароль: <span className="text-white font-bold">admin</span></span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* === Вкладка ФИЗ. ЛИЦА === */}
        {currentTab === "individuals" && (
          <div className="animate-in fade-in duration-300">
            <section className="mb-12">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="text-emerald-400 w-5 h-5" />
                Физ. лица ({individuals.length})
              </h2>

              {individuals.length === 0 ? (
                <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 text-center text-emerald-400/60 font-mono text-sm">
                  Нет физ. лиц
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {individuals.map(person => (
                    <div key={person.id} className="flex flex-col p-5 rounded-2xl border border-emerald-500/30 bg-[#06241a]">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-white">{person.name}</h3>
                          <div className="text-xs text-emerald-400/80 font-mono mt-1">
                            ID: {person.bin} · Создана: {new Date(person.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${person.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                            {person.status === 'APPROVED' ? 'Одобрена' : 'На рассмотрении'}
                          </span>
                        </div>
                      </div>
                      {person.users.length > 0 && (
                        <div className="px-4 py-2.5 bg-black/20 rounded-xl border border-emerald-500/10">
                          <div className="space-y-1">
                            {person.users.map(u => (
                              <div key={u.id} className="text-xs font-mono text-emerald-200/90 flex flex-wrap gap-2">
                                <span>Логин: <span className="text-white font-bold">{u.email || '-'}</span></span>
                                <span className="hidden md:inline">|</span>
                                <span>Пароль: <span className="text-white font-bold">admin</span></span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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

        {/* === Вкладка РЕГИСТРАЦИИ НА ПЛАТФОРМУ === */}
        {currentTab === "registrations" && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-lg font-bold mb-6">Заявки на регистрацию ({registrations.length})</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {registrations.map(reg => (
                <div key={reg.id} className={`p-5 rounded-2xl border transition-colors ${reg.status === 'PENDING' ? 'border-emerald-500/50 bg-[#06241a] shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-emerald-500/10 bg-emerald-950/20 opacity-70'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-white flex items-center gap-2">
                        {reg.name}
                        {reg.status === 'PENDING' && <span className="px-2 py-0.5 bg-yellow-500 text-black text-[10px] rounded-full uppercase tracking-wider font-bold">Ожидает</span>}
                        {reg.status === 'APPROVED' && <span className="px-2 py-0.5 bg-emerald-500 text-black text-[10px] rounded-full uppercase tracking-wider font-bold">Одобрен</span>}
                      </h3>
                      <div className="text-xs text-emerald-400/80 font-mono mt-1">
                        {new Date(reg.createdAt).toLocaleString()} · Категория: {
                          reg.category === 'STARTUP' ? 'Стартап' :
                          reg.category === 'COMPANY' ? 'Компания' : 'Физ. лицо'
                        }
                      </div>
                    </div>
                    {reg.status === 'PENDING' && (
                      <form action={async () => {
                        "use server";
                        
                        // 1. Обновляем статус заявки
                        const approvedReg = await prisma.registrationRequest.update({
                          where: { id: reg.id },
                          data: { status: "APPROVED" }
                        });

                        // 2. Создаем компанию для любого участника (чтобы он был в сообществе)
                        const newCompany = await prisma.company.create({
                          data: {
                            name: approvedReg.name,
                            bin: `MOCK-${Date.now()}`, // Временный БИН для MVP
                            status: "APPROVED",
                            email: approvedReg.email,
                            category: approvedReg.category // STARTUP, COMPANY, INDIVIDUAL
                          }
                        });

                        // 3. Создаем пользователя
                        await prisma.user.create({
                          data: {
                            name: approvedReg.name,
                            email: approvedReg.email,
                            role: approvedReg.category === "INDIVIDUAL" ? "EMPLOYEE" : "COMPANY_ADMIN",
                            companyId: newCompany.id,
                          }
                        });

                        revalidatePath("/res365/admin");
                      }}>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs hover:bg-emerald-500 hover:text-white transition-colors">
                          <Check size={14} /> Одобрить и Создать
                        </button>
                      </form>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm bg-black/20 p-3 rounded-xl border border-emerald-500/10">
                    <div>
                      <span className="block text-[10px] text-emerald-500 uppercase tracking-wider mb-1">Email</span>
                      <a href={`mailto:${reg.email}`} className="text-emerald-200 font-bold hover:underline">{reg.email}</a>
                    </div>
                  </div>
                </div>
              ))}
              
              {registrations.length === 0 && (
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
