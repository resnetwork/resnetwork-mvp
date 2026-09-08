import { prisma } from "./app/lib/prisma";

const GROUPS = [
  {
    title: "Они строят экосистему",
    direction: "left",
    speed: "40s",
    logos: [
      { src: "/logo-bf.png", name: "Business First", className: "h-9 sm:h-12 md:h-16" },
      { src: "/logo-brettc.jpg", name: "B&R ETTC", className: "h-10 sm:h-14 md:h-20" },
      { src: "/logo-caier.jpeg", name: "CAIER", className: "h-12 sm:h-16 md:h-24" },
    ],
  },
  {
    title: "Они формируют энергопереход",
    direction: "right",
    speed: "45s",
    logos: [
      { src: "/logo-igtic.png", name: "IGTIC", className: "h-10 sm:h-14 md:h-20" },
      { src: "/logo-petrocouncil.png", name: "Petrocouncil", className: "h-8 sm:h-11 md:h-16" },
      { src: "/logo-unesco.png", name: "UNESCO", className: "h-10 sm:h-14 md:h-20" },
    ],
  },
];

async function main() {
  console.log("Seeding initial partners...");
  let order = 0;
  for (const group of GROUPS) {
    const category = await prisma.partnerCategory.create({
      data: {
        title: group.title,
        direction: group.direction,
        speed: group.speed,
        order: order++,
      }
    });

    for (const logo of group.logos) {
      await prisma.partnerLogo.create({
        data: {
          name: logo.name,
          imageUrl: logo.src,
          className: logo.className,
          categoryId: category.id,
        }
      });
    }
  }
  console.log("Seeding complete!");
}

main().catch(e => console.error(e)).finally(() => process.exit(0));
