import { config } from 'dotenv';
config({ path: '.env' });
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const gpiEvents = await prisma.event.findMany({
    where: { title: { contains: 'Smart Water Zone' } }
  });
  
  if (gpiEvents.length > 0) {
    const keepId = gpiEvents[0].id;
    console.log(`Found ${gpiEvents.length} events. Keeping ID: ${keepId}`);
    
    const result = await prisma.event.deleteMany({
      where: {
        title: { contains: 'Smart Water Zone' },
        id: { not: keepId }
      }
    });
    
    await prisma.event.update({
      where: { id: keepId },
      data: { endDate: new Date('2027-09-29T00:00:00.000Z') }
    });
    
    console.log(`Successfully kept 1 event and deleted ${result.count} duplicates. Set end date to 29.09.2027.`);
  } else {
    console.log('No Smart Water Zone events found.');
  }
}

main().catch(console.error).finally(() => process.exit(0));
