import { getPublicEvents } from "@/app/actions/events";
import EventsClient from "./EventsClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { EVENTS } from "@/app/data/events";
import { formatEventDateRange } from "@/app/utils/dateFormatter";

export default async function EventsPage() {
  const dbEvents = await getPublicEvents();
  
  const mappedDbEvents = dbEvents.map(e => ({
    id: e.id,
    slug: e.id,
    title: e.title,
    summary: e.description || "Без описания",
    description: e.description || "",
    date: formatEventDateRange(new Date(e.date), e.endDate ? new Date(e.endDate) : null),
    isoDate: new Date(e.date).toISOString(),
    endDate: e.endDate ? new Date(e.endDate).toISOString() : null,
    location: e.location,
    format: (e as any).format || "Оффлайн",
    image: e.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    category: e.creatorCompany?.name || "Событие",
    isPublic: e.isPublic,
    isDbEvent: true,
    sourceUrl: e.sourceUrl,
    twoGisUrl: (e as any).twoGisUrl || null
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = [...mappedDbEvents, ...EVENTS].filter(ev => {
    if (ev.isoDate) {
      return new Date(ev.isoDate) >= today;
    }
    const d = new Date(ev.date);
    return isNaN(d.getTime()) || d >= today;
  }).sort((a, b) => {
    const timeA = new Date(a.isoDate || a.date).getTime() || 0;
    const timeB = new Date(b.isoDate || b.date).getTime() || 0;
    return timeA - timeB;
  });

  const session = await auth();
  const userId = session?.user?.id || null;

  return (
    <main className="min-h-screen bg-[#080C0A] flex flex-col pt-12 pb-24">
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col h-full relative z-10">
        
        {/* Header */}
        <header className="flex flex-col mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-emerald-500/60 hover:text-emerald-400 text-sm font-bold uppercase tracking-wider mb-4 transition-colors"
          >
            <ArrowLeft size={16} /> На главную
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Все мероприятия
          </h1>
        </header>

        {/* Client component with filtering logic */}
        <EventsClient initialEvents={upcomingEvents} userId={userId} />
        
      </div>
    </main>
  );
}
