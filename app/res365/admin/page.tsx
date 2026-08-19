import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { ShieldCheck, Check, X, Building, ArrowLeft } from "lucide-react";

export default async function AdminPanel() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/res365");
  }

  // В MVP мы считаем, что админом является тот, у кого роль SYSTEM_ADMIN.
  // Но так как у нас сейчас нет интерфейса создания SYSTEM_ADMIN, 
  // мы временно дадим доступ всем залогиненным юзерам для демонстрации.
  
  const pendingCompanies = await prisma.company.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" }
  });

  const approvedCompanies = await prisma.company.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
    take: 5
  });

  return (
    <main className="min-h-screen bg-[#081712] text-[#f2ede2] px-6 py-8 md:px-14 selection:bg-emerald-500 selection:text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Шапка админки */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-emerald-500/20">
          <div className="flex items-center gap-6">
            <a href="/res365/dashboard" className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors">
              <ArrowLeft size={14} />
              <span>В дашборд</span>
            </a>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-400 w-8 h-8" />
              <h1 className="text-xl font-bold">Панель модерации</h1>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Заявки на рассмотрении ({pendingCompanies.length})
          </h2>

          {pendingCompanies.length === 0 ? (
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 text-center text-emerald-400/60 font-mono text-sm">
              Нет новых заявок
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingCompanies.map(company => (
                <div key={company.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-emerald-500/30 bg-[#06241a] gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">{company.name}</h3>
                    <div className="text-xs text-emerald-400/80 font-mono mt-1">
                      БИН: {company.bin} · Создана: {new Date(company.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <form action={async () => {
                      "use server";
                      await prisma.company.update({
                        where: { id: company.id },
                        data: { status: "REJECTED" }
                      });
                      revalidatePath("/res365/admin");
                    }}>
                      <button className="p-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors">
                        <X size={18} />
                      </button>
                    </form>
                    
                    <form action={async () => {
                      "use server";
                      await prisma.company.update({
                        where: { id: company.id },
                        data: { status: "APPROVED" }
                      });
                      revalidatePath("/res365/admin");
                    }}>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs hover:bg-emerald-500 hover:text-white transition-colors">
                        <Check size={16} />
                        Одобрить компанию
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Building className="text-emerald-400 w-5 h-5" />
            Недавно одобренные компании
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {approvedCompanies.map(company => (
              <div key={company.id} className="flex items-center justify-between p-4 rounded-xl border border-emerald-500/10 bg-emerald-950/20">
                <span className="font-bold">{company.name}</span>
                <span className="text-xs text-emerald-400/60 font-mono">Одобрена</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
