const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const gpiEvents = await prisma.event.findMany({
    where: { title: 'Проект Smart Water Zone для организаций' }
  });
  if (gpiEvents.length > 0) {
    const keepId = gpiEvents[0].id;
    const deleted = await prisma.event.deleteMany({
      where: {
        title: 'Проект Smart Water Zone для организаций',
        id: { not: keepId }
      }
    });
    await prisma.event.update({
      where: { id: keepId },
      data: { endDate: new Date('2027-09-29T00:00:00.000Z') }
    });
    console.log(`Successfully kept 1 event and deleted ${deleted.count} duplicates.`);
  } else {
    console.log('No GPI events found.');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
