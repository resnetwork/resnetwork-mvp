import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { EVENTS } from "../../data/events";
import { prisma } from "@/app/lib/prisma";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try DB first
  let dbEvent = await prisma.event.findUnique({
    where: { id: slug },
    include: { creatorCompany: true }
  }).catch(() => null);

  let event: any = null;

  if (dbEvent) {
    event = {
      slug: dbEvent.id,
      title: dbEvent.title,
      summary: dbEvent.description || "Без описания",
      date: new Date(dbEvent.date).toLocaleDateString(),
      location: dbEvent.location || "Онлайн",
      image: dbEvent.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      category: dbEvent.creatorCompany?.name || "Событие",
      details: [],
      contact: [],
      source: null
    };
  } else {
    event = EVENTS.find((item) => item.slug === slug);
  }

  if (!event) notFound();

  return (
    <main className="min-h-screen bg-[#081712] text-[#f2ede2] px-6 py-10 md:px-16 md:py-16 selection:bg-emerald-500 selection:text-white">
      {/* Мягкое фоновое сияние */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[260px] pointer-events-none opacity-20 z-0"
        style={{ background: "radial-gradient(circle, #16a34a 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Кнопка «Назад» */}
        <a
          href="/#events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/60 hover:text-white transition-all duration-300 backdrop-blur-md mb-8 group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          <span>Все мероприятия</span>
        </a>

        {/* Главная карточка события */}
        <article className="overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-[#063325]/80 via-[#041d14]/90 to-[#02130e]/95 backdrop-blur-2xl shadow-2xl">
          {/* Обложка события */}
          <div className="relative h-80 md:h-[450px] w-full overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041d14] via-[#041d14]/40 to-transparent" />

            <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/75 border border-emerald-400/40 text-emerald-300 backdrop-blur-md">
              {event.category}
            </span>
          </div>

          <div className="p-8 md:p-14">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#f2ede2] leading-[1.1]">
              {event.title}
            </h1>

            {/* Дата и Локация */}
            <div className="mt-8 grid gap-4 rounded-2xl border border-emerald-500/25 bg-emerald-950/40 p-6 backdrop-blur-md md:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-400/80 font-bold block">Дата & Время</span>
                  <span className="text-sm md:text-base font-semibold text-[#f2ede2]">{event.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-400/80 font-bold block">Локация</span>
                  <span className="text-sm md:text-base font-semibold text-[#f2ede2]">{event.location}</span>
                </div>
              </div>
            </div>

            {/* Описание */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-emerald-300 mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-400" />
                <span>О событии</span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-[#9fb7a8]">
                {event.summary}
              </p>
            </div>

            {/* В программе */}
            {event.details && event.details.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-emerald-300 mb-4">В программе:</h2>
                <div className="grid gap-3">
                  {event.details.map((detail: string) => (
                    <div
                      key={detail}
                      className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-500/15 bg-emerald-950/20"
                    >
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-[#f2ede2]/90 leading-relaxed">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Контакты и регистрация */}
            {event.contact && event.contact.length > 0 && (
              <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-6 leading-relaxed">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  Контакты и регистрация
                </h3>
                {event.contact.map((line: string, i: number) => (
                  <p key={i} className="text-sm text-[#9fb7a8] mt-1">
                    {line}
                  </p>
                ))}
              </div>
            )}

            {/* Кнопка источника / регистрации */}
            {event.source && (
              <div className="mt-10 pt-6 border-t border-emerald-500/20">
                <a
                  href={event.source}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-950/80 group cursor-pointer"
                >
                  <span>Перейти на сайт события</span>
                  <ArrowUpRight size={17} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}