import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import EventCarousel from "@/app/components/EventCarousel";

export default async function DashboardPage() {
  const session = await auth();
  
  // Получаем все публичные ивенты или ивенты клуба
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    include: {
      creatorCompany: true,
      tickets: {
        where: { userId: session?.user?.id }
      }
    }
  });

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 border-b border-emerald-500/20 pb-4">
        <nav className="flex gap-8 text-sm font-bold uppercase tracking-wider">
          <span className="text-white border-b-2 border-emerald-500 pb-4 -mb-[17px]">Афиша Событий</span>
          <a href="/res365/dashboard/tickets" className="text-emerald-500/60 hover:text-emerald-400 transition-colors pb-4 -mb-[17px]">Мои билеты</a>
        </nav>
      </div>

      <div className="flex-1 min-h-[600px]">
        <EventCarousel initialEvents={events} userId={session?.user?.id || ""} />
      </div>
    </div>
  );
}