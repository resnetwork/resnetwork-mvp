import { prisma } from "@/app/lib/prisma";
import CommunityGrid from "@/app/components/CommunityGrid";

export default async function CommunityPage() {
  // Получаем все одобренные компании, кроме системной, сортируем по алфавиту
  const companies = await prisma.company.findMany({
    where: { 
      status: "APPROVED",
      name: { not: "RES Network (System)" }
    },
    orderBy: { name: "asc" }
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-[#f2ede2] tracking-tight">Сообщество</h1>
      </div>

      <CommunityGrid companies={companies} />
    </div>
  );
}
