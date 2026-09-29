const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Fetching events...");
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: { creatorCompany: true }
  });
  console.log("Fetched events:", events.length);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
