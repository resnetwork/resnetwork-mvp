import { prisma } from './app/lib/prisma';

async function main() {
  const event = await prisma.event.findFirst({
    where: { title: { contains: 'Smart Water Zone' } }
  });
  
  if (event) {
    await prisma.event.update({
      where: { id: event.id },
      data: { eventType: 'PROGRAM', endDate: new Date('2027-09-29T23:59:59Z') }
    });
    console.log('Updated Smart Water Zone to PROGRAM');
  } else {
    console.log('Smart Water Zone not found');
  }
}

main().catch(console.error);
