import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding events...");

  // Создаем систему/админа
  let sysCompany = await prisma.company.findFirst({
    where: { name: "RES Network (System)" }
  });

  if (!sysCompany) {
    sysCompany = await prisma.company.create({
      data: {
        name: "RES Network (System)",
        bin: "000000000000",
        description: "System admin company",
        status: "VERIFIED"
      }
    });
    console.log("Created System company");
  }

  let adminUser = await prisma.user.findFirst({
    where: { email: "admin@resnetwork.org" }
  });

  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email: "admin@resnetwork.org",
        name: "Admin",
        role: "ADMIN",
        companyId: sysCompany.id,
      }
    });
    console.log("Created Admin user");
  }

  const eventsData = [
    {
      title: "Global Eco Summit '26",
      description: "Ведущий саммит по вопросам изменения климата и ESG-инициатив.",
      date: new Date("2026-11-15T10:00:00Z"),
      location: "Almaty, Ritz-Carlton",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      isPublic: true,
    },
    {
      title: "Green Tech Pitch Day",
      description: "Презентация стартапов в сфере зеленых технологий для закрытого клуба инвесторов.",
      date: new Date("2026-09-20T14:00:00Z"),
      location: "Astana Hub",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      isPublic: false,
    },
    {
      title: "Renewable Energy Forum",
      description: "Обсуждение будущего возобновляемой энергетики в Центральной Азии.",
      date: new Date("2026-10-05T09:00:00Z"),
      location: "Tashkent City Congress Hall",
      imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
      isPublic: true,
    },
    {
      title: "Sustainable Fashion Week",
      description: "Выставка экологичной моды и переработанных материалов.",
      date: new Date("2026-12-01T18:00:00Z"),
      location: "Almaty, Atakent",
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      isPublic: true,
    }
  ];

  for (const ev of eventsData) {
    await prisma.event.create({
      data: {
        ...ev,
        creatorCompanyId: sysCompany.id
      }
    });
    console.log(`Created event: ${ev.title}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
