import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { Calendar, CheckCircle2, Ticket, MapPin, Building2, User } from "lucide-react";
import TicketQR from "@/app/components/TicketQR";

export default async function TicketsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/res365");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      company: true,
      tickets: {
        include: { event: true }
      }
    }
  });

  if (!user) redirect("/res365");

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <Ticket className="text-emerald-500" />
          Мои Билеты
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-10">
        {user.tickets.length === 0 ? (
          <div className="text-emerald-500/50 p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 text-center">
            У вас пока нет билетов. Перейдите в Афишу, чтобы зарегистрироваться на события.
          </div>
        ) : (
          user.tickets.map((ticket) => (
            <div key={ticket.id} className="relative group perspective-1000">
              {/* Main Ticket Container with flex row */}
              <div className="flex flex-col sm:flex-row bg-[#081f16] rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/20 border border-emerald-500/30 transition-transform duration-500 hover:scale-[1.02]">
                
                {/* Left Side: Event Details */}
                <div className="flex-1 flex flex-col relative">
                  {/* Banner Image */}
                  <div className="h-32 w-full bg-emerald-900/50 relative overflow-hidden">
                    {ticket.event.imageUrl ? (
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-60"
                        style={{ backgroundImage: `url(${ticket.event.imageUrl})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-[#081f16] opacity-60" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081f16] to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                        VIP Pass
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#f2ede2] leading-tight mb-4">
                        {ticket.event.title}
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-emerald-200/80">
                          <div className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center shrink-0 border border-emerald-500/30">
                            <Calendar size={14} className="text-emerald-400" />
                          </div>
                          <span className="font-medium">{formatDate(ticket.event.date)}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-emerald-200/80">
                          <div className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center shrink-0 border border-emerald-500/30">
                            <MapPin size={14} className="text-emerald-400" />
                          </div>
                          <span className="font-medium">{ticket.event.location || "Онлайн трансляция"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Attendee Info */}
                    <div className="mt-6 pt-5 border-t border-dashed border-emerald-500/30 flex items-center gap-6">
                      <div>
                        <div className="text-[10px] text-emerald-500/60 uppercase tracking-widest font-bold mb-1">Делегат</div>
                        <div className="flex items-center gap-2 text-sm text-white font-medium">
                          <User size={14} className="text-emerald-500" />
                          {user.name || user.email?.split('@')[0]}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-emerald-500/60 uppercase tracking-widest font-bold mb-1">Компания</div>
                        <div className="flex items-center gap-2 text-sm text-white font-medium">
                          <Building2 size={14} className="text-emerald-500" />
                          {user.company?.name || "Независимый участник"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: QR Code Stub (Perforated edge effect) */}
                <div className="sm:w-48 bg-emerald-950/40 border-t sm:border-t-0 sm:border-l border-dashed border-emerald-500/50 p-6 flex flex-col items-center justify-center relative">
                  {/* Cutout circles for realism */}
                  <div className="hidden sm:block absolute -left-3 top-0 bottom-0 flex flex-col justify-between py-4">
                    <div className="w-6 h-6 rounded-full bg-[#06110d] -translate-x-1/2 -mt-7" />
                    <div className="w-6 h-6 rounded-full bg-[#06110d] -translate-x-1/2 -mb-7" />
                  </div>

                  <div className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest mb-4 rotate-0 sm:rotate-90 sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 sm:whitespace-nowrap">
                    ID: {ticket.id.split('-')[0].toUpperCase()}
                  </div>

                  <div className="bg-white p-2.5 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-shadow duration-500">
                    <TicketQR value={ticket.id} />
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 size={12} />
                    АКТИВЕН
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
