import { prisma } from './app/lib/prisma';
async function main() {
  const events = await prisma.event.findMany({
    where: { title: { contains: 'Smart Water Zone' } }
  });
  console.log(JSON.stringify(events, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
