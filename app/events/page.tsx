import { getPublicEvents } from "@/app/actions/events";
import EventsClient from "./EventsClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";

export default async function EventsPage() {
  const events = await getPublicEvents();
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
        <EventsClient initialEvents={events} userId={userId} />
        
      </div>
    </main>
  );
}
