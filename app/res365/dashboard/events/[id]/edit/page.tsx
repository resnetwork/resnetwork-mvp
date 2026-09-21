import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { updateEvent } from "@/app/lib/actions";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/res365");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { company: true }
  });

  if (!user || user.role === "EMPLOYEE" || !user.companyId) {
    redirect("/res365/dashboard");
  }

  const event = await prisma.event.findUnique({
    where: { id }
  });

  if (!event || event.creatorCompanyId !== user.companyId) {
    redirect("/res365/dashboard/events/my");
  }

  // Создаем Server Action обертку для передачи id события и companyId
  const updateEventAction = async (formData: FormData) => {
    "use server";
    const result = await updateEvent(id, formData, user.companyId!);
    if (result.success) {
      redirect("/res365/dashboard/events/my");
    }
  };

  const toDateInputString = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">Редактировать событие</h1>
        <p className="text-emerald-400/60">Измените информацию о вашем мероприятии</p>
      </div>

      <form action={updateEventAction} className="bg-gradient-to-br from-[#0a1c15] to-[#04110a] p-8 rounded-3xl border border-emerald-900/50 shadow-2xl space-y-6">
        
        <div>
          <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Название события</label>
          <input 
            type="text" 
            name="title" 
            defaultValue={event.title}
            required 
            placeholder="Например: ESG Форум 2026" 
            className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Описание</label>
          <textarea 
            name="description" 
            defaultValue={event.description || ""}
            rows={4}
            placeholder="Опишите, что будет на мероприятии..." 
            className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20 resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Дата начала</label>
            <input 
              type="date" 
              name="date" 
              defaultValue={toDateInputString(event.date)}
              required 
              className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              style={{ colorScheme: "dark" }}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Дата конца</label>
            <input 
              type="date" 
              name="endDate" 
              defaultValue={toDateInputString(event.endDate)}
              className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              style={{ colorScheme: "dark" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Город</label>
            <input 
              type="text" 
              name="locationCity" 
              defaultValue={event.locationCity || ""}
              required
              placeholder="г. Астана" 
              className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Улица</label>
            <input 
              type="text" 
              name="locationStreet" 
              defaultValue={event.locationStreet || ""}
              placeholder="пр. Мангилик Ел, 55" 
              className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Название места</label>
            <input 
              type="text" 
              name="locationVenue" 
              defaultValue={event.locationVenue || ""}
              placeholder="Международный Выставочный Центр EXPO" 
              className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Ссылка на 2GIS</label>
            <input 
              type="url" 
              name="twoGisUrl" 
              defaultValue={event.twoGisUrl || ""}
              placeholder="https://2gis.kz/..." 
              className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Обложка</label>
          {event.imageUrl && (
            <div className="mb-4">
              <img src={event.imageUrl} alt="Текущая обложка" className="h-32 rounded-lg object-cover border border-emerald-500/20" />
              <p className="text-[10px] text-emerald-500/60 mt-1 uppercase tracking-wider">Текущая обложка (оставьте пустым, чтобы не менять)</p>
            </div>
          )}
          <input 
            type="file" 
            name="imageFile" 
            accept="image/*"
            className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-black hover:file:bg-emerald-400"
          />
        </div>

        {user.role === "SYSTEM_ADMIN" && (
          <div>
            <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Ссылка на первоисточник</label>
            <input 
              type="url" 
              name="sourceUrl" 
              defaultValue={event.sourceUrl || ""}
              placeholder="https://..." 
              className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
            />
          </div>
        )}

        <div className="flex items-center gap-3 p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl">
          <input 
            type="checkbox" 
            name="isPublic" 
            id="isPublic"
            defaultChecked={event.isPublic}
            className="w-5 h-5 accent-emerald-500 bg-black border-emerald-900 rounded focus:ring-emerald-500 focus:ring-offset-black"
          />
          <div>
            <label htmlFor="isPublic" className="font-bold text-white cursor-pointer">Открытое событие</label>
            <p className="text-xs text-emerald-400/60 mt-0.5">Событие будет доступно всем резидентам платформы</p>
          </div>
        </div>

        <div className="pt-4 mt-8 border-t border-emerald-900/30">
          <button type="submit" className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            Сохранить изменения
          </button>
        </div>

      </form>
    </div>
  );
}
