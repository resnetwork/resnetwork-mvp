import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, Edit, MapPin, PlusCircle } from "lucide-react";
import { formatEventDateRange } from "@/app/utils/dateFormatter";
import { DeleteEventButton } from "./DeleteEventButton";

export default async function MyEventsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/res365");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { companyId: true, role: true }
  });

  if (!user || user.role === "EMPLOYEE" || !user.companyId) {
    redirect("/res365/dashboard");
  }

  const events = await prisma.event.findMany({
    where: { creatorCompanyId: user.companyId },
    orderBy: { date: 'desc' },
    include: {
      _count: { select: { tickets: true } }
    }
  });

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">Мои события</h1>
          <p className="text-emerald-400/60">Управление событиями вашей компании</p>
        </div>
        <Link 
          href="/res365/dashboard/events/create"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-sm transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          <PlusCircle size={18} />
          Создать
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="p-12 text-center bg-emerald-950/20 rounded-3xl border border-emerald-500/10">
          <Calendar size={48} className="mx-auto text-emerald-500/20 mb-4" />
          <h3 className="text-xl font-bold text-emerald-300 mb-2">У вас пока нет событий</h3>
          <p className="text-emerald-400/60 mb-6">Создайте свое первое мероприятие, чтобы оно появилось в Афише платформы.</p>
          <Link 
            href="/res365/dashboard/events/create"
            className="inline-block px-8 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold transition-colors"
          >
            Создать событие
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-[#06241a]/60 border border-emerald-500/20 rounded-2xl p-6 flex flex-col relative group hover:border-emerald-500/40 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/50 border border-emerald-500/30">
                  {event.isPublic ? "Открытое" : "Закрытое"}
                </div>
                <div className="flex gap-2">
                  <Link 
                    href={`/res365/dashboard/events/${event.id}/edit`}
                    className="p-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black rounded-lg transition-colors"
                    title="Редактировать событие"
                  >
                    <Edit size={18} />
                  </Link>
                  <DeleteEventButton eventId={event.id} companyId={user.companyId!} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">{event.title}</h3>
              
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-emerald-100/70">
                  <Calendar size={16} className="text-emerald-500/50" />
                  <span>{formatEventDateRange(new Date(event.date), event.endDate ? new Date(event.endDate) : null)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-100/70">
                  <MapPin size={16} className="text-emerald-500/50" />
                  <span className="truncate">{event.locationCity || "Онлайн"}</span>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-emerald-500/10 flex justify-between items-center text-sm">
                <span className="text-emerald-500/60 font-bold uppercase tracking-wider text-xs">Зарегистрировано</span>
                <span className="text-white font-bold">{event._count.tickets} чел.</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
